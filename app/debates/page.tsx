import { MobileNav } from "@/components/mobile-nav"
import { DebateCard } from "@/components/debate-card"
import { DebateHero } from "@/components/debate-hero"
import { debates } from "@/data/debates"
import { AlertCircle } from "lucide-react"

export default function DebatesPage() {
  // Sort debates by date
  const sortedDebates = [...debates].sort(
    (a, b) => new Date(a.dateIso).getTime() - new Date(b.dateIso).getTime()
  )

  // Separate upcoming/live from completed
  const now = new Date()
  const upcomingDebates = sortedDebates.filter(
    (d) =>
      new Date(d.dateIso).getTime() + 2 * 60 * 60 * 1000 > now.getTime() &&
      d.status !== "cancelled"
  )
  const pastDebates = sortedDebates.filter(
    (d) =>
      new Date(d.dateIso).getTime() + 2 * 60 * 60 * 1000 <= now.getTime() ||
      d.status === "cancelled"
  )

  // Get the next/current debate for hero
  const heroDebate = upcomingDebates[0]
  const remainingDebates = upcomingDebates.slice(1)

  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-950 md:pb-0">
      <MobileNav />

      <div className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
              Agenda de Debates
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Sigue la cobertura oficial de los debates presidenciales 2026.
            </p>
          </div>

          {/* Hero: Next Debate */}
          {heroDebate && (
            <section className="mb-10">
              <DebateHero debate={heroDebate} />
            </section>
          )}

          {/* Upcoming Debates Grid */}
          {remainingDebates.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Otros debates programados
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {remainingDebates.map((debate) => (
                  <DebateCard key={debate.id} debate={debate} />
                ))}
              </div>
            </section>
          )}

          {/* Past Debates */}
          {pastDebates.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400">
                Debates anteriores
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pastDebates.map((debate) => (
                  <DebateCard key={debate.id} debate={debate} />
                ))}
              </div>
            </section>
          )}

          {/* Disclaimer Footer */}
          <footer className="mt-12 rounded-xl border-2 border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <p className="font-bold text-amber-900 dark:text-amber-200">
                  Aviso importante
                </p>
                <p className="mt-1 font-medium">
                  Los horarios y fechas están sujetos a cambios por parte de los
                  organizadores. Recomendamos verificar con los medios de
                  comunicación oficiales antes de cada evento.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
