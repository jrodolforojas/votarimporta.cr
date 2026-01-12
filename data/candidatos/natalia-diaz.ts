import { Candidato } from "@/lib/data";
import { nataliaDiazPropuestas } from "../propuestas/natalia-diaz";

export const nataliaDiaz: Candidato = {
  id: "natalia-diaz",
  nombre: "Natalia Díaz",
  partido: "Partido Unidos Podemos",
  partidoSiglas: "UP",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1762641316913_natalia-diaz-quintana-690fc58a66f53.webp",
  color: "#6e4098",
  colores: ["#6e4098", "#f4911e"],
  ocupacion: "Economista, Ex-Ministra de Hacienda",
  ideologia: "Liberalismo pragmático",
  posicionPolitica: "Centro-Derecha",
  redesSociales: {
    twitter: "https://x.com/Natdiaquin",
    instagram: "https://www.instagram.com/natdiaquin/?hl=es",
    facebook: "https://www.facebook.com/NataliaDiazCR",
    tiktok: "https://www.tiktok.com/@nataliadiaz.cr?lang=en",
    youtube: "https://www.youtube.com/@NataliaDiazcr/featured",
    web: "https://nataliadiaz.cr/",
  },
  logros: [
    "Diputada por San José (2014–2018).",
    "Ministra de la Presidencia (2022–2024).",  
    "Directora de Relaciones Públicas y Comunicación para América Latina en Dole Food Company y Directora de la Cámara de Exportadores de Costa Rica (CADEXCO).",
  ],
  bio: "Licenciada en Publicidad por la Universidad Latina y Máster en Administración de Empresas con énfasis en Finanzas, Economía y Desarrollo Sostenible por INCAE.",
  propuestas: nataliaDiazPropuestas,
}