import type { Debate } from "./data"

/**
 * Calculates days until a debate (comparing calendar dates, not exact times)
 */
export function getDaysUntil(dateIso: string): number {
  const now = new Date()
  const debateDate = new Date(dateIso)

  // Normalize both dates to midnight in Costa Rica timezone for accurate day comparison
  const timezone = "America/Costa_Rica"
  const nowDateStr = now.toLocaleDateString("en-CA", { timeZone: timezone })
  const debateDateStr = debateDate.toLocaleDateString("en-CA", { timeZone: timezone })

  const nowMidnight = new Date(nowDateStr + "T00:00:00")
  const debateMidnight = new Date(debateDateStr + "T00:00:00")

  const diffTime = debateMidnight.getTime() - nowMidnight.getTime()
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Formats the countdown text for a debate
 */
export function getCountdownText(dateIso: string): string {
  const days = getDaysUntil(dateIso)
  if (days < 0) return "Finalizado"
  if (days === 0) return "Hoy"
  if (days === 1) return "Mañana"
  return `En ${days} días`
}

/**
 * Generates an .ics file content for a debate event
 */
export function generateIcsFile(debate: Debate): string {
  const startDate = new Date(debate.dateIso)
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours duration

  const formatIcsDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const description = [
    `Debate presidencial organizado por ${debate.hostName}`,
    debate.notes ? `\\n${debate.notes}` : "",
    `\\nCanales: ${debate.channels.join(", ")}`,
    debate.links.liveStream ? `\\nVer en vivo: ${debate.links.liveStream}` : "",
  ]
    .filter(Boolean)
    .join("")

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Votar Importa//Debates CR 2026//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${debate.id}@votarimporta.cr
DTSTAMP:${formatIcsDate(new Date())}
DTSTART:${formatIcsDate(startDate)}
DTEND:${formatIcsDate(endDate)}
SUMMARY:Debate Presidencial - ${debate.hostName}
DESCRIPTION:${description}
LOCATION:${debate.channels.join(", ")}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`

  return icsContent
}

/**
 * Triggers download of an .ics file
 */
export function downloadIcsFile(debate: Debate): void {
  const icsContent = generateIcsFile(debate)
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `debate-${debate.id}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Generates a Google Calendar URL for adding the event
 */
export function generateGoogleCalendarUrl(debate: Debate): string {
  const startDate = new Date(debate.dateIso)
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

  const formatGoogleDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  }

  const title = encodeURIComponent(`Debate Presidencial - ${debate.hostName}`)
  const details = encodeURIComponent(
    `Debate presidencial organizado por ${debate.hostName}\n` +
      `Canales: ${debate.channels.join(", ")}\n` +
      (debate.notes ? `${debate.notes}\n` : "") +
      (debate.links.liveStream ? `Ver en vivo: ${debate.links.liveStream}` : "")
  )
  const location = encodeURIComponent(debate.channels.join(", "))
  const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`
}

/**
 * Determines the current status of a debate based on time
 */
export function getDebateStatus(debate: Debate): Debate["status"] {
  if (debate.status === "cancelled") return "cancelled"

  const now = new Date()
  const debateStart = new Date(debate.dateIso)
  const debateEnd = new Date(debateStart.getTime() + 2 * 60 * 60 * 1000)

  if (now < debateStart) return "upcoming"
  if (now >= debateStart && now <= debateEnd) return "live"
  return "completed"
}

/**
 * Formats a date in Spanish for display - uses Costa Rica timezone
 */
export function formatDebateDate(dateIso: string): {
  dayName: string
  dayNameFull: string
  dayNumber: string
  monthShort: string
  time: string
  isTbd: boolean
} {
  const date = new Date(dateIso)
  const timezone = "America/Costa_Rica"

  // Get components in Costa Rica timezone
  const dayOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    weekday: "short",
  }
  const dayFullOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    weekday: "long",
  }
  const dayNumOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    day: "numeric",
  }
  const monthOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    month: "short",
  }
  const hourOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }

  const dayName = date
    .toLocaleDateString("es-CR", dayOptions)
    .toUpperCase()
    .replace(".", "")
  const dayNameFull = date.toLocaleDateString("es-CR", dayFullOptions)
  const dayNumber = date.toLocaleDateString("es-CR", dayNumOptions)
  const monthShort = date
    .toLocaleDateString("es-CR", monthOptions)
    .toUpperCase()
    .replace(".", "")

  // Get hour in Costa Rica timezone to check for TBD (midnight)
  const crHour = parseInt(
    date.toLocaleString("en-US", { timeZone: timezone, hour: "numeric", hour12: false })
  )
  const crMinute = parseInt(
    date.toLocaleString("en-US", { timeZone: timezone, minute: "numeric" })
  )
  const isTbd = crHour === 0 && crMinute === 0

  const timeString = date
    .toLocaleTimeString("es-CR", hourOptions)
    .toLowerCase()
    .replace("a. m.", "a.m.")
    .replace("p. m.", "p.m.")

  return {
    dayName,
    dayNameFull: dayNameFull.charAt(0).toUpperCase() + dayNameFull.slice(1),
    dayNumber,
    monthShort,
    time: isTbd ? "Por confirmar" : timeString,
    isTbd,
  }
}
