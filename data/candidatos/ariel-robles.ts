import { Candidato } from "@/lib/data";
import { arielRoblesPropuestas } from "../propuestas/ariel-robles";

export const arielRobles: Candidato = {
  id: "ariel-robles",
  nombre: "Ariel Robles",
  partido: "Partido Frente Amplio",
  partidoSiglas: "FA",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1763406940306_whatsapp-image-2025-11-17-at-110923-am.jpeg",
  color: "#f8e000",
  colores: ["#f8e000"],
  ocupacion: "Académico universitario, coordinador de carreras y proyectos de extensión.",
  ideologia: "Izquierda democrática",
  posicionPolitica: "Social Progresivo",
  redesSociales: {
    twitter: "https://x.com/RoblesBarrantes",
    instagram: "https://www.instagram.com/arielroblesbarrantes/?hl=es",
    facebook: "https://www.facebook.com/search/top?q=ariel%20robles%20barrantes",
    tiktok: "https://www.tiktok.com/@arielroblesbarrantes?lang=en",
    youtube: "https://www.youtube.com/@frenteamplio_cr",
    web: "https://www.frenteamplio.org/",
  },
  logros: [
    "Académico universitario, coordinador de carreras y proyectos de extensión.",
    "Promotor político y regidor municipal de Pérez Zeledón.",  
    "Participación en proyectos comunitarios, culturales y educativos en la región Brunca.",
  ],
  bio: "Bachiller en Enseñanza del Inglés (2014) y Maestrías en Gestión Educativa con énfasis en Liderazgo (2016) y Aprendizaje del Inglés (2022) por la Universidad Nacional.",
  propuestas: arielRoblesPropuestas,
}