"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { candidatos } from "@/data/candidatos"
import { areas } from "@/lib/areas"
import type { Candidato, AreaName } from "@/lib/data"
import {
  Swords,
  ChevronDown,
  X,
  Check,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import { iconMap, defaultIcon } from "@/lib/icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

function CandidateSelector({
  selectedCandidatos,
  onAdd,
  onRemove,
  onClear,
}: {
  selectedCandidatos: Candidato[]
  onAdd: (c: Candidato) => void
  onRemove: (candidatoId: string) => void
  onClear: () => void
}) {
  const selectedIds = new Set(selectedCandidatos.map((c) => c.id))
  const availableCandidatos = candidatos.filter((c) => !selectedIds.has(c.id))

  const firstCandidate = selectedCandidatos[0] || null
  const secondCandidate = selectedCandidatos[1] || null
  const additionalCandidates = selectedCandidatos.slice(2)

  const CandidateBox = ({ 
    index, 
    candidato, 
    placeholder 
  }: { 
    index: number
    candidato: Candidato | null
    placeholder: string
  }) => {
    const availableForThisSlot = candidato ? [] : availableCandidatos

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/30 p-4 transition-colors hover:border-foreground hover:bg-muted/50">
            {candidato ? (
              <>
                <div className="relative mb-1 h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={candidato.foto || "/placeholder.svg"}
                    alt={candidato.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge 
                  style={{ backgroundColor: candidato.color }} 
                  className="text-white text-xs mb-1"
                >
                  {candidato.partidoSiglas}
                </Badge>
                <h3 className="text-center text-sm font-semibold">{candidato.nombre}</h3>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground text-center px-2">{placeholder}</span>
              </>
            )}
          </button>
        </DropdownMenuTrigger>
        {availableForThisSlot.length > 0 && (
          <DropdownMenuContent align="center" className="w-56 max-h-64 overflow-y-auto">
            {availableForThisSlot.map((c) => (
              <DropdownMenuItem key={c.id} onClick={() => onAdd(c)} className="flex items-center gap-3 p-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                  <Image src={c.foto || "/placeholder.svg"} alt={c.nombre} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{c.nombre}</p>
                  <p className="text-xs text-muted-foreground">{c.partidoSiglas}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Selecciona candidatos</h2>
        {selectedCandidatos.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            aria-label="Limpiar todos los candidatos"
          >
            Limpiar todo
          </button>
        )}
      </div>
      
      {/* Layout changes based on number of candidates */}
      {selectedCandidatos.length <= 2 ? (
        /* First two candidates with VS - only when exactly 2 or less */
        <div className="flex items-center gap-3 md:gap-4">
          {/* First candidate */}
          <div className="flex-1 relative">
            <CandidateBox 
              index={0}
              candidato={firstCandidate}
              placeholder="Primer candidato"
            />
            {firstCandidate && (
              <button
                onClick={() => onRemove(firstCandidate.id)}
                className="absolute right-1 top-1 rounded-full bg-background p-1 shadow-sm hover:bg-muted z-10"
                aria-label="Remover candidato"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* VS icon - only shown when exactly 2 candidates */}
          {selectedCandidatos.length === 2 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background flex-shrink-0 md:h-10 md:w-10">
              <span className="text-xs font-bold md:text-sm">VS</span>
            </div>
          )}

          {/* Second candidate */}
          <div className="flex-1 relative">
            <CandidateBox 
              index={1}
              candidato={secondCandidate}
              placeholder="Segundo candidato"
            />
            {secondCandidate && (
              <button
                onClick={() => onRemove(secondCandidate.id)}
                className="absolute right-1 top-1 rounded-full bg-background p-1 shadow-sm hover:bg-muted z-10"
                aria-label="Remover candidato"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Add more button - subtle */}
          {availableCandidatos.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground/30 bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground flex-shrink-0 md:h-10 md:w-10">
                  <Plus className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 max-h-64 overflow-y-auto">
                {availableCandidatos.map((c) => (
                  <DropdownMenuItem key={c.id} onClick={() => onAdd(c)} className="flex items-center gap-3 p-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                      <Image src={c.foto || "/placeholder.svg"} alt={c.nombre} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{c.nombre}</p>
                      <p className="text-xs text-muted-foreground">{c.partidoSiglas}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ) : (
        /* All candidates in grid when 3 or more - neutral layout */
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {selectedCandidatos.map((candidato, index) => (
            <div key={candidato.id} className="relative">
              <CandidateBox 
                index={index}
                candidato={candidato}
                placeholder={index === 0 ? "Primer candidato" : index === 1 ? "Segundo candidato" : `Candidato ${index + 1}`}
              />
              <button
                onClick={() => onRemove(candidato.id)}
                className="absolute right-1 top-1 rounded-full bg-background p-1 shadow-sm hover:bg-muted z-10"
                aria-label="Remover candidato"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* Add more button in grid */}
          {availableCandidatos.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-foreground hover:bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground px-2 text-center">Agregar candidato</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 max-h-64 overflow-y-auto">
                {availableCandidatos.map((c) => (
                  <DropdownMenuItem key={c.id} onClick={() => onAdd(c)} className="flex items-center gap-3 p-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                      <Image src={c.foto || "/placeholder.svg"} alt={c.nombre} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{c.nombre}</p>
                      <p className="text-xs text-muted-foreground">{c.partidoSiglas}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

    </div>
  )
}

function ScrollableComparison({
  candidatos,
  selectedArea,
  getAreaPropuestas,
}: {
  candidatos: Candidato[]
  selectedArea: AreaName
  getAreaPropuestas: (candidato: Candidato, areaName: AreaName) => any[]
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollButtons)
      window.addEventListener("resize", checkScrollButtons)
      return () => {
        container.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [candidatos, selectedArea])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // Calculate column width based on number of candidates
  // Show max 4 columns at once, but allow scrolling for more
  const maxVisibleColumns = 4
  const minColumnWidth = candidatos.length <= maxVisibleColumns ? "1fr" : "280px"

  return (
    <div className="relative">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 z-10 flex h-full w-12 items-center justify-center bg-gradient-to-r from-background via-background/80 to-transparent transition-opacity hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${candidatos.length}, ${minColumnWidth})`,
            minWidth: candidatos.length <= maxVisibleColumns ? "100%" : `${candidatos.length * 280 + (candidatos.length - 1) * 16}px`,
          }}
        >
          {candidatos.map((candidato) => {
            const propuestas = getAreaPropuestas(candidato, selectedArea)
            return (
              <div key={candidato.id} className="min-w-0">
                {/* Candidate header */}
                <div
                  className="mb-3 rounded-xl p-3 text-center text-white"
                  style={{ backgroundColor: candidato.color }}
                >
                  <h3 className="font-semibold text-sm truncate">{candidato.nombre}</h3>
                  <p className="text-xs opacity-90">{candidato.partidoSiglas}</p>
                </div>

                {/* Propuestas - solo solucion */}
                <div className="space-y-2">
                  {propuestas.length > 0 ? (
                    propuestas.map((propuesta, idx) => (
                      <Card key={idx} className="overflow-hidden">
                        <CardContent className="p-3 flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                          <p className="text-sm leading-relaxed">{propuesta.solucion}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-4 text-center text-sm text-muted-foreground">
                        No tiene propuestas en esta área
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 z-10 flex h-full w-12 items-center justify-center bg-gradient-to-l from-background via-background/80 to-transparent transition-opacity hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </button>
      )}

      {/* Scroll indicator dots */}
      {candidatos.length > maxVisibleColumns && (
        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: Math.ceil(candidatos.length / maxVisibleColumns) }).map((_, idx) => (
            <div
              key={idx}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
              aria-hidden="true"
            />
          ))}
        </div>
      )}
    </div>
  )
}

function AreaSelector({
  selectedArea,
  onSelect,
}: {
  selectedArea: AreaName | null
  onSelect: (area: AreaName) => void
}) {
  const selectedAreaData = areas.find((a) => a.area === selectedArea)
  const SelectedIcon = selectedAreaData ? iconMap[selectedAreaData.icon] || defaultIcon : null

  return (
    <div className="space-y-3">
      <h2 className="text-center text-sm font-medium text-muted-foreground">Selecciona el area</h2>

      {/* Mobile: Dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between h-12 bg-transparent">
              {selectedArea && SelectedIcon ? (
                <span className="flex items-center gap-2">
                  <SelectedIcon className="h-4 w-4" />
                  {selectedAreaData?.area}
                </span>
              ) : (
                <span className="text-muted-foreground">Elegir area a comparar</span>
              )}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-2rem)] max-h-64 overflow-y-auto">
          {areas.map((area) => {
            const Icon = iconMap[area.icon] || defaultIcon
            const isSelected = selectedArea === area.area
            return (
              <DropdownMenuItem
                  key={area.area}
                  onClick={() => onSelect(area.area)}
                  className="flex items-center gap-3 p-3"
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-sm">{area.area}</span>
                  {isSelected && <Check className="h-4 w-4 text-foreground" />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop: Horizontal scroll with badges */}
      <div className="hidden md:block">
        <div className="flex flex-wrap justify-center gap-2">
          {areas.map((area) => {
            const Icon = iconMap[area.icon] || defaultIcon
            const isSelected = selectedArea === area.area
            return (
              <Button
                key={area.area}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onSelect(area.area)}
                className={cn("flex items-center gap-1.5 text-xs", isSelected && "bg-foreground text-background")}
              >
                <Icon className="h-3.5 w-3.5" />
                {area.area}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function CompararPage() {
  const [selectedCandidatos, setSelectedCandidatos] = useState<Candidato[]>([])
  const [selectedArea, setSelectedArea] = useState<AreaName | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const showComparison = selectedCandidatos.length >= 2 && selectedArea

  const handleAddCandidato = (candidato: Candidato) => {
    setSelectedCandidatos((prev) => [...prev, candidato])
  }

  const handleRemoveCandidato = (candidatoId: string) => {
    setSelectedCandidatos((prev) => prev.filter((c) => c.id !== candidatoId))
  }

  const handleClearCandidatos = () => {
    setSelectedCandidatos([])
    setSelectedArea(null)
  }

  const getAreaPropuestas = (candidato: Candidato, areaName: AreaName) => {
    const areaPropuestas = candidato.propuestas.find((p) => p.area === areaName)
    return areaPropuestas?.propuestas || []
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="px-4 py-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
              <Swords className="h-4 w-4" />
              <span className="text-sm font-medium">Comparar</span>
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">Compara Candidatos</h1>
            <p className="mt-1 text-sm text-muted-foreground">Selecciona dos candidatos y un área</p>
          </div>

          {/* Candidate Selection */}
          <div className="mb-6">
            <CandidateSelector
              selectedCandidatos={selectedCandidatos}
              onAdd={handleAddCandidato}
              onRemove={handleRemoveCandidato}
              onClear={handleClearCandidatos}
            />
          </div>

          {/* Area Selection - show when at least 2 candidates selected */}
          {selectedCandidatos.length >= 2 && (
            <div className="mb-6">
              <AreaSelector selectedArea={selectedArea} onSelect={setSelectedArea} />
            </div>
          )}

          {/* Comparison View */}
          {showComparison && (
            <>
              {/* Desktop: Scrollable grid with max 4 columns visible */}
              <div className="hidden md:block">
                <ScrollableComparison
                  candidatos={selectedCandidatos}
                  selectedArea={selectedArea}
                  getAreaPropuestas={getAreaPropuestas}
                />
              </div>

              {/* Mobile: Intercalado */}
              <div className="md:hidden space-y-3">
                {(() => {
                  // Get all propuestas for all candidates
                  const allPropuestas = selectedCandidatos.map((candidato) => ({
                    candidato,
                    propuestas: getAreaPropuestas(candidato, selectedArea),
                  }))

                  // Find max length of propuestas
                  const maxLength = Math.max(...allPropuestas.map((p) => p.propuestas.length))

                  // Check if any candidate has propuestas
                  const hasAnyPropuestas = allPropuestas.some((p) => p.propuestas.length > 0)

                  if (!hasAnyPropuestas) {
                    return (
                      <Card>
                        <CardContent className="p-4 text-center text-sm text-muted-foreground">
                          Ninguno tiene propuestas en esta área
                        </CardContent>
                      </Card>
                    )
                  }

                  const items = []
                  // Iterate through each propuesta index
                  for (let i = 0; i < maxLength; i++) {
                    // For each candidate, add their propuesta at index i if it exists
                    allPropuestas.forEach(({ candidato, propuestas }) => {
                      if (propuestas[i]) {
                        items.push(
                          <Card
                            key={`${candidato.id}-${i}`}
                            className="overflow-hidden border-l-4"
                            style={{ borderLeftColor: candidato.color }}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="relative h-6 w-6 overflow-hidden rounded-full flex-shrink-0">
                                  <Image
                                    src={candidato.foto || "/placeholder.svg"}
                                    alt={candidato.nombre}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">
                                  {candidato.partidoSiglas}
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed">{propuestas[i].solucion}</p>
                            </CardContent>
                          </Card>,
                        )
                      }
                    })
                  }
                  return items
                })()}
              </div>
            </>
          )}

          {/* Empty State - only show when less than 2 candidates selected */}
          {selectedCandidatos.length < 2 && (
            <div className="rounded-2xl border border-dashed border-muted-foreground/30 p-6 text-center">
              <Swords className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
              <h3 className="mb-1 font-semibold text-sm">Selecciona al menos dos candidatos</h3>
              <p className="text-xs text-muted-foreground">Compara sus propuestas lado a lado</p>
            </div>
          )}

          {/* Show message to select area when candidates are selected but no area */}
          {selectedCandidatos.length >= 2 && !selectedArea && (
            <div className="rounded-2xl border border-dashed border-muted-foreground/30 p-6 text-center">
              <ChevronDown className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
              <h3 className="mb-1 font-semibold text-sm">Selecciona un área</h3>
              <p className="text-xs text-muted-foreground">Elige el área que quieres comparar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
