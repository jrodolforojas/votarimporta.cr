"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { candidatos } from "@/data/candidatos"
import type { Candidato, AreaName } from "@/lib/data"
import {
  Flame,
  ChevronDown,
  AlertCircle,
  ArrowRightLeft,
  Share2,
  TrendingUp,
  Shield,
  HeartPulse,
  TrainFront,
  Briefcase,
  GraduationCap,
  Leaf,
  Check,
  Link2,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Per-topic color themes for dynamic branding
const TOPIC_CONFIG: Record<string, {
  theme: {
    active: string
    badge: string
    soft: string
    icon: string
    link: string
    hover: string
    hoverBorder: string
    headerBg: string
  }
}> = {
  "costo-vida": {
    theme: {
      active: "bg-emerald-600 text-white ring-emerald-600",
      badge: "bg-emerald-600",
      soft: "bg-emerald-50/50",
      icon: "text-emerald-600",
      link: "text-emerald-700 hover:text-emerald-800",
      hover: "hover:bg-emerald-50/30",
      hoverBorder: "hover:border-emerald-400",
      headerBg: "bg-emerald-100 text-emerald-800",
    },
  },
  "seguridad": {
    theme: {
      active: "bg-blue-700 text-white ring-blue-700",
      badge: "bg-blue-700",
      soft: "bg-blue-50/50",
      icon: "text-blue-700",
      link: "text-blue-700 hover:text-blue-800",
      hover: "hover:bg-blue-50/30",
      hoverBorder: "hover:border-blue-400",
      headerBg: "bg-blue-100 text-blue-800",
    },
  },
  "salud": {
    theme: {
      active: "bg-rose-600 text-white ring-rose-600",
      badge: "bg-rose-600",
      soft: "bg-rose-50/50",
      icon: "text-rose-600",
      link: "text-rose-700 hover:text-rose-800",
      hover: "hover:bg-rose-50/30",
      hoverBorder: "hover:border-rose-400",
      headerBg: "bg-rose-100 text-rose-800",
    },
  },
  "infraestructura": {
    theme: {
      active: "bg-amber-600 text-white ring-amber-600",
      badge: "bg-amber-600",
      soft: "bg-amber-50/50",
      icon: "text-amber-600",
      link: "text-amber-700 hover:text-amber-800",
      hover: "hover:bg-amber-50/30",
      hoverBorder: "hover:border-amber-400",
      headerBg: "bg-amber-100 text-amber-800",
    },
  },
  "empleo": {
    theme: {
      active: "bg-violet-600 text-white ring-violet-600",
      badge: "bg-violet-600",
      soft: "bg-violet-50/50",
      icon: "text-violet-600",
      link: "text-violet-700 hover:text-violet-800",
      hover: "hover:bg-violet-50/30",
      hoverBorder: "hover:border-violet-400",
      headerBg: "bg-violet-100 text-violet-800",
    },
  },
  "educacion": {
    theme: {
      active: "bg-cyan-600 text-white ring-cyan-600",
      badge: "bg-cyan-600",
      soft: "bg-cyan-50/50",
      icon: "text-cyan-600",
      link: "text-cyan-700 hover:text-cyan-800",
      hover: "hover:bg-cyan-50/30",
      hoverBorder: "hover:border-cyan-400",
      headerBg: "bg-cyan-100 text-cyan-800",
    },
  },
  "ambiente": {
    theme: {
      active: "bg-green-600 text-white ring-green-600",
      badge: "bg-green-600",
      soft: "bg-green-50/50",
      icon: "text-green-600",
      link: "text-green-700 hover:text-green-800",
      hover: "hover:bg-green-50/30",
      hoverBorder: "hover:border-green-400",
      headerBg: "bg-green-100 text-green-800",
    },
  },
}

// Key topics for 2026 elections
const temasDestacados = [
  { id: "costo-vida", label: "Costo de Vida", area: "Economia" as AreaName, icon: TrendingUp },
  { id: "seguridad", label: "Seguridad", area: "Seguridad" as AreaName, icon: Shield },
  { id: "salud", label: "Salud", area: "Salud" as AreaName, icon: HeartPulse },
  { id: "infraestructura", label: "Transporte", area: "Infraestructura" as AreaName, icon: TrainFront },
  { id: "empleo", label: "Empleo", area: "Economia" as AreaName, icon: Briefcase },
  { id: "educacion", label: "Educación", area: "Educacion" as AreaName, icon: GraduationCap },
  { id: "ambiente", label: "Ambiente", area: "Ambiente" as AreaName, icon: Leaf },
]

function TemasClaveContent() {
  const searchParams = useSearchParams()
  const temaParam = searchParams.get("tema")

  // Auto-select first 2 candidates
  const [candidato1, setCandidato1] = useState<Candidato>(candidatos[0])
  const [candidato2, setCandidato2] = useState<Candidato>(candidatos[1])

  // Initialize tema from URL param or default to first
  const [selectedTema, setSelectedTema] = useState(() => {
    if (temaParam) {
      const found = temasDestacados.find((t) => t.id === temaParam)
      if (found) return found
    }
    return temasDestacados[0]
  })

  // Share state
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const getAreaPropuestas = (candidato: Candidato, areaName: AreaName) => {
    const areaPropuestas = candidato.propuestas.find((p) => p.area === areaName)
    return areaPropuestas?.propuestas || []
  }

  const propuestas1 = useMemo(
    () => getAreaPropuestas(candidato1, selectedTema.area),
    [candidato1, selectedTema]
  )
  const propuestas2 = useMemo(
    () => getAreaPropuestas(candidato2, selectedTema.area),
    [candidato2, selectedTema]
  )

  const handleRandomSwap = () => {
    const shuffled = [...candidatos].sort(() => Math.random() - 0.5)
    setCandidato1(shuffled[0])
    setCandidato2(shuffled[1])
  }

  const getShareUrl = () => `https://votarimporta.cr/temas-clave?tema=${selectedTema.id}`
  const getShareText = () => `${candidato1.nombre} vs ${candidato2.nombre} sobre ${selectedTema.label} - Votar Importa CR`

  const handleNativeShare = async () => {
    const url = getShareUrl()
    try {
      await navigator.share({
        title: `Comparar: ${candidato1.nombre} vs ${candidato2.nombre}`,
        text: `Compara las propuestas de ${candidato1.nombre} y ${candidato2.nombre} sobre ${selectedTema.label}`,
        url,
      })
    } catch {
      // User cancelled or error
    }
    setShowShareMenu(false)
  }

  const handleCopyLink = async () => {
    const url = getShareUrl()
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setShowShareMenu(false)
  }

  const handleShareWhatsApp = () => {
    const url = getShareUrl()
    const text = encodeURIComponent(`${getShareText()}\n${url}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
    setShowShareMenu(false)
  }

  const handleShareTwitter = () => {
    const url = getShareUrl()
    const text = encodeURIComponent(getShareText())
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank")
    setShowShareMenu(false)
  }

  const handleShareFacebook = () => {
    const url = getShareUrl()
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
    setShowShareMenu(false)
  }

  // Get current theme based on selected topic
  const theme = TOPIC_CONFIG[selectedTema.id]?.theme ?? TOPIC_CONFIG["costo-vida"].theme

  return (
    <>
      {/* Header */}
      <div className="mb-6 text-center">
        <div className={cn("mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors", theme.headerBg)}>
          <Flame className="h-4 w-4" />
          <span className="text-sm font-bold">Temas Clave 2026</span>
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">Comparador de Temas Clave</h1>
      </div>

      {/* Topic Pills */}
      <div className="mb-8">
        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {temasDestacados.map((tema) => {
              const Icon = tema.icon
              const isSelected = selectedTema.id === tema.id
              const temaTheme = TOPIC_CONFIG[tema.id]?.theme
              return (
                <button
                  key={tema.id}
                  onClick={() => setSelectedTema(tema)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                    isSelected
                      ? cn(temaTheme?.active, "shadow-lg")
                      : cn("bg-white text-muted-foreground border border-border", temaTheme?.hoverBorder)
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tema.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Desktop: Centered wrap */}
        <div className="hidden md:flex flex-wrap justify-center gap-2">
          {temasDestacados.map((tema) => {
            const Icon = tema.icon
            const isSelected = selectedTema.id === tema.id
            const temaTheme = TOPIC_CONFIG[tema.id]?.theme
            return (
              <button
                key={tema.id}
                onClick={() => setSelectedTema(tema)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105",
                  isSelected
                    ? cn(temaTheme?.active, "shadow-lg ring-2 ring-offset-2")
                    : cn("bg-white text-muted-foreground border border-border", temaTheme?.hoverBorder)
                )}
              >
                <Icon className="h-4 w-4" />
                {tema.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Comparison Card */}
      <Card className="overflow-hidden shadow-xl border-border/50">
        {/* Head-to-Head Control Bar */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] border-b border-border">
          {/* Candidate A Selector */}
          <div className={cn("p-4 md:p-6 flex items-center gap-4 transition-colors", theme.soft)}>
            <div className="relative">
              <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-full border-4 border-white shadow-md">
                <Image
                  src={candidato1.foto || "/placeholder.svg"}
                  alt={candidato1.nombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white"
                style={{ backgroundColor: candidato1.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Candidato A
              </label>
              {/* Pill-styled selector to fix dropdown blindness */}
              <div className="relative rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-slate-300">
                <select
                  className="appearance-none w-full bg-transparent text-base md:text-lg font-bold cursor-pointer focus:outline-none pr-6 truncate"
                  value={candidato1.id}
                  onChange={(e) => {
                    const c = candidatos.find((c) => c.id === e.target.value)
                    if (c) setCandidato1(c)
                  }}
                >
                  {candidatos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{candidato1.partidoSiglas}</p>
            </div>
          </div>

          {/* VS Badge */}
          <div className={cn("flex items-center justify-center p-2 md:p-0 md:bg-transparent relative z-10 transition-colors", theme.soft, "md:bg-transparent")}>
            <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white font-black text-xs italic transition-colors", theme.badge)}>
              VS
            </div>
          </div>

          {/* Candidate B Selector */}
          <div className={cn("p-4 md:p-6 flex items-center gap-4 flex-row-reverse md:flex-row justify-end md:justify-start transition-colors", theme.soft)}>
            <div className="flex-1 min-w-0 text-right md:text-left md:order-1 order-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Candidato B
              </label>
              {/* Pill-styled selector to fix dropdown blindness */}
              <div className="relative rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-slate-300">
                <select
                  className="appearance-none w-full bg-transparent text-base md:text-lg font-bold cursor-pointer focus:outline-none pr-6 truncate text-right md:text-left"
                  value={candidato2.id}
                  onChange={(e) => {
                    const c = candidatos.find((c) => c.id === e.target.value)
                    if (c) setCandidato2(c)
                  }}
                >
                  {candidatos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{candidato2.partidoSiglas}</p>
            </div>
            <div className="relative md:order-2 order-1">
              <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-full border-4 border-white shadow-md">
                <Image
                  src={candidato2.foto || "/placeholder.svg"}
                  alt={candidato2.nombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white"
                style={{ backgroundColor: candidato2.color }}
              />
            </div>
          </div>
        </div>

        {/* Proposal Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border min-h-[300px]">
          {/* Column A */}
          <div className={cn("p-6 md:p-8 transition-colors", theme.hover)}>
            <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 flex items-center gap-2">
              {(() => {
                const Icon = selectedTema.icon
                return <Icon className={cn("h-4 w-4", theme.icon)} />
              })()}
              Propuesta de {candidato1.nombre.split(" ")[0]}
            </h3>

            {propuestas1.length > 0 ? (
              <div className="space-y-4">
                <p className="text-base md:text-lg leading-relaxed font-medium">
                  &ldquo;{propuestas1[0].solucion}&rdquo;
                </p>
                {candidato1.planGobiernoUrl && (
                  <a
                    href={candidato1.planGobiernoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("inline-flex items-center gap-2 text-xs font-bold underline-offset-2 hover:underline", theme.link)}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Ver en Plan de Gobierno →
                  </a>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground bg-muted/50 rounded-2xl border border-dashed">
                <AlertCircle className="h-6 w-6 mb-2" />
                <span className="text-sm">Sin propuesta registrada</span>
              </div>
            )}
          </div>

          {/* Column B */}
          <div className={cn("p-6 md:p-8 transition-colors", theme.hover)}>
            <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 flex items-center gap-2">
              {(() => {
                const Icon = selectedTema.icon
                return <Icon className={cn("h-4 w-4", theme.icon)} />
              })()}
              Propuesta de {candidato2.nombre.split(" ")[0]}
            </h3>

            {propuestas2.length > 0 ? (
              <div className="space-y-4">
                <p className="text-base md:text-lg leading-relaxed font-medium">
                  &ldquo;{propuestas2[0].solucion}&rdquo;
                </p>
                {candidato2.planGobiernoUrl && (
                  <a
                    href={candidato2.planGobiernoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("inline-flex items-center gap-2 text-xs font-bold underline-offset-2 hover:underline", theme.link)}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Ver en Plan de Gobierno →
                  </a>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground bg-muted/50 rounded-2xl border border-dashed">
                <AlertCircle className="h-6 w-6 mb-2" />
                <span className="text-sm">Sin propuesta registrada</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className={cn("p-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-border transition-colors rounded-b-xl", theme.soft)}>
          <button
            onClick={handleRandomSwap}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Cambiar aleatoriamente
          </button>

          {/* Share Menu */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className={cn(
                "flex items-center gap-2 transition-all",
                copied && "bg-green-50 border-green-300 text-green-700"
              )}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </>
              )}
            </Button>

            {/* Dropdown */}
            {showShareMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowShareMenu(false)}
                />
                {/* Menu */}
                <div className="absolute right-0 bottom-full mb-2 z-50 w-48 rounded-xl border border-border bg-white shadow-lg overflow-hidden">
                  {/* Native share (mobile) */}
                  {"share" in navigator && (
                    <button
                      onClick={handleNativeShare}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                    >
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                      Compartir...
                    </button>
                  )}

                  <button
                    onClick={handleShareWhatsApp}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                  >
                    <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </button>

                  <button
                    onClick={handleShareTwitter}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </button>

                  <button
                    onClick={handleShareFacebook}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                  >
                    <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>

                  <div className="border-t border-border" />

                  <button
                    onClick={handleCopyLink}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                  >
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    Copiar enlace
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}

function TemasClaveLoading() {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-orange-800">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-bold">Temas Clave 2026</span>
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">Comparador de Temas Clave</h1>
      </div>
      <div className="h-[500px] animate-pulse rounded-2xl bg-muted" />
    </>
  )
}

export default function TemasKlavePage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <Suspense fallback={<TemasClaveLoading />}>
            <TemasClaveContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
