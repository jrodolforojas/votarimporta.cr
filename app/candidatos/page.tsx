"use client"

import { Suspense, useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { CandidateCard } from "@/components/candidate-card"
import { CandidateFilterBar, type SortOrder } from "@/components/candidate-filter-bar"
import { candidatos } from "@/data/candidatos"

// Get unique parties from candidates
const parties = Array.from(
  new Map(
    candidatos.map((c) => [
      c.partidoSiglas,
      { siglas: c.partidoSiglas, nombre: c.partido, color: c.color },
    ])
  ).values()
)

// Fisher-Yates shuffle with seed
function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array]
  let m = result.length
  while (m) {
    const i = Math.floor(pseudoRandom(seed + m) * m--)
    ;[result[m], result[i]] = [result[i], result[m]]
  }
  return result
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function CandidatosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Parse URL params
  const urlParties = searchParams.get("partido")?.split(",").filter(Boolean) || []
  const urlSort = (searchParams.get("orden") as SortOrder) || "random"

  const [selectedParties, setSelectedParties] = useState<string[]>(urlParties)
  const [sortOrder, setSortOrder] = useState<SortOrder>(urlSort)
  const [randomSeed] = useState(() => Math.floor(Math.random() * 1000))

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedParties.length > 0) {
      params.set("partido", selectedParties.join(","))
    }
    if (sortOrder !== "random") {
      params.set("orden", sortOrder)
    }
    const queryString = params.toString()
    router.replace(`/candidatos${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }, [selectedParties, sortOrder, router])

  // Filter and sort candidates
  const filteredCandidatos = useMemo(() => {
    let result = [...candidatos]

    // Filter by party
    if (selectedParties.length > 0) {
      result = result.filter((c) => selectedParties.includes(c.partidoSiglas))
    }

    // Sort
    switch (sortOrder) {
      case "az":
        result.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
        break
      case "za":
        result.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"))
        break
      case "random":
      default:
        result = seededShuffle(result, randomSeed)
        break
    }

    return result
  }, [selectedParties, sortOrder, randomSeed])

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold md:text-4xl">Candidatos 2026</h1>
        <p className="mt-2 text-muted-foreground">
          Conoce el perfil y propuestas de cada candidato presidencial
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <CandidateFilterBar
          parties={parties}
          selectedParties={selectedParties}
          onPartyChange={setSelectedParties}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-muted-foreground">
        {filteredCandidatos.length} de {candidatos.length} candidatos
      </p>

      {/* Candidates Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCandidatos.map((candidato) => (
          <CandidateCard key={candidato.id} candidato={candidato} />
        ))}
      </div>

      {/* No results */}
      {filteredCandidatos.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No se encontraron candidatos con los filtros seleccionados</p>
        </div>
      )}
    </>
  )
}

export default function CandidatosPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<CandidatosLoading />}>
            <CandidatosContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function CandidatosLoading() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold md:text-4xl">Candidatos 2026</h1>
        <p className="mt-2 text-muted-foreground">
          Conoce el perfil y propuestas de cada candidato presidencial
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </>
  )
}
