import { Candidato } from "@/lib/data";
import { lauraFernandezPropuestas } from "../propuestas/laura-fernandez";
  
export const lauraFernandes: Candidato = {
  id: "laura-fernandes",
  nombre: "Laura Fernández",
  partido: "Partido Pueblo Soberano",
  partidoSiglas: "PPSO",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1762641232212_laura-fernandez-delgado-690fc52fd86b3.webp",
  color: "#01a4b6",
  colores: ["#01a4b6", "#ffffff"],
  ocupacion: "Economista, Ex-Ministra de Hacienda",
  ideologia: "Liberal en lo económico y conservador en lo social",
  posicionPolitica: "Centro",
  redesSociales: {
    twitter: "https://twitter.com/laurafernandez",
    instagram: "https://instagram.com/laurafernandez",
    facebook: "https://facebook.com/laurafernandezcr",
    tiktok: "https://tiktok.com/@laurafernandez",
    youtube: "https://youtube.com/@laurafernandez",
    web: "https://laurafernandez.cr",
  },
  logros: [
    "Asesora del Vicepresidente Kevin Casas y del Ministro de Planificación Roberto Gallardo. Asesora legislativa.",
    "Ministra de Planificación Nacional y Política Económica (2022–2023).",  
    "Ministra de la Presidencia (2023–2025).",
  ],
  bio: "Licenciatura en Ciencias Políticas y Maestría en Políticas Públicas y Gobernabilidad.",
  propuestas: lauraFernandezPropuestas,
}