import { MobileNav } from "@/components/mobile-nav"
import { CandidateCard } from "@/components/candidate-card"
import { candidatos } from "@/data/candidatos"

export default function CandidatosPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold md:text-4xl">Candidatos 2026</h1>
            <p className="mt-2 text-muted-foreground">Conocé el perfil y propuestas de cada candidato presidencial</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {candidatos.map((candidato) => (
              <CandidateCard key={candidato.id} candidato={candidato} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
