export interface Propuesta {
  id: string
  problema: string
  solucion: string
  como: string
}

export interface AreaPropuestas {
  area: string
  icon: string
  propuestas: Propuesta[]
}

export interface Candidato {
  id: string
  nombre: string
  partido: string
  partidoSiglas: string
  foto: string
  color: string
  ocupacion: string
  ideologia: string
  posicionPolitica: string
  logros: string[]
  bio: string
  areas: AreaPropuestas[]
}

export const candidatos: Candidato[] = [
  {
    id: "candidato-1",
    nombre: "María Fernández Solís",
    partido: "Partido Progreso Nacional",
    partidoSiglas: "PPN",
    foto: "/professional-latina-woman-politician-portrait.jpg",
    color: "#2563eb",
    ocupacion: "Economista, Ex-Ministra de Hacienda",
    ideologia: "Socialdemocracia",
    posicionPolitica: "Centro-Izquierda",
    logros: [
      "Redujo el déficit fiscal en 2.3% durante su gestión",
      "Impulsó la Ley de Empleo Joven 2022",
      "Negociadora principal del TLC con Asia",
    ],
    bio: "Con más de 20 años de experiencia en el sector público, María ha demostrado un compromiso constante con el desarrollo económico sostenible.",
    areas: [
      {
        area: "Educación",
        icon: "graduation-cap",
        propuestas: [
          {
            id: "e1",
            problema: "Solo el 30% de jóvenes acceden a educación superior",
            solucion: "Becas universales para carreras STEM",
            como: "Fondo de ₡50,000 millones con impuesto a transacciones financieras",
          },
          {
            id: "e2",
            problema: "Brecha digital en zonas rurales",
            solucion: "Internet gratuito en todas las escuelas públicas",
            como: "Alianza público-privada con operadores de telecomunicaciones",
          },
        ],
      },
      {
        area: "Seguridad",
        icon: "shield",
        propuestas: [
          {
            id: "s1",
            problema: "Aumento del 40% en criminalidad organizada",
            solucion: "Policía comunitaria en 200 barrios prioritarios",
            como: "Contratación de 5,000 nuevos oficiales y capacitación especializada",
          },
        ],
      },
      {
        area: "Economía",
        icon: "trending-up",
        propuestas: [
          {
            id: "ec1",
            problema: "Desempleo juvenil del 25%",
            solucion: "Programa 'Mi Primer Empleo' con incentivos fiscales",
            como: "Reducción del 50% en cargas sociales para empresas que contraten jóvenes",
          },
        ],
      },
      {
        area: "Ambiente",
        icon: "leaf",
        propuestas: [
          {
            id: "a1",
            problema: "Contaminación de ríos principales",
            solucion: "Plan Nacional de Saneamiento de Aguas",
            como: "Inversión de $500 millones en plantas de tratamiento",
          },
        ],
      },
    ],
  },
  {
    id: "candidato-2",
    nombre: "Carlos Ramírez Mora",
    partido: "Movimiento Libertad",
    partidoSiglas: "ML",
    foto: "/professional-latino-man-politician-portrait-suit.jpg",
    color: "#dc2626",
    ocupacion: "Empresario, Ex-Alcalde de San José",
    ideologia: "Liberalismo económico",
    posicionPolitica: "Centro-Derecha",
    logros: [
      "Transformó San José en ciudad inteligente",
      "Atrajo $200 millones en inversión extranjera",
      "Fundador de 3 empresas tecnológicas exitosas",
    ],
    bio: "Empresario exitoso que busca aplicar principios de eficiencia del sector privado al gobierno.",
    areas: [
      {
        area: "Educación",
        icon: "graduation-cap",
        propuestas: [
          {
            id: "e1",
            problema: "Sistema educativo desactualizado",
            solucion: "Vouchers educativos para elegir escuelas",
            como: "Transferencia directa a familias de ₡200,000 mensuales por estudiante",
          },
          {
            id: "e2",
            problema: "Falta de habilidades técnicas",
            solucion: "Alianzas con empresas tech para bootcamps",
            como: "Certificaciones gratuitas en programación y marketing digital",
          },
        ],
      },
      {
        area: "Seguridad",
        icon: "shield",
        propuestas: [
          {
            id: "s1",
            problema: "Sistema penitenciario ineficiente",
            solucion: "Cárceles productivas con trabajo obligatorio",
            como: "Convenios con empresas para emplear reos y reducir reincidencia",
          },
        ],
      },
      {
        area: "Economía",
        icon: "trending-up",
        propuestas: [
          {
            id: "ec1",
            problema: "Exceso de burocracia para emprender",
            solucion: "Empresa en 24 horas con trámite 100% digital",
            como: "Plataforma única que integra todas las instituciones",
          },
          {
            id: "ec2",
            problema: "Impuestos altos desincentivan inversión",
            solucion: "Reducción del impuesto de renta corporativo al 15%",
            como: "Gradual en 4 años, compensado con ampliación de base tributaria",
          },
        ],
      },
      {
        area: "Ambiente",
        icon: "leaf",
        propuestas: [
          {
            id: "a1",
            problema: "Energía cara para industrias",
            solucion: "Liberalización del mercado eléctrico",
            como: "Permitir competencia de generadores privados",
          },
        ],
      },
    ],
  },
  {
    id: "candidato-3",
    nombre: "Ana Lucía Vargas Chen",
    partido: "Coalición Verde",
    partidoSiglas: "CV",
    foto: "/professional-asian-latina-woman-politician-portrai.jpg",
    color: "#16a34a",
    ocupacion: "Bióloga, Activista Ambiental",
    ideologia: "Ecologismo progresista",
    posicionPolitica: "Izquierda",
    logros: [
      "Lideró campaña que salvó 10,000 hectáreas de bosque",
      "Premio Goldman de Medio Ambiente 2023",
      "Fundadora de la ONG 'Costa Rica Verde'",
    ],
    bio: "Científica y activista comprometida con un desarrollo que respete los límites planetarios.",
    areas: [
      {
        area: "Educación",
        icon: "graduation-cap",
        propuestas: [
          {
            id: "e1",
            problema: "Educación ambiental insuficiente",
            solucion: "Currículo verde obligatorio en todas las escuelas",
            como: "Capacitación a 50,000 docentes en educación ambiental",
          },
        ],
      },
      {
        area: "Seguridad",
        icon: "shield",
        propuestas: [
          {
            id: "s1",
            problema: "Crimen ligado a desigualdad",
            solucion: "Prevención social del delito",
            como: "Inversión en centros comunitarios en zonas vulnerables",
          },
        ],
      },
      {
        area: "Economía",
        icon: "trending-up",
        propuestas: [
          {
            id: "ec1",
            problema: "Economía dependiente de importaciones",
            solucion: "Economía circular y producción local",
            como: "Incentivos fiscales para empresas con certificación ambiental",
          },
        ],
      },
      {
        area: "Ambiente",
        icon: "leaf",
        propuestas: [
          {
            id: "a1",
            problema: "Crisis climática amenaza biodiversidad",
            solucion: "Costa Rica carbono negativo para 2030",
            como: "Prohibición de combustibles fósiles y transición a electromovilidad",
          },
          {
            id: "a2",
            problema: "Agricultura contamina acuíferos",
            solucion: "100% agricultura orgánica para 2035",
            como: "Subsidios para transición y capacitación a agricultores",
          },
        ],
      },
    ],
  },
  {
    id: "candidato-4",
    nombre: "Roberto Jiménez Quesada",
    partido: "Unión Patriótica",
    partidoSiglas: "UP",
    foto: "/professional-latino-man-politician-portrait-formal.jpg",
    color: "#7c3aed",
    ocupacion: "Abogado, Ex-Diputado",
    ideologia: "Conservadurismo social",
    posicionPolitica: "Derecha",
    logros: [
      "Autor de la Ley de Protección a la Familia",
      "15 años de experiencia legislativa",
      "Presidente de la Comisión de Seguridad 2020-2024",
    ],
    bio: "Defensor de los valores tradicionales y la seguridad ciudadana como pilares del desarrollo.",
    areas: [
      {
        area: "Educación",
        icon: "graduation-cap",
        propuestas: [
          {
            id: "e1",
            problema: "Pérdida de valores en juventud",
            solucion: "Educación cívica y moral obligatoria",
            como: "Alianza con iglesias y organizaciones comunitarias",
          },
        ],
      },
      {
        area: "Seguridad",
        icon: "shield",
        propuestas: [
          {
            id: "s1",
            problema: "Impunidad del narcotráfico",
            solucion: "Mano dura contra el crimen organizado",
            como: "Duplicar presupuesto policial y penas más severas",
          },
          {
            id: "s2",
            problema: "Fronteras porosas",
            solucion: "Control migratorio estricto",
            como: "Tecnología de vigilancia y más agentes fronterizos",
          },
        ],
      },
      {
        area: "Economía",
        icon: "trending-up",
        propuestas: [
          {
            id: "ec1",
            problema: "Estado ineficiente y costoso",
            solucion: "Reducir aparato estatal en 30%",
            como: "Fusión de instituciones y eliminación de duplicidades",
          },
        ],
      },
      {
        area: "Ambiente",
        icon: "leaf",
        propuestas: [
          {
            id: "a1",
            problema: "Regulaciones frenan desarrollo",
            solucion: "Simplificar permisos ambientales",
            como: "Ventanilla única con respuesta en 30 días máximo",
          },
        ],
      },
    ],
  },
]

export const areas = [
  { id: "educacion", nombre: "Educación", icon: "graduation-cap" },
  { id: "seguridad", nombre: "Seguridad", icon: "shield" },
  { id: "economia", nombre: "Economía", icon: "trending-up" },
  { id: "ambiente", nombre: "Ambiente", icon: "leaf" },
]
