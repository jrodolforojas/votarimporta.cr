import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Bot, Scale, ExternalLink } from "lucide-react"

export default function TransparenciaPage() {
  const principios = [
    {
      icon: FileText,
      titulo: "Fuentes Oficiales",
      descripcion: "Toda la información proviene de los planes de gobierno oficiales de cada partido.",
      items: ["Documentos públicos del TSE", "Planes de gobierno registrados", "Sin interpretaciones propias"],
    },
    {
      icon: Bot,
      titulo: "IA Transparente",
      descripcion: "El chatbot responde únicamente con información de los planes de gobierno.",
      items: ["Prompts públicos y verificables", "Outputs disponibles para revisión", "Sin sesgos ni opiniones"],
      link: {
        label: "Ver prompts en GitHub",
        url: "https://github.com/jrodolforojas/votacr2026/tree/main/ai",
      },
    },
    {
      icon: Scale,
      titulo: "100% Neutral",
      descripcion: "No apoyamos ni favorecemos a ningún partido político.",
      items: ["Presentamos hechos, no opiniones", "Mismo espacio para todos", "Código abierto y auditable"],
    },
  ]

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background px-4 pb-8 pt-6">
        <div className="mx-auto max-w-4xl">
          <Button asChild variant="ghost" className="mb-4 -ml-2">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>

          <h1 className="text-3xl font-bold md:text-4xl">Transparencia</h1>
          <p className="mt-2 text-lg text-muted-foreground">Cómo funciona esta plataforma</p>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 py-8">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {principios.map((principio) => (
            <Card key={principio.titulo} className="border-2 transition-all hover:border-foreground/20">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-foreground">
                  <principio.icon className="h-6 w-6 text-background" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{principio.titulo}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{principio.descripcion}</p>
                <ul className="space-y-1.5">
                  {principio.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
                {principio.link && (
                  <a
                    href={principio.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    {principio.link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-lg bg-muted/50 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Este sistema se limita a presentar información pública de manera accesible. No emitimos juicios de valor ni
            recomendaciones de voto.
          </p>
        </div>
      </div>
    </div>
  )
}
