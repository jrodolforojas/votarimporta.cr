import type React from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { candidatos } from "@/lib/data"
import { ArrowLeft, GraduationCap, Shield, TrendingUp, Leaf, Briefcase, Award, MessageCircle } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap,
  shield: Shield,
  "trending-up": TrendingUp,
  leaf: Leaf,
}

export function generateStaticParams() {
  return candidatos.map((c) => ({ id: c.id }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CandidatoDetailPage({ params }: PageProps) {
  const { id } = await params
  const candidato = candidatos.find((c) => c.id === id)

  if (!candidato) {
    notFound()
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="px-4 py-6">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-4 -ml-2">
            <Link href="/candidatos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-2xl md:w-48">
              <Image src={candidato.foto || "/placeholder.svg"} alt={candidato.nombre} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <Badge className="mb-2 text-white" style={{ backgroundColor: candidato.color }}>
                {candidato.partido}
              </Badge>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">{candidato.nombre}</h1>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{candidato.posicionPolitica}</Badge>
                <Badge variant="outline">{candidato.ideologia}</Badge>
              </div>
              <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{candidato.ocupacion}</span>
              </div>
              <p className="text-muted-foreground">{candidato.bio}</p>
              <Button asChild className="mt-4" style={{ backgroundColor: candidato.color }}>
                <Link href={`/chat?candidato=${candidato.id}`}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Preguntarle con IA
                </Link>
              </Button>
            </div>
          </div>

          {/* Logros */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Principales Logros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {candidato.logros.map((logro, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{logro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Propuestas por Área */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Propuestas por Área</h2>
            <Tabs defaultValue={candidato.areas[0]?.area.toLowerCase()} className="w-full">
              <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
                {candidato.areas.map((area) => {
                  const Icon = iconMap[area.icon] || GraduationCap
                  return (
                    <TabsTrigger
                      key={area.area}
                      value={area.area.toLowerCase()}
                      className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {area.area}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
              {candidato.areas.map((area) => (
                <TabsContent key={area.area} value={area.area.toLowerCase()} className="space-y-4">
                  {area.propuestas.map((propuesta) => (
                    <Card key={propuesta.id}>
                      <CardContent className="p-4 md:p-6">
                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-medium uppercase tracking-wider text-accent">Problema</span>
                            <p className="mt-1 font-medium">{propuesta.problema}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium uppercase tracking-wider text-primary">Solución</span>
                            <p className="mt-1 font-medium">{propuesta.solucion}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Cómo lo harán
                            </span>
                            <p className="mt-1 text-muted-foreground">{propuesta.como}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
