"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Navigation, Loader2 } from "lucide-react"

interface VotingInfo {
  cedula: string
  nombre: string
  provincia: string
  canton: string
  distrito: string
  centroVotacion: string
  direccion: string
  mesa: string
  elector: string
}

// Mock function - in production this would call TSE API
function fetchVotingInfo(cedula: string): Promise<VotingInfo | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data for demo
      if (cedula === "208110984") {
        resolve({
          cedula: "208110984",
          nombre: "JOSE RODOLFO ROJAS GUZMAN",
          provincia: "ALAJUELA",
          canton: "SAN CARLOS",
          distrito: "SAN ROQUE",
          centroVotacion: "ESCUELA JUAN BAUTISTA SOLIS RODRÍGUEZ",
          direccion: "300 SUR DEL HOSPITAL DE SAN CARLOS",
          mesa: "3156",
          elector: "195",
        })
      } else {
        // Generate mock data for any valid cedula
        resolve({
          cedula,
          nombre: "USUARIO DEMO",
          provincia: "SAN JOSÉ",
          canton: "CENTRAL",
          distrito: "CATEDRAL",
          centroVotacion: "LICEO DE COSTA RICA",
          direccion: "AVENIDA 18, CALLE 9",
          mesa: "1234",
          elector: "567",
        })
      }
    }, 800)
  })
}

export function DondeVotoContent() {
  const [cedula, setCedula] = useState("")
  const [votingInfo, setVotingInfo] = useState<VotingInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9)
    setCedula(value)
    setError("")
  }

  const handleSearch = async () => {
    if (cedula.length !== 9) {
      setError("La cédula debe tener 9 dígitos")
      return
    }

    setLoading(true)
    setError("")
    setSearched(true)

    try {
      const info = await fetchVotingInfo(cedula)
      setVotingInfo(info)
    } catch {
      setError("Error al buscar información")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const openInMaps = (app: "google" | "waze") => {
    if (!votingInfo) return

    const query = encodeURIComponent(
      `${votingInfo.centroVotacion}, ${votingInfo.canton}, ${votingInfo.provincia}, Costa Rica`,
    )

    if (app === "google") {
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank")
    } else {
      window.open(`https://waze.com/ul?q=${query}`, "_blank")
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">¿Dónde voto?</h1>
        <p className="mt-2 text-muted-foreground">Ingresá tu cédula para encontrar tu centro de votación</p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="101230123"
            value={cedula}
            onChange={handleCedulaChange}
            onKeyDown={handleKeyDown}
            className="h-12 text-lg font-mono tracking-wider"
            aria-label="Número de cédula"
          />
          <Button onClick={handleSearch} disabled={loading || cedula.length !== 9} size="lg" className="h-12 px-6">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        <p className="mt-2 text-xs text-muted-foreground">9 dígitos sin guiones • {cedula.length}/9</p>
      </div>

      {/* Results */}
      {searched && !loading && votingInfo && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Key Info - Most Important */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Tu centro de votación
            </div>

            <h2 className="text-xl font-bold leading-tight">{votingInfo.centroVotacion}</h2>

            <p className="mt-2 text-muted-foreground">{votingInfo.direccion}</p>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openInMaps("google")}>
                <Navigation className="mr-2 h-4 w-4" />
                Google Maps
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openInMaps("waze")}>
                <Navigation className="mr-2 h-4 w-4" />
                Waze
              </Button>
            </div>
          </div>

          {/* Secondary Info - Quick Reference */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Mesa</p>
              <p className="text-2xl font-bold">{votingInfo.mesa}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Elector #</p>
              <p className="text-2xl font-bold">{votingInfo.elector}</p>
            </div>
          </div>

          {/* Location Details */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Provincia</span>
                <span className="font-medium">{votingInfo.provincia}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cantón</span>
                <span className="font-medium">{votingInfo.canton}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distrito</span>
                <span className="font-medium">{votingInfo.distrito}</span>
              </div>
            </div>
          </div>

          {/* User verification */}
          <p className="text-center text-xs text-muted-foreground">
            Cédula: {votingInfo.cedula} • {votingInfo.nombre}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!searched && (
        <div className="text-center text-muted-foreground">
          <MapPin className="mx-auto h-12 w-12 opacity-20" />
          <p className="mt-4 text-sm">Ingresá tu número de cédula para ver dónde te toca votar</p>
        </div>
      )}
    </main>
  )
}
