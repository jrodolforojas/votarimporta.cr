import { Candidato } from "@/lib/data";
import { claudiaDoblesPropuestas } from "../propuestas/claudia-dobles";

export const claudiaDobles: Candidato = {
  id: "claudia-dobles",
  nombre: "Claudia Dobles",
  partido: "Partido Coalición Agenda Ciudadana",
  partidoSiglas: "CAC",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1762634667026_claudia-dobles-camargo-690fab8c33388.webp",
  color: "#ffbb04",
  colores: ["#ffbb04", "#039388", "#db001e"],
  ocupacion: "Arquitecta.",
  ideologia: "Centro izquierda progresista",
  posicionPolitica: "Económicamente Izquierda",
  redesSociales: {
    twitter: "https://x.com/ClaudiaDobles",
    instagram: "https://www.instagram.com/claudobles/?hl=es",
    facebook: "https://www.facebook.com/ClaudiaDoblesC",
    tiktok: "https://tiktok.com/@laurafernandez",
    youtube: "https://www.youtube.com/@claudobles/videos",
    web: "",
  },
  logros: [
    "Arquitecta con 15 años de experiencia en movilidad urbana, vivienda social, participación comunitaria y cambio climático.",
    "Directora de oficina en Zürcher Arquitectos Panamá.",  
    "Líder regional de planificación urbana en proyectos de gran escala en América Latina, Estados Unidos, Asia y Medio Oriente.",
  ],
  bio: "Maestría en Estudios Urbanos y Planificación por MIT (2025), Loeb Fellow en Estudios Ambientales Avanzados por la Universidad de Harvard (2023) y Licenciatura en Arquitectura por la Universidad de Costa Rica (2011).",
  propuestas: claudiaDoblesPropuestas,
}