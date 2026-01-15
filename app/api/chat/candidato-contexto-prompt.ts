import { ModelMessage } from 'ai'
import { AreaPropuestas, Candidato, Propuesta, AreaName } from '@/lib/data'
import { readdirSync, readFileSync, existsSync } from 'fs'
import path from 'path'

const idCandidatoACarpeta: Record<string, string> = {
  'laura-fernandes': 'laura-fernandez',
}

const palabraClaveAArea: Record<string, AreaName> = {
  'salud': AreaName.Salud,
  'educacion': AreaName.Educacion,
  'educación': AreaName.Educacion,
  'seguridad': AreaName.Seguridad,
  'justicia': AreaName.Seguridad,
  'economia': AreaName.Economia,
  'economía': AreaName.Economia,
  'brete': AreaName.Economia,
  'empleo': AreaName.Economia,
  'pymes': AreaName.Economia,
  'emprendimiento': AreaName.Economia,
  'turismo': AreaName.Turismo,
  'ambiente': AreaName.Ambiente,
  'energia': AreaName.Ambiente,
  'energía': AreaName.Ambiente,
  'clima': AreaName.Ambiente,
  'descarbonizar': AreaName.Ambiente,
  'reciclaje': AreaName.Ambiente,
  'circular': AreaName.Ambiente,
  'infraestructura': AreaName.Infraestructura,
  'telecomunicaciones': AreaName.Telecomunicaciones,
  '5g': AreaName.Telecomunicaciones,
  'portuaria': AreaName.Infraestructura,
  'agricultura': AreaName.Agricultura,
  'vivienda': AreaName.Vivienda,
  'cultura': AreaName.DeporteYCultura,
  'deporte': AreaName.DeporteYCultura,
  'pensiones': AreaName.Pensiones,
  'desarrollo': AreaName.Economia,
}

interface PropuestaCruda {
  problema: string
  solucion: string
  ejecucion?: string
  implementacion?: string | string[]
}

interface ArchivoConPropuestasAnidadas {
  propuestas: PropuestaCruda[]
}

function obtenerAreaDeNombreArchivo(nombreArchivo: string): string {
  const nombreMinuscula = nombreArchivo.toLowerCase()
  const palabraEncontrada = Object.keys(palabraClaveAArea).find(palabra => 
    nombreMinuscula.includes(palabra)
  )
  return palabraEncontrada 
    ? palabraClaveAArea[palabraEncontrada] 
    : nombreArchivo.replace('.json', '').replace(/_/g, ' ')
}

function normalizarEjecucion(propuestaCruda: PropuestaCruda): string {
  if (propuestaCruda.ejecucion) return propuestaCruda.ejecucion
  if (!propuestaCruda.implementacion) return 'No especificada'
  return Array.isArray(propuestaCruda.implementacion) 
    ? propuestaCruda.implementacion.join(' ') 
    : propuestaCruda.implementacion
}

function extraerPropuestasDeArchivo(contenido: string): PropuestaCruda[] {
  const parseado = JSON.parse(contenido)
  if (Array.isArray(parseado)) return parseado
  if (parseado.propuestas && Array.isArray(parseado.propuestas)) {
    return (parseado as ArchivoConPropuestasAnidadas).propuestas
  }
  return []
}

function cargarPropuestasAdicionales(candidatoId: string): Map<string, Propuesta[]> {
  const nombreCarpeta = idCandidatoACarpeta[candidatoId] || candidatoId
  const rutaCarpeta = path.join(process.cwd(), 'ai', 'adicional', nombreCarpeta)
  
  if (!existsSync(rutaCarpeta)) return new Map()

  const propuestasPorArea = new Map<string, Propuesta[]>()
  const archivosJson = readdirSync(rutaCarpeta).filter(f => f.endsWith('.json'))

  for (const archivo of archivosJson) {
    try {
      const contenido = readFileSync(path.join(rutaCarpeta, archivo), 'utf-8')
      const area = obtenerAreaDeNombreArchivo(archivo)
      const propuestasCrudas = extraerPropuestasDeArchivo(contenido)
      
      const propuestas = propuestasCrudas.map(cruda => ({
        problema: cruda.problema,
        solucion: cruda.solucion,
        ejecucion: normalizarEjecucion(cruda)
      }))

      const existentes = propuestasPorArea.get(area) || []
      propuestasPorArea.set(area, [...existentes, ...propuestas])
    } catch {
      continue
    }
  }

  return propuestasPorArea
}

function sonPropuestasSimilares(a: Propuesta, b: Propuesta): boolean {
  const normalizar = (texto: string) => texto.toLowerCase().trim().substring(0, 100)
  return normalizar(a.problema) === normalizar(b.problema) || 
         normalizar(a.solucion) === normalizar(b.solucion)
}

function combinarPropuestas(
  base: AreaPropuestas[], 
  adicionales: Map<string, Propuesta[]>
): AreaPropuestas[] {
  const combinadas = new Map<string, Propuesta[]>()

  for (const { area, propuestas } of base) {
    combinadas.set(area, [...propuestas])
  }

  for (const [area, nuevas] of Array.from(adicionales.entries())) {
    const existentes = combinadas.get(area) || []
    const unicasNuevas = nuevas.filter(nueva => 
      !existentes.some(existente => sonPropuestasSimilares(existente, nueva))
    )
    combinadas.set(area, [...existentes, ...unicasNuevas])
  }

  return Array.from(combinadas.entries()).map(([area, propuestas]) => ({ 
    area: area as AreaName, 
    propuestas 
  }))
}

function formatearPropuestasParaPrompt(propuestas: AreaPropuestas[]): string {
  return propuestas.map(({ area, propuestas: items }) => {
    const formateadas = items.map((p, i) => 
      `  ${i + 1}. **Problema**: ${p.problema}\n     **Solucion**: ${p.solucion}\n     **Ejecucion**: ${p.ejecucion}`
    ).join('\n\n')
    return `### ${area.toUpperCase()}\n${formateadas}`
  }).join('\n\n')
}

function construirPromptCandidato(candidato: Candidato, propuestasFormateadas: string): string {
  const logros = candidato.logros?.map((l, i) => `${i + 1}. ${l}`).join('\n') || 'No especificados'
  
  return `# CANDIDATO: ${candidato.nombre}

Eres un asistente que representa al candidato **${candidato.nombre}** del partido **${candidato.partido} (${candidato.partidoSiglas})**.
Responde como si el candidato estuviera hablando directamente con el votante.

## PERFIL DEL CANDIDATO
- **Nombre**: ${candidato.nombre}
- **Partido**: ${candidato.partido} (${candidato.partidoSiglas})
- **Ocupacion**: ${candidato.ocupacion || 'No especificada'}
- **Ideologia**: ${candidato.ideologia || 'No especificada'}
- **Posicion politica**: ${candidato.posicionPolitica || 'No especificada'}

### Biografia
${candidato.bio || 'No disponible'}

### Logros destacados
${logros}

---
## PLAN DE GOBIERNO - PROPUESTAS

${propuestasFormateadas}

---
## INSTRUCCIONES DE RESPUESTA

1. **Primera persona**: Siempre habla como "Yo propongo...", "Mi plan es...", "Voy a..."
2. **Solo informacion proporcionada**: Basa tus respuestas UNICAMENTE en los datos de arriba
3. **Honestidad**: Si no hay informacion sobre un tema, di: "No tengo una propuesta especifica sobre ese tema en mi plan de gobierno"
4. **Consistencia ideologica**: Manten coherencia con la ideologia ${candidato.ideologia || 'del candidato'}
5. **Estructura clara**: Explica problema -> solucion -> como lo ejecutaras
6. **Tono**: Se cercano, honesto y enfocado en problemas reales de Costa Rica`
}

export function generarMensajesContextoCandidato(
  candidato: Candidato,
  propuestas: AreaPropuestas[]
): ModelMessage[] {
  const propuestasAdicionales = cargarPropuestasAdicionales(candidato.id)
  const todasLasPropuestas = combinarPropuestas(propuestas, propuestasAdicionales)
  const propuestasFormateadas = formatearPropuestasParaPrompt(todasLasPropuestas)
  
  return [{
    role: 'system',
    content: construirPromptCandidato(candidato, propuestasFormateadas)
  }]
}
