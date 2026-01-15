import { ModelMessage } from 'ai'
import { readFileSync } from 'fs'
import path from 'path'
import { generarMensajesContextoCandidato } from './candidato-contexto-prompt'
import { Candidato } from '@/lib/data'

const promptBase = readFileSync(path.join(process.cwd(), 'ai', 'prompts', '03-chat-prompt.md'), 'utf8')

export function obtenerMensajesSistema(candidato: Candidato): ModelMessage[] {
  const mensajeBase: ModelMessage = {
    role: 'system',
    content: promptBase,
  }

  const mensajesCandidato = generarMensajesContextoCandidato(candidato, candidato.propuestas)

  return [mensajeBase, ...mensajesCandidato]
}
