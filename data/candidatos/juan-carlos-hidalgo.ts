import { Candidato } from "@/lib/data";
import { juanCarlosHidalgoPropuestas } from "../propuestas/juan-carlos-hidalgo";

export const juanCarlosHidalgo: Candidato = {
  id: "juan-carlos-hidalgo", 
  nombre: "Juan Carlos Hidalgo",
  partido: "Partido Unidad Social Cristiana",
  partidoSiglas: "PUSC",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1767909689442_jch-2.jpg",
  color: "#dd1f25",
  colores: ["#dd1f25", "#1e417f"],
  ocupacion: "Economista, Ex-Ministra de Hacienda",
  ideologia: "Social cristianismo, liberalismo reformista, humanismo",
  posicionPolitica: "Centro-Izquierda",
  redesSociales: {
    twitter: "https://x.com/jchidalgo",
    instagram: "https://www.instagram.com/juan_carlos_hidalgo_cr/?hl=es",
    facebook: "https://www.facebook.com/juan.carlos.hidalgo.bogantes",
    tiktok: "https://www.tiktok.com/@juan.carlos.hidalgo.cr?lang=en",
    youtube: "https://www.youtube.com/@JuanCarlosHidalgo",
    web: "https://partidounidad.com/",
  },
  logros: [
    "Analista del Cato Institute enfocado en América Latina (2007–2019).",
    "Presidente del Partido Unidad Social Cristiana (2022–2025) y candidato presidencial para 2026.",
  ],
  bio: "Licenciado en Relaciones Internacionales por la Universidad Nacional de Costa Rica y Máster en Comercio y Política Pública Internacional por George Mason University.",
  propuestas: juanCarlosHidalgoPropuestas,
}