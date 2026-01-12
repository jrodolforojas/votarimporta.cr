import { Candidato } from "@/lib/data";
import { fabricioAlvaradoPropuestas } from "../propuestas/fabricio-alvarado";

export const fabricioAlvarado: Candidato = {
  id: "fabricio-alvarado",
  nombre: "Fabricio Alvarado",
  partido: "Partido Nueva República",
  partidoSiglas: "PNR",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1767982310079_fabricio-6-copy.jpg",
  color: "#1867ac",
  colores: ["#1867ac", "#5dc0da", "#ffffff"],
  ocupacion: "Periodista, conductor y productor en radio y televisión.",
  ideologia: "Conservadurismo republicado liberal",
  posicionPolitica: "Económicamente Izquierda",
  redesSociales: {
    twitter: "https://x.com/FabriAlvarado7",
    instagram: "https://www.instagram.com/fabricio_alvarado/?hl=es",
    facebook: "https://www.facebook.com/FabricioAlvaradoCostaRica",
    tiktok: "https://www.tiktok.com/@fabricio.alvarado?lang=en",
    youtube: "https://www.youtube.com/@FabricioAlvaradoCR/featured",
    web: "https://nuevarepublica.cr/",
  },
  logros: [
    "Periodista, conductor y productor en radio y televisión.",
    "Diputado de la República (2014–2018).",  
    "Fundador del Partido Nueva República (2019) y candidato presidencial en 2018.",
  ],
  bio: "Bachiller en Ciencias de la Comunicación Colectiva por la Universidad de Costa Rica (2022).",
  propuestas: fabricioAlvaradoPropuestas,
}