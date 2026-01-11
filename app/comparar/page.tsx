"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { candidatos, areas, type Candidato } from "@/lib/data"
import { Swords, GraduationCap, Shield, TrendingUp, Leaf, ChevronDown, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap,
  shield: Shield,
  "trending-up": TrendingUp,
  leaf: Leaf,
}

function CandidateSelector({
  selected,
  onSelect,
  excludeId,
  side,
}: {
  selected: Candidato | null
  onSelect: (c: Candidato) => void
  excludeId?: string
  side: "left" | "right"
}) {
  const availableCandidatos = candidatos.filter((c) => c.id !== excludeId)

  if (selected) {
    return (
      <div className="relative">
        <div
          className="flex flex-col items-center rounded-2xl border-2 p-4 md:p-6"
          style={{ borderColor: selected.color }}
        >
          <button
            onClick={() => onSelect(null as unknown as Candidato)}
            className="absolute right-2 top-2 rounded-full p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full md:h-28 md:w-28">
            <Image src={selected.foto || "/placeholder.svg"} alt={selected.nombre} fill className="object-cover" />
          </div>
          <Badge style={{ backgroundColor: selected.color }} className="mb-2 text-white">
            {selected.partidoSiglas}
          </Badge>
          <h3 className="text-center text-lg font-semibold">{selected.nombre}</h3>
          <p className="text-center text-sm text-muted-foreground">{selected.posicionPolitica}</p>
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-primary hover:bg-muted/50 md:h-64">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">
            Seleccionar {side === "left" ? "primer" : "segundo"} candidato
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        {availableCandidatos.map((c) => (
          <DropdownMenuItem key={c.id} onClick={() => onSelect(c)} className="flex items-center gap-3 p-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={c.foto || "/placeholder.svg"} alt={c.nombre} fill className="object-cover" />
            </div>
            <div>
              <p className="font-medium">{c.nombre}</p>
              <p className="text-xs text-muted-foreground">{c.partidoSiglas}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function CompararPage() {
  const [candidato1, setCandidato1] = useState<Candidato | null>(null)
  const [candidato2, setCandidato2] = useState<Candidato | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const showComparison = candidato1 && candidato2 && selectedArea

  const getAreaPropuestas = (candidato: Candidato, areaName: string) => {
    return candidato.areas.find((a) => a.area.toLowerCase() === areaName.toLowerCase())?.propuestas || []
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-accent">
              <Swords className="h-5 w-5" />
              <span className="font-semibold">Enfrentamiento</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Compará Candidatos</h1>
            <p className="mt-2 text-muted-foreground">Elegí dos candidatos y un área para comparar sus propuestas</p>
          </div>

          {/* Candidate Selection */}
          <div className="mb-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <CandidateSelector selected={candidato1} onSelect={setCandidato1} excludeId={candidato2?.id} side="left" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <span className="text-lg font-bold">VS</span>
            </div>
            <CandidateSelector selected={candidato2} onSelect={setCandidato2} excludeId={candidato1?.id} side="right" />
          </div>

          {/* Area Selection */}
          {candidato1 && candidato2 && (
            <div className="mb-8">
              <h2 className="mb-4 text-center text-lg font-semibold">Seleccioná el área a comparar</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {areas.map((area) => {
                  const Icon = iconMap[area.icon] || GraduationCap
                  return (
                    <Button
                      key={area.id}
                      variant={selectedArea === area.id ? "default" : "outline"}
                      onClick={() => setSelectedArea(area.id)}
                      className={cn("flex items-center gap-2", selectedArea === area.id && "bg-primary")}
                    >
                      <Icon className="h-4 w-4" />
                      {area.nombre}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Comparison View */}
          {showComparison && (
            <div className="grid gap-4 md:grid-cols-2">
              {[candidato1, candidato2].map((candidato) => {
                const propuestas = getAreaPropuestas(candidato, areas.find((a) => a.id === selectedArea)?.nombre || "")
                return (
                  <div key={candidato.id}>
                    <div
                      className="mb-4 rounded-xl p-3 text-center text-white"
                      style={{ backgroundColor: candidato.color }}
                    >
                      <h3 className="font-semibold">{candidato.nombre}</h3>
                      <p className="text-sm opacity-90">{candidato.partidoSiglas}</p>
                    </div>
                    <div className="space-y-3">
                      {propuestas.length > 0 ? (
                        propuestas.map((p) => (
                          <Card key={p.id}>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div>
                                  <span className="text-xs font-medium uppercase tracking-wider text-accent">
                                    Problema
                                  </span>
                                  <p className="mt-1 text-sm">{p.problema}</p>
                                </div>
                                <div>
                                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                                    Solución
                                  </span>
                                  <p className="mt-1 text-sm font-medium">{p.solucion}</p>
                                </div>
                                <div>
                                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Cómo
                                  </span>
                                  <p className="mt-1 text-sm text-muted-foreground">{p.como}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card>
                          <CardContent className="p-4 text-center text-muted-foreground">
                            No hay propuestas en esta área
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Empty State */}
          {(!candidato1 || !candidato2) && (
            <div className="rounded-2xl border border-dashed border-muted-foreground/30 p-8 text-center">
              <Swords className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 font-semibold">Seleccioná dos candidatos</h3>
              <p className="text-sm text-muted-foreground">
                Elegí los candidatos que querés comparar para ver sus propuestas lado a lado
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
