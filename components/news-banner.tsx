"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Vote, Tv, ChevronRight, X, Calendar } from "lucide-react"
import { debates } from "@/data/debates"
import { formatDebateDate, getDebateStatus } from "@/lib/calendar"
import { cn } from "@/lib/utils"
import type { Debate } from "@/lib/data"

const ELECTION_DATE = new Date("2026-02-01T06:00:00-06:00")
const DEFAULT_STORAGE_KEY = "news-banner-dismissed"
const DEFAULT_DISMISS_HOURS = 24

function getNextDebate(): Debate | null {
  const upcomingDebates = debates
    .filter((d) => {
      const status = getDebateStatus(d)
      return status === "upcoming" || status === "live"
    })
    .sort((a, b) => new Date(a.dateIso).getTime() - new Date(b.dateIso).getTime())

  return upcomingDebates[0] || null
}

function getDaysUntilElection(): number {
  const now = new Date()
  const diffTime = ELECTION_DATE.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

interface NewsBannerProps {
  storageKey?: string
  dismissHours?: number
  className?: string
}

export function NewsBanner({
  storageKey = DEFAULT_STORAGE_KEY,
  dismissHours = DEFAULT_DISMISS_HOURS,
  className,
}: NewsBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [daysLeft, setDaysLeft] = useState(getDaysUntilElection())
  const [nextDebate, setNextDebate] = useState<Debate | null>(null)
  const [debateInfo, setDebateInfo] = useState<ReturnType<typeof formatDebateDate> | null>(null)

  useEffect(() => {
    // Check localStorage on mount (client-side only)
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      const dismissedAt = parseInt(stored, 10)
      const hoursSinceDismiss = (Date.now() - dismissedAt) / (1000 * 60 * 60)
      if (hoursSinceDismiss < dismissHours) {
        return // Keep hidden
      }
    }
    setIsVisible(true)
  }, [storageKey, dismissHours])

  useEffect(() => {
    const debate = getNextDebate()
    setNextDebate(debate)
    if (debate) {
      setDebateInfo(formatDebateDate(debate.dateIso))
    }

    // Update countdown every hour
    const interval = setInterval(() => {
      setDaysLeft(getDaysUntilElection())
      const updatedDebate = getNextDebate()
      setNextDebate(updatedDebate)
      if (updatedDebate) {
        setDebateInfo(formatDebateDate(updatedDebate.dateIso))
      }
    }, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [])

  const dismiss = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      localStorage.setItem(storageKey, Date.now().toString())
      setIsVisible(false)
      setIsExiting(false)
    }, 200) // Match exit animation duration
  }, [storageKey])

  if (!isVisible) return null

  const debateStatus = nextDebate ? getDebateStatus(nextDebate) : null
  const isLive = debateStatus === "live"

  return (
    <div
      role="banner"
      aria-live="polite"
      className={cn(
        // Positioning
        "relative z-40 w-full",
        // Glassmorphic styling
        "border-b border-white/60 bg-white/80 backdrop-blur-2xl",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]",
        // Animation states
        isExiting ? "banner-exit" : "banner-enter",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-2 md:py-2.5">
        {/* Mobile: Stacked layout */}
        <div className="flex md:hidden items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Election countdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Vote className="h-4 w-4 text-primary" />
              <span className="text-sm">
                <span className="font-bold">{daysLeft}</span>
                <span className="text-muted-foreground ml-1">días</span>
              </span>
            </div>

            {/* Separator */}
            <div className="w-px h-4 bg-border shrink-0" aria-hidden="true" />

            {/* Next debate */}
            {nextDebate && debateInfo ? (
              <Link href="/debates" className="group flex items-center gap-1.5 flex-1 min-w-0">
                {isLive ? (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Vivo
                  </span>
                ) : (
                  <Tv className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm truncate">
                  <span className="font-medium">{nextDebate.hostName}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <Link href="/debates" className="group flex items-center gap-1.5 flex-1 min-w-0">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium truncate">Ver debates</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={dismiss}
            className="shrink-0 p-1.5 -mr-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Cerrar banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop: Single row layout */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-1 min-w-0">
            {/* Election countdown */}
            <div className="flex items-center gap-2 shrink-0">
              <Vote className="h-4 w-4 text-primary" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold">{daysLeft}</span>
                <span className="text-xs text-muted-foreground">días para votar</span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-4 bg-border" aria-hidden="true" />

            {/* Next debate */}
            {nextDebate && debateInfo ? (
              <Link href="/debates" className="group flex items-center gap-2 flex-1 min-w-0">
                {isLive ? (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    En Vivo
                  </span>
                ) : (
                  <Tv className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm truncate">
                  <span className="font-medium">{nextDebate.hostName}</span>
                  <span className="text-muted-foreground mx-1.5">·</span>
                  <span className="text-muted-foreground text-xs">
                    {debateInfo.dayNameFull} {debateInfo.dayNumber} - {debateInfo.time}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <Link href="/debates" className="group flex items-center gap-2 flex-1 min-w-0">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium">Ver calendario de debates</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={dismiss}
            className="shrink-0 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Cerrar banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
