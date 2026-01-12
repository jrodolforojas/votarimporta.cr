"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { creadores } from "@/lib/creadores"
import { ArrowLeft, Briefcase, Twitter, Instagram, Linkedin, Github, Globe, Trophy } from "lucide-react"

const socialLinks = [
  { key: "twitter", icon: Twitter, label: "Twitter" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "github", icon: Github, label: "GitHub" },
  { key: "web", icon: Globe, label: "Sitio Web" },
] as const

export default function CreadorDetailPage() {
  const params = useParams()
  const creador = creadores.find((c) => c.id === params.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!creador) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Creador no encontrado</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="relative">
        {/* Gradient header - black to white for neutrality */}
        <div
          className="absolute inset-x-0 top-0 h-32 md:h-40"
          style={{
            background: "linear-gradient(to right, #000000, #ffffff)",
          }}
        />

        <div className="relative px-4 py-6">
          <div className="mx-auto max-w-4xl">
            {/* Back button */}
            <Button asChild variant="ghost" className="mb-4 -ml-2 text-white hover:bg-white/20 hover:text-white">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>

            {/* Creator info section */}
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
              <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-lg md:w-48">
                <Image src={creador.foto || "/placeholder.svg"} alt={creador.nombre} fill className="object-cover" />
              </div>
              <div className="flex-1 md:rounded-xl md:bg-background/90 md:p-4 md:backdrop-blur-sm">
                <Badge className="mb-2 bg-foreground text-background">Creador</Badge>
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">{creador.nombre}</h1>
                <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{creador.ocupacion}</span>
                </div>
                <p className="text-muted-foreground">{creador.bio}</p>

                {/* Social links */}
                <div className="mt-4 flex items-center gap-3">
                  {socialLinks.map(({ key, icon: Icon, label }) => {
                    const url = creador.redesSociales[key as keyof typeof creador.redesSociales]
                    if (!url) return null
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {creador.logros.map((logro, index) => (
                <Card key={index} className="transition-all hover:shadow-md">
                  <CardContent className="p-4 text-center">
                    <Trophy className="mx-auto mb-2 h-6 w-6 text-foreground" />
                    <p className="text-sm">{logro}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission card */}
          <Card>
            <CardHeader>
              <CardTitle>Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Votar Importa nace del compromiso compartido de crear herramientas que faciliten la participación
                ciudadana informada. Creemos que cada voto cuenta y que la información accesible es la base de una
                democracia fuerte.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
