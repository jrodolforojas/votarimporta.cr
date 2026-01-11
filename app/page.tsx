import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { CandidateCard } from "@/components/candidate-card"
import { candidatos } from "@/lib/data"
import { ArrowRight, Users, Swords, MessageCircle, HelpCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      {/* Hero Section */}
      <section className="border-b border-border px-4 py-6 md:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-1 text-sm text-muted-foreground">Elecciones Costa Rica 2026</p>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-balance">
                Conocé a los candidatos. Votá informado.
              </h1>
            </div>
            <div className="flex gap-2">
              <Button asChild size="lg" className="flex-1 md:flex-none">
                <Link href="/quiz">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  ¿No sabés por quién votar?
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1 md:flex-none bg-transparent">
                <Link href="/comparar">
                  <Swords className="mr-2 h-4 w-4" />
                  Comparar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Informate en minutos</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/candidatos" className="group">
              <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Candidatos</h3>
                <p className="text-sm text-muted-foreground">Conocé el perfil y propuestas de cada candidato</p>
              </div>
            </Link>
            <Link href="/comparar" className="group">
              <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-accent hover:shadow-lg">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                  <Swords className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">Enfrentamientos</h3>
                <p className="text-sm text-muted-foreground">Compará candidatos lado a lado por área</p>
              </div>
            </Link>
            <Link href="/chat" className="group">
              <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <MessageCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Preguntá con IA</h3>
                <p className="text-sm text-muted-foreground">Hacé preguntas sobre propuestas específicas</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Candidates Preview */}
      <section className="px-4 py-6 md:py-8 bg-muted/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Candidatos Presidenciales</h2>
            <span className="text-sm text-muted-foreground">{candidatos.length} candidatos</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {candidatos.map((candidato) => (
              <CandidateCard key={candidato.id} candidato={candidato} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-6 md:py-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/quiz" className="group">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">¿No sabés por quién votar?</h3>
                  <p className="text-sm text-muted-foreground">
                    Respondé algunas preguntas y encontrá tu candidato ideal
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link href="/comparar" className="group">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                  <Swords className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Compará candidatos</h3>
                  <p className="text-sm text-muted-foreground">Mirá sus propuestas lado a lado por área</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-6">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            Voto Consciente Costa Rica 2026 — Información ciudadana, no partidaria.
          </p>
        </div>
      </footer>
    </div>
  )
}
