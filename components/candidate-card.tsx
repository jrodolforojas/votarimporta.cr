import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import type { Candidato } from "@/lib/data"

interface CandidateCardProps {
  candidato: Candidato
}

export function CandidateCard({ candidato }: CandidateCardProps) {
  return (
    <Link href={`/candidatos/${candidato.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={candidato.foto || "/placeholder.svg"}
              alt={candidato.nombre}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Badge className="mb-2 text-white" style={{ backgroundColor: candidato.color }}>
                {candidato.partidoSiglas}
              </Badge>
              <h3 className="text-lg font-semibold text-white">{candidato.nombre}</h3>
              <p className="text-sm text-white/80">{candidato.partido}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">{candidato.posicionPolitica}</p>
              <p className="text-xs text-muted-foreground">{candidato.ocupacion}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
