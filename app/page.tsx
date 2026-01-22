"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { CandidateCard } from "@/components/candidate-card"
import { candidatos } from "@/data/candidatos"
import { HelpCircle, ChevronDown, Github, Info } from "lucide-react"

export default function HomePage() {
  const scrollToCandidatos = () => {
    const element = document.getElementById("candidatos")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <section className="flex h-[calc(100vh-56px-64px)] flex-col items-center justify-center px-4 text-center md:h-[calc(100vh-64px)]">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Elecciones Costa Rica 2026
        </p>
        <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
          Tu voto decide el futuro
        </h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground text-pretty">
          Informate en minutos. Compará candidatos. Votá consciente.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-[200px] text-base">
            <Link href="/quiz">
              <HelpCircle className="mr-2 h-5 w-5" />
              ¿No sabés por quién votar?
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[200px] bg-transparent text-base"
            onClick={scrollToCandidatos}
          >
            Ver candidatos
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <button
          onClick={scrollToCandidatos}
          className="absolute bottom-24 md:bottom-8 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Scroll hacia candidatos"
        >
          <span className="text-xs">Scroll</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
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
