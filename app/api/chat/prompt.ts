import { ModelMessage } from 'ai'
import { readFileSync } from 'fs'
import path from 'path'
import { generateCandidateContextMessages } from './candidato-contexto-prompt'
import { Candidato } from '@/lib/data'

const basePrompt = readFileSync(path.join(process.cwd(), 'ai', 'prompts', '03-chat-prompt.md'), 'utf8')

export function getSystemMessages(candidato: Candidato): ModelMessage[] {
  const baseMessage: ModelMessage = {
    role: 'system',
    content: basePrompt,
  }

  const candidatoMessages = generateCandidateContextMessages({
    candidato,
    propuestas: candidato.propuestas,
  })

  return [baseMessage, ...candidatoMessages]
}
