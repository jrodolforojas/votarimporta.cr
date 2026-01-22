"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Vote, Calendar, Clock, ChevronRight, Tv } from "lucide-react"
import { debates } from "@/data/debates"
import { formatDebateDate, getDebateStatus } from "@/lib/calendar"
import type { Debate } from "@/lib/data"

const ELECTION_DATE = new Date("2026-02-01T06:00:00-06:00")

function getNextDebate(): Debate | null {
  const now = new Date()
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

export function StatusCard() {
  const [daysLeft, setDaysLeft] = useState(getDaysUntilElection())
  const [nextDebate, setNextDebate] = useState<Debate | null>(null)
  const [debateInfo, setDebateInfo] = useState<ReturnType<typeof formatDebateDate> | null>(null)

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

  const debateStatus = nextDebate ? getDebateStatus(nextDebate) : null

  return (
    <Card className="relative w-full max-w-sm border-white/60 bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] ring-1 ring-white/50">
      {/* Decorative blob behind card */}
      <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-3xl blur-2xl" aria-hidden="true" />
      <CardContent className="p-4 space-y-4">
        {/* Election Countdown */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Vote className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground">Elecciones</p>
            <p className="text-lg font-bold">1 de Febrero, 2026</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {daysLeft > 0 ? (
                  <>
                    <span className="font-semibold text-foreground">{daysLeft}</span>{" "}
                    {daysLeft === 1 ? "dia restante" : "dias restantes"}
                  </>
                ) : daysLeft === 0 ? (
                  <span className="font-semibold text-primary">Hoy es el dia!</span>
                ) : (
                  <span className="text-muted-foreground">Elecciones finalizadas</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Next Debate */}
        {nextDebate && debateInfo ? (
          <Link href="/debates" className="group block">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  debateStatus === "live"
                    ? "bg-red-500/10 animate-pulse"
                    : "bg-secondary"
                }`}
              >
                <Tv
                  className={`h-5 w-5 ${
                    debateStatus === "live" ? "text-red-500" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {debateStatus === "live" ? "En Vivo" : "Proximo Debate"}
                  </p>
                  {debateStatus === "live" && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-500 text-white">
                      EN VIVO
                    </span>
                  )}
                </div>
                <p className="font-semibold truncate">{nextDebate.hostName}</p>
                <p className="text-sm text-muted-foreground">
                  {debateInfo.dayNameFull} {debateInfo.dayNumber} - {debateInfo.time}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ) : (
          <Link href="/debates" className="group block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Debates</p>
                <p className="font-semibold">Ver calendario completo</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
