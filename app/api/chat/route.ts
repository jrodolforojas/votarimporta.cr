import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { candidatos } from '@/data/candidatos';
import { obtenerMensajesSistema } from './prompt';

export async function POST(req: Request) {
  const { messages, candidatoId }: { messages: UIMessage[]; candidatoId: string } = await req.json();
  
  const candidato = candidatos.find((c) => c.id === candidatoId);

  if (!candidato) {
    return new Response('Candidato no encontrado', { status: 404 });
  }

  const mensajesSistema = obtenerMensajesSistema(candidato)
  const mensajesUsuario = await convertToModelMessages(messages)

  const resultado = streamText({
    model: "openai/gpt-5.2-chat",
    messages: [...mensajesSistema, ...mensajesUsuario],
  });

  return resultado.toUIMessageStreamResponse();
}
