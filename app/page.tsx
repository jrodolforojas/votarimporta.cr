"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { CandidateCard } from "@/components/candidate-card"
import { NewsBanner } from "@/components/news-banner"
import { TemasKlave } from "@/components/temas-clave"
import { candidatos } from "@/data/candidatos"
import { Github, Info, Users, HelpCircle } from "lucide-react"

const ROTATING_PHRASES = [
  "el futuro",
  "el cambio",
  "Costa Rica",
  "el rumbo",
  "la democracia",
  "la justicia",
  "la igualdad",
  "la paz",
]

export default function HomePage() {
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const scrollToCandidatos = () => {
    const element = document.getElementById("candidatos")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />
      <NewsBanner />

      <section className="relative flex min-h-[calc(100vh-56px-64px-44px)] flex-col items-center justify-center px-6 py-8 md:min-h-[calc(100vh-64px-44px)] md:px-8 lg:px-12 lg:py-12 overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="hero-orb-blue" />
          <div className="hero-orb-warm" />
          {/* Texture layers */}
          <div className="hero-topo" />
          <div className="hero-grain" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center sm:items-start w-full max-w-4xl mx-auto">
          {/* Text Content */}
          <div className="text-center sm:text-left w-full">
            {/* Pulsing badge */}
            <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Elecciones 2026
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]">
              Tu voto decide{" "}
              <span
                key={phraseIndex}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 animate-in fade-in-0 duration-500"
              >
                {ROTATING_PHRASES[phraseIndex]}
              </span>
            </h1>
            <p className="mb-6 max-w-lg text-base md:text-lg text-muted-foreground text-pretty mx-auto sm:mx-0">
              Informate en minutos. Compará candidatos. Votá consciente.
            </p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 w-full">
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm md:text-base rounded-full px-6 py-5 shadow-lg shadow-primary/10 hover:scale-105 transition-transform"
                onClick={scrollToCandidatos}
              >
                <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Explorar Propuestas
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-sm md:text-base rounded-full px-5 py-5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm"
                asChild
              >
                <Link href="/quiz">
                  <HelpCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  ¿No sabés por quién votar?
                </Link>
              </Button>
            </div>

            {/* Temas Clave - Quick Filters */}
            <div className="pt-5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                O filtrá por lo que te importa:
              </p>
              <TemasKlave />
            </div>
          </div>

        </div>

      </section>

      <section id="candidatos" className="scroll-mt-16 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Candidatos Presidenciales</h2>
            <p className="mt-2 text-muted-foreground">{candidatos.length} candidatos registrados</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {candidatos.map((candidato) => (
              <CandidateCard key={candidato.id} candidato={candidato} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">
          <p className="text-sm text-muted-foreground">
            Una iniciativa de{" "}
            <Link href="/nosotros/rodolfo-rojas" className="font-medium text-foreground hover:underline">
              Rodolfo
            </Link>{" "}
            &{" "}
            <Link href="/nosotros/fabian-fonseca" className="font-medium text-foreground hover:underline">
              Fabián
            </Link>
          </p>
          <span className="hidden text-muted-foreground/50 sm:inline">•</span>
          <a
            href="https://github.com/jrodolforojas/votarimporta.cr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Código abierto</span>
          </a>
          <span className="hidden text-muted-foreground/50 sm:inline">•</span>
          <Link
            href="/transparencia"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Info className="h-4 w-4" />
            <span>Transparencia</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}
