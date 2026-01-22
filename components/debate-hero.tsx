"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Calendar, Clock, Tv, Radio, Video } from "lucide-react"
import type { Debate } from "@/lib/data"
import {
  formatDebateDate,
  getCountdownText,
  getDebateStatus,
  downloadIcsFile,
  generateGoogleCalendarUrl,
} from "@/lib/calendar"

interface DebateHeroProps {
  debate: Debate
}

export function DebateHero({ debate }: DebateHeroProps) {
  const [showCalendarOptions, setShowCalendarOptions] = useState(false)
  const [imageError, setImageError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const status = getDebateStatus(debate)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCalendarOptions(false)
      }
    }

    if (showCalendarOptions) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCalendarOptions])
  const dateInfo = formatDebateDate(debate.dateIso)
  const countdownText = getCountdownText(debate.dateIso)
  const isLive = status === "live"
  const isRadio = debate.channels.some((c) => c.toLowerCase().includes("radio"))

  const handleAddToCalendar = () => {
    setShowCalendarOptions(!showCalendarOptions)
  }

  const handleDownloadIcs = () => {
    downloadIcsFile(debate)
    setShowCalendarOptions(false)
  }

  const handleGoogleCalendar = () => {
    window.open(generateGoogleCalendarUrl(debate), "_blank")
    setShowCalendarOptions(false)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${
        isLive
          ? "bg-gradient-to-br from-red-600 to-red-800"
          : "bg-gradient-to-br from-slate-900 to-slate-800"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white" />
        <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-white" />
      </div>
      {/* Accent blur decoration */}
      <div className="absolute right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-blue-600 opacity-20 blur-3xl" />

      <div className="relative z-10">
        {/* Label */}
        <div className="mb-4 flex items-center gap-2">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              EN VIVO AHORA
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Próximo Debate
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Broadcaster Info */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/30 bg-white p-2 shadow-lg md:h-20 md:w-20">
              {!imageError ? (
                <Image
                  src={debate.hostLogoUrl}
                  alt={debate.hostName}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                  onError={() => setImageError(true)}
                  unoptimized
                />
              ) : (
                isRadio ? (
                  <Radio size={40} className="text-slate-900" />
                ) : (
                  <Tv size={40} className="text-slate-900" />
                )
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">
                {debate.hostName}
              </h2>
              <p className="text-sm font-medium text-white/80">
                {dateInfo.dayNameFull}, {dateInfo.dayNumber} de{" "}
                {dateInfo.monthShort.toLowerCase()}
                {!dateInfo.isTbd && ` • ${dateInfo.time}`}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs font-medium text-white/70">
                {isRadio ? <Radio size={12} /> : <Tv size={12} />}
                {debate.channels.join(", ")}
              </div>
            </div>
          </div>

          {/* Right: Countdown & CTA */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="rounded-lg bg-white/15 px-4 py-2">
              <span className="text-lg font-bold text-blue-200 md:text-xl">
                {countdownText}
              </span>
            </div>

            {isLive && debate.links.liveStream ? (
              <a
                href={debate.links.liveStream}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-red-600 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl"
              >
                <Video size={18} className="animate-pulse" />
                VER EN VIVO
              </a>
            ) : !dateInfo.isTbd ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleAddToCalendar}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl"
                >
                  <Calendar size={18} />
                  Agregar al calendario
                </button>

                {showCalendarOptions && (
                  <div className="absolute bottom-full right-0 z-10 mb-2 min-w-[200px] rounded-lg border-2 border-slate-200 bg-white p-2 shadow-xl">
                    <button
                      onClick={handleGoogleCalendar}
                      className="w-full rounded px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      Google Calendar
                    </button>
                    <button
                      onClick={handleDownloadIcs}
                      className="w-full rounded px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      Descargar archivo .ics
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white/80">
                <Clock size={16} />
                Horario por confirmar
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {debate.notes && !dateInfo.isTbd && (
          <p className="mt-4 text-sm font-medium text-white/70">{debate.notes}</p>
        )}
      </div>
    </div>
  )
}
