"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { candidatos, type Candidato } from "@/lib/data"
import { ArrowLeft, ArrowRight, RefreshCw, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Question {
  id: string
  question: string
  type: "single" | "multiple"
  options: {
    label: string
    value: string
    weight: Record<string, number> // candidatoId -> weight
  }[]
}

const questions: Question[] = [
  {
    id: "preocupacion",
    question: "¿Qué es lo que más te preocupa de Costa Rica?",
    type: "single",
    options: [
      {
        label: "El desempleo y la falta de oportunidades",
        value: "economia",
        weight: { "candidato-1": 3, "candidato-2": 3, "candidato-3": 1, "candidato-4": 2 },
      },
      {
        label: "La inseguridad y el crimen",
        value: "seguridad",
        weight: { "candidato-1": 2, "candidato-2": 2, "candidato-3": 1, "candidato-4": 3 },
      },
      {
        label: "La calidad de la educación",
        value: "educacion",
        weight: { "candidato-1": 3, "candidato-2": 2, "candidato-3": 2, "candidato-4": 1 },
      },
      {
        label: "El cambio climático y el ambiente",
        value: "ambiente",
        weight: { "candidato-1": 2, "candidato-2": 1, "candidato-3": 3, "candidato-4": 1 },
      },
    ],
  },
  {
    id: "rol-estado",
    question: "¿Cuál debería ser el rol del Estado en la economía?",
    type: "single",
    options: [
      {
        label: "Debe intervenir más para reducir la desigualdad",
        value: "intervencion",
        weight: { "candidato-1": 3, "candidato-2": 0, "candidato-3": 3, "candidato-4": 0 },
      },
      {
        label: "Debe reducirse para que el mercado funcione mejor",
        value: "libre-mercado",
        weight: { "candidato-1": 0, "candidato-2": 3, "candidato-3": 0, "candidato-4": 3 },
      },
      {
        label: "Un balance entre intervención y libertad económica",
        value: "balance",
        weight: { "candidato-1": 2, "candidato-2": 2, "candidato-3": 1, "candidato-4": 1 },
      },
    ],
  },
  {
    id: "seguridad-enfoque",
    question: "¿Cómo se debería combatir la delincuencia?",
    type: "single",
    options: [
      {
        label: "Mano dura: más policía y penas más severas",
        value: "mano-dura",
        weight: { "candidato-1": 1, "candidato-2": 2, "candidato-3": 0, "candidato-4": 3 },
      },
      {
        label: "Prevención: atacar las causas sociales del crimen",
        value: "prevencion",
        weight: { "candidato-1": 2, "candidato-2": 1, "candidato-3": 3, "candidato-4": 0 },
      },
      {
        label: "Combinación de ambas estrategias",
        value: "combinacion",
        weight: { "candidato-1": 3, "candidato-2": 2, "candidato-3": 2, "candidato-4": 2 },
      },
    ],
  },
  {
    id: "ambiente-desarrollo",
    question: "¿Cómo equilibrar el desarrollo económico con el ambiente?",
    type: "single",
    options: [
      {
        label: "El ambiente debe ser la prioridad, aunque afecte el crecimiento",
        value: "ambiente-primero",
        weight: { "candidato-1": 1, "candidato-2": 0, "candidato-3": 3, "candidato-4": 0 },
      },
      {
        label: "El desarrollo económico es más urgente que el ambiente",
        value: "desarrollo-primero",
        weight: { "candidato-1": 0, "candidato-2": 2, "candidato-3": 0, "candidato-4": 3 },
      },
      {
        label: "Se puede crecer económicamente de forma sostenible",
        value: "equilibrio",
        weight: { "candidato-1": 3, "candidato-2": 2, "candidato-3": 2, "candidato-4": 1 },
      },
    ],
  },
  {
    id: "educacion-enfoque",
    question: "¿Qué es más importante en educación?",
    type: "single",
    options: [
      {
        label: "Formar para el mercado laboral y la tecnología",
        value: "tecnica",
        weight: { "candidato-1": 2, "candidato-2": 3, "candidato-3": 1, "candidato-4": 1 },
      },
      {
        label: "Formación integral con valores y pensamiento crítico",
        value: "integral",
        weight: { "candidato-1": 2, "candidato-2": 1, "candidato-3": 2, "candidato-4": 3 },
      },
      {
        label: "Educación ambiental y sostenibilidad",
        value: "ambiental",
        weight: { "candidato-1": 1, "candidato-2": 0, "candidato-3": 3, "candidato-4": 0 },
      },
    ],
  },
  {
    id: "posicion",
    question: "¿Con qué posición política te identificás más?",
    type: "single",
    options: [
      {
        label: "Izquierda progresista",
        value: "izquierda",
        weight: { "candidato-1": 2, "candidato-2": 0, "candidato-3": 3, "candidato-4": 0 },
      },
      {
        label: "Centro-izquierda",
        value: "centro-izquierda",
        weight: { "candidato-1": 3, "candidato-2": 1, "candidato-3": 2, "candidato-4": 0 },
      },
      {
        label: "Centro-derecha",
        value: "centro-derecha",
        weight: { "candidato-1": 1, "candidato-2": 3, "candidato-3": 0, "candidato-4": 2 },
      },
      {
        label: "Derecha conservadora",
        value: "derecha",
        weight: { "candidato-1": 0, "candidato-2": 2, "candidato-3": 0, "candidato-4": 3 },
      },
      {
        label: "No me identifico con ninguna",
        value: "ninguna",
        weight: { "candidato-1": 1, "candidato-2": 1, "candidato-3": 1, "candidato-4": 1 },
      },
    ],
  },
]

interface CandidateResult {
  candidato: Candidato
  score: number
  percentage: number
}

function calculateResults(answers: Record<string, string>): CandidateResult[] {
  const scores: Record<string, number> = {}

  candidatos.forEach((c) => {
    scores[c.id] = 0
  })

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return

    const option = question.options.find((o) => o.value === answerValue)
    if (!option) return

    Object.entries(option.weight).forEach(([candidatoId, weight]) => {
      scores[candidatoId] = (scores[candidatoId] || 0) + weight
    })
  })

  const maxPossibleScore = questions.length * 3

  const results: CandidateResult[] = candidatos.map((c) => ({
    candidato: c,
    score: scores[c.id] || 0,
    percentage: Math.round(((scores[c.id] || 0) / maxPossibleScore) * 100),
  }))

  return results.sort((a, b) => b.score - a.score)
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const canGoNext = answers[question?.id] !== undefined
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1))
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const results = showResults ? calculateResults(answers) : []

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MobileNav />

      <div className="mx-auto max-w-2xl px-4 py-6 md:py-12">
        {!showResults ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-xl font-semibold md:text-2xl">{question.question}</h2>

                <div className="space-y-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                        answers[question.id] === option.value
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                            answers[question.id] === option.value
                              ? "border-foreground bg-foreground"
                              : "border-muted-foreground"
                          }`}
                        >
                          {answers[question.id] === option.value && <Check className="h-4 w-4 text-background" />}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex-1 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button onClick={handleNext} disabled={!canGoNext} className="flex-1">
                {isLastQuestion ? "Ver resultados" : "Siguiente"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-2xl font-bold md:text-3xl">Tus resultados</h1>
              <p className="text-muted-foreground">
                Basado en tus respuestas, estos candidatos son más afines a tus ideas
              </p>
            </div>

            <div className="space-y-4">
              {results.slice(0, 3).map((result, index) => (
                <Link key={result.candidato.id} href={`/candidatos/${result.candidato.id}`}>
                  <Card
                    className={`overflow-hidden transition-all hover:shadow-lg ${index === 0 ? "ring-2 ring-foreground" : ""}`}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative">
                          <div className="relative h-16 w-16 overflow-hidden rounded-full">
                            <Image
                              src={result.candidato.foto || "/placeholder.svg"}
                              alt={result.candidato.nombre}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {index === 0 && (
                            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                              1
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{result.candidato.nombre}</h3>
                            <span
                              className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                              style={{ backgroundColor: result.candidato.color }}
                            >
                              {result.candidato.partidoSiglas}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.candidato.posicionPolitica}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold">{result.percentage}%</span>
                          <p className="text-xs text-muted-foreground">afinidad</p>
                        </div>
                      </div>
                      {/* Party color bar */}
                      <div
                        className="h-1"
                        style={{
                          background: `linear-gradient(to right, ${result.candidato.color} ${result.percentage}%, transparent ${result.percentage}%)`,
                        }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Other candidates */}
            {results.length > 3 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Otros candidatos</h3>
                <div className="space-y-2">
                  {results.slice(3).map((result) => (
                    <Link key={result.candidato.id} href={`/candidatos/${result.candidato.id}`}>
                      <div className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={result.candidato.foto || "/placeholder.svg"}
                            alt={result.candidato.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">{result.candidato.nombre}</span>
                          <span
                            className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                            style={{ backgroundColor: result.candidato.color }}
                          >
                            {result.candidato.partidoSiglas}
                          </span>
                        </div>
                        <span className="font-semibold">{result.percentage}%</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={handleRestart} className="flex-1 bg-transparent">
                <RefreshCw className="mr-2 h-4 w-4" />
                Volver a empezar
              </Button>
              <Button asChild className="flex-1">
                <Link href="/comparar">Comparar candidatos</Link>
              </Button>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Este quiz es una guía orientativa. Te recomendamos revisar las propuestas completas de cada candidato
              antes de votar.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
