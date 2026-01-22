export const AreaName = {
  Educacion: "Educacion",
  Tecnologia: "Tecnologia",
  DeporteYCultura: "Deporte y Cultura",
  Pensiones: "Pensiones",
  Agricultura: "Agricultura",
  Telecomunicaciones: "Telecomunicaciones",
  Turismo: "Turismo",
  Economia: "Economia",
  Seguridad: "Seguridad",
  Ambiente: "Ambiente",
  Vivienda: "Vivienda",
  Infraestructura: "Infraestructura",
  Salud: "Salud",
  Transparencia: "Transparencia",
  Instituciones: "Instituciones",
  Juventud: "Juventud",
  Democracia: "Democracia",
  Todas: "Todas",
} as const

export type AreaName = (typeof AreaName)[keyof typeof AreaName]

export interface Propuesta {
  problema: string
  solucion: string
  ejecucion: string
}

export interface AreaPropuestas {
  area: AreaName
  propuestas: Propuesta[]
}

export interface Area {
  area: AreaName
  icon: string
  descripcion: string
}

export interface Candidato {
  id: string
  nombre: string
  partido: string
  partidoSiglas: string
  foto: string
  color: string
  colores: string[]
  ocupacion: string
  ideologia: string
  posicionPolitica: string
  logros: string[]
  bio: string
  redesSociales: {
    twitter?: string
    instagram?: string
    facebook?: string
    tiktok?: string
    youtube?: string
    web?: string
  }
  propuestas: AreaPropuestas[]
  planGobiernoUrl?: string
  apoliticoUrl?: string
}

export interface QuizPregunta {
  area: AreaName
  pregunta: string
  insight: string
}

export type QuizOpcion = "si" | "no" | "neutral"

export interface QuizRespuesta {
  pregunta: QuizPregunta
  respuesta: QuizOpcion
}

export interface Quiz {
  id: string
  preguntas: QuizRespuesta[]
}
