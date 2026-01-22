"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Calendar, Clock, PlayCircle, Radio, Tv, Video } from "lucide-react"
import type { Debate } from "@/lib/data"
import {
  formatDebateDate,
  getDebateStatus,
  downloadIcsFile,
  generateGoogleCalendarUrl,
} from "@/lib/calendar"

interface DebateCardProps {
  debate: Debate
}

export function DebateCard({ debate }: DebateCardProps) {
  const [showCalendarOptions, setShowCalendarOptions] = useState(false)
  const [imageError, setImageError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const status = getDebateStatus(debate)
  const dateInfo = formatDebateDate(debate.dateIso)
  const isPast = status === "completed"
  const isLive = status === "live"
  const isRadio = debate.channels.some((c) => c.toLowerCase().includes("radio"))

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

  // Status stripe color
  const getStripeColor = () => {
    if (isLive) return "bg-red-500"
    if (isPast) return "bg-slate-300"
    return "bg-blue-600"
  }

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
        isPast
          ? "border-slate-200 bg-slate-50 opacity-90 dark:border-slate-700 dark:bg-slate-900/50"
          : isLive
            ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
            : "border-slate-200 bg-white hover:border-blue-400 dark:border-slate-700 dark:bg-slate-950"
      }`}
    >
      {/* Status Stripe */}
      <div className={`h-1.5 w-full ${getStripeColor()}`} />

      <div className="flex h-full flex-col justify-between p-5">
        {/* Header: Date & Time */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {dateInfo.dayNameFull}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {dateInfo.dayNumber}
              </span>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {dateInfo.monthShort}
              </span>
            </div>
          </div>

          {!dateInfo.isTbd && (
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Clock size={12} />
              {dateInfo.time}
            </div>
          )}
          {dateInfo.isTbd && (
            <div className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <Clock size={12} />
              Por confirmar
            </div>
          )}
        </div>

        {/* Body: Broadcaster Info */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-600 dark:bg-slate-800">
            {!imageError ? (
              <Image
                src={debate.hostLogoUrl}
                alt={debate.hostName}
                width={40}
                height={40}
                className="h-full w-full object-contain"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              isRadio ? (
                <Radio size={24} className="text-slate-600 dark:text-slate-400" />
              ) : (
                <Tv size={24} className="text-slate-600 dark:text-slate-400" />
              )
            )}
          </div>
          <div>
            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
              {debate.hostName}
            </h3>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {isRadio ? <Radio size={10} /> : <Tv size={10} />}
              {isRadio ? "Radiofónico" : debate.channels.join(", ")}
            </span>
          </div>
        </div>

        {/* Notes */}
        {debate.notes && !dateInfo.isTbd && (
          <p className="-mt-4 mb-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            {debate.notes}
          </p>
        )}

        {/* Footer: Action Buttons */}
        <div className="mt-auto border-t border-slate-200 pt-4 dark:border-slate-700">
          {isLive && debate.links.liveStream && (
            <a
              href={debate.links.liveStream}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-600"
            >
              <Video size={16} className="animate-pulse" />
              VER EN VIVO
            </a>
          )}

          {isPast && debate.links.replay && (
            <a
              href={debate.links.replay}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-100 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <PlayCircle size={16} />
              Ver Repetición
            </a>
          )}

          {isPast && !debate.links.replay && (
            <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 py-2.5 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800">
              <PlayCircle size={16} />
              Repetición no disponible
            </div>
          )}

          {!isPast && !isLive && !dateInfo.isTbd && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleAddToCalendar}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-100 py-2.5 text-sm font-bold text-blue-800 transition-colors hover:bg-blue-200 dark:border-blue-700 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950"
              >
                <Calendar size={16} />
                Agendar
              </button>

              {showCalendarOptions && (
                <div className="absolute bottom-full left-0 z-10 mb-2 w-full min-w-[180px] rounded-lg border-2 border-slate-200 bg-white p-2 shadow-lg dark:border-slate-600 dark:bg-slate-900">
                  <button
                    onClick={handleGoogleCalendar}
                    className="w-full rounded px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Google Calendar
                  </button>
                  <button
                    onClick={handleDownloadIcs}
                    className="w-full rounded px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Descargar .ics
                  </button>
                </div>
              )}
            </div>
          )}

          {!isPast && !isLive && dateInfo.isTbd && (
            <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 py-2.5 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800">
              <Clock size={16} />
              Horario pendiente
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
