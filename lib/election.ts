// Costa Rica 2026 Presidential Election
// First round: February 1, 2026 (Sunday)
// Second round (if needed): April 5, 2026

export const ELECTION_DATE = new Date("2026-02-01T06:00:00-06:00") // Costa Rica timezone (CST)
export const SECOND_ROUND_DATE = new Date("2026-04-05T06:00:00-06:00")

export function getDaysUntilElection(): number {
  const now = new Date()
  const diff = ELECTION_DATE.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getDaysUntilSecondRound(): number {
  const now = new Date()
  const diff = SECOND_ROUND_DATE.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getElectionStatus(): "upcoming" | "today" | "past" {
  const days = getDaysUntilElection()
  if (days > 0) return "upcoming"
  if (days === 0) return "today"
  return "past"
}

export function formatDaysRemaining(days: number): string {
  if (days === 0) return "HOY"
  if (days === 1) return "MANANA"
  if (days < 0) return "PASADO"
  return `En ${days} dias`
}
