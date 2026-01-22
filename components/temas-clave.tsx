"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  Shield,
  HeartPulse,
  TrainFront,
  Briefcase,
  GraduationCap,
  Leaf,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Filter,
} from "lucide-react"

// Key topics with icons - links to dedicated temas-clave page
const temasDestacados = [
  { id: "costo-vida", label: "Costo de Vida", icon: TrendingUp },
  { id: "seguridad", label: "Seguridad", icon: Shield },
  { id: "salud", label: "Salud", icon: HeartPulse },
  { id: "infraestructura", label: "Transporte", icon: TrainFront },
  { id: "empleo", label: "Empleo", icon: Briefcase },
  { id: "educacion", label: "Educación", icon: GraduationCap },
  { id: "ambiente", label: "Ambiente", icon: Leaf },
]

interface TemasClaveProps {
  className?: string
}

export function TemasKlave({ className }: TemasClaveProps) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const checkScroll = () => {
      setShowLeftFade(el.scrollLeft > 0)
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
    }

    checkScroll()
    el.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scrollLeft = () => {
    const el = scrollRef.current
    if (el) {
      el.scrollBy({ left: -600, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    const el = scrollRef.current
    if (el) {
      el.scrollBy({ left: 600, behavior: "smooth" })
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const temaId = e.target.value
    if (temaId) {
      router.push(`/temas-clave?tema=${temaId}`)
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Mobile: Dropdown */}
      <div className="sm:hidden">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
          <select
            onChange={handleSelectChange}
            defaultValue=""
            className="w-full appearance-none rounded-full border border-border bg-card pl-10 pr-10 py-3 text-sm font-medium text-center focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              Elegir tema...
            </option>
            {temasDestacados.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Desktop: Horizontal scroll pills */}
      <div className="hidden sm:flex relative items-center gap-2">
        {/* Left scroll arrow - visible when scrolled */}
        {showLeftFade && (
          <button
            onClick={scrollLeft}
            className="shrink-0 rounded-full bg-card border border-border p-2 shadow-sm transition-colors hover:bg-foreground hover:text-background"
            aria-label="Ver temas anteriores"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Pills container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {temasDestacados.map((tema) => {
            const Icon = tema.icon

            return (
              <Link
                key={tema.id}
                href={`/temas-clave?tema=${tema.id}`}
                className="group flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <Icon className="h-4 w-4" />
                {tema.label}
              </Link>
            )
          })}
        </div>

        {/* Right scroll arrow - always visible when there's overflow */}
        {showRightFade && (
          <button
            onClick={scrollRight}
            className="shrink-0 rounded-full bg-card border border-border p-2 shadow-sm transition-colors hover:bg-foreground hover:text-background"
            aria-label="Ver más temas"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
