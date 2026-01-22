"use client"

import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent } from "@/components/ui/card"
import { candidatos } from "@/data/candidatos"
import {
  Clock,
  MapPin,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Users,
  FileText,
  BookOpen,
  ExternalLink,
} from "lucide-react"

const TSE_URL = "https://www.tse.go.cr/dondevotar/donde-votar.aspx"

export default function GuiaPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 px-3 py-1.5 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-300">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-bold">Guia Oficial 2026</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Todo lo que necesitas para votar
            </h1>
            <p className="mt-2 text-muted-foreground">
              Tu manual de bolsillo para las Elecciones Nacionales. Preparate en 2 minutos.
            </p>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date & Time Card */}
            <Card className="border-2 dark:border-border">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Calendar className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Cuando?</h3>
                  <p className="text-2xl font-bold text-blue-700 mt-1 dark:text-blue-400">
                    Domingo 1 Feb
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground font-medium">
                    <Clock className="h-4 w-4" />
                    <span>6:00 a.m. - 6:00 p.m.</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    *Horario oficial del TSE
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Card */}
            <Card className="border-2 dark:border-border">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <CreditCard className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Que llevar?</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="font-medium">Cedula de Identidad</span>
                    </li>
                  </ul>
                  <a
                    href={TSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    <MapPin className="h-4 w-4" />
                    Donde voto? Consultar TSE
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card className="border-2 overflow-hidden dark:border-border">
            <div className="bg-slate-900 px-6 py-4 dark:bg-slate-950">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Cronograma Clave
              </h3>
            </div>
            <CardContent className="p-6">
              <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8">
                {/* Event 1 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-300 border-2 border-white dark:bg-slate-600 dark:border-slate-900" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    24 de Enero
                  </p>
                  <h4 className="text-base font-semibold">Llegada de Material</h4>
                  <p className="text-sm text-muted-foreground">
                    Las papeletas llegan a las juntas receptoras.
                  </p>
                </div>

                {/* Event 2 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-amber-400 border-2 border-white ring-4 ring-amber-50 dark:border-slate-900 dark:ring-amber-950" />
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide dark:text-amber-400">
                    28 de Enero
                  </p>
                  <h4 className="text-base font-bold">Fin de la Propaganda</h4>
                  <p className="text-sm text-muted-foreground">
                    Comienza la veda electoral. Cero anuncios politicos.
                  </p>
                </div>

                {/* Event 3 - Election Day */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-600 border-2 border-white ring-4 ring-blue-50 dark:border-slate-900 dark:ring-blue-950" />
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-wide dark:text-blue-400">
                    1 de Febrero
                  </p>
                  <h4 className="text-lg font-bold">Dia E: Elecciones Generales</h4>
                  <p className="text-sm text-muted-foreground">
                    Votacion para Presidente y 57 Diputados.
                  </p>
                </div>

                {/* Event 4 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-200 border-2 border-white dark:bg-slate-700 dark:border-slate-900" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    5 de Abril (Condicional)
                  </p>
                  <h4 className="text-base font-semibold text-muted-foreground">
                    Posible Segunda Ronda
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Si nadie supera el 40% de votos validos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Did You Know Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 40% Rule */}
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 dark:bg-blue-950 dark:border-blue-900">
              <h4 className="text-blue-900 font-bold flex items-center gap-2 mb-2 dark:text-blue-300">
                <FileText className="h-5 w-5" />
                La Regla del 40%
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed dark:text-blue-400">
                Para ganar en primera ronda, un candidato necesita el{" "}
                <span className="font-bold">40% + 1</span> de los votos validos. Si no,
                los dos primeros van a balotaje en abril.
              </p>
            </div>

            {/* Candidates */}
            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 dark:bg-purple-950 dark:border-purple-900">
              <h4 className="text-purple-900 font-bold flex items-center gap-2 mb-2 dark:text-purple-300">
                <Users className="h-5 w-5" />
                {candidatos.length} Candidatos
              </h4>
              <p className="text-sm text-purple-800 leading-relaxed dark:text-purple-400">
                Hay un 55% de indecisos segun encuestas recientes.
              </p>
              <Link
                href="/candidatos"
                className="underline font-semibold mt-2 inline-block text-purple-900 dark:text-purple-300"
              >
                Ver lista completa &rarr;
              </Link>
            </div>

            {/* Mandatory Voting */}
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 dark:bg-orange-950 dark:border-orange-900">
              <h4 className="text-orange-900 font-bold flex items-center gap-2 mb-2 dark:text-orange-300">
                <AlertTriangle className="h-5 w-5" />
                Voto Obligatorio
              </h4>
              <p className="text-sm text-orange-800 leading-relaxed dark:text-orange-400">
                El voto es un deber civico. La ley estipula multas si la abstencion
                supera ciertos umbrales, aunque historicamente rara vez se aplican.
              </p>
            </div>
          </div>

          {/* Disclaimer Footer */}
          <footer className="border-t border-border pt-6 text-center pb-4">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Informacion basada en datos del Tribunal Supremo de Elecciones (TSE). Esta
              plataforma es de codigo abierto y neutral. Para consultas oficiales, visita{" "}
              <a
                href="https://tse.go.cr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                tse.go.cr
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
