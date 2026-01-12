import { Candidato } from "@/lib/data";
import { eliecerFeinzaigPropuestas } from "../propuestas/eliecer-feinzaig";

export const eliecerFeinzaig: Candidato = {
  id: "eliecer-feinzaig",
  nombre: "Eliecer Feinzaig",
  partido: "Partido Liberal Progresista",
  partidoSiglas: "PLP",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1765989640135_whatsapp-image-2025-12-17-at-103823-am.jpeg",
  color: "#fe6b02",
  colores: ["#fe6b02", "#ffffff"],
  ocupacion: "Consultor internacional en economía y políticas públicas.",
  ideologia: "Liberalismo progresista",
  posicionPolitica: "Centro-Derecha",
  redesSociales: {
    twitter: "",
    instagram: "https://www.instagram.com/elifeinzaig/?hl=es",
    facebook: "https://www.facebook.com/search/top?q=eli%20feinzaig",
    tiktok: "https://www.tiktok.com/@elifeinzaig?lang=en",
    youtube: "https://www.youtube.com/@Eli_Feinzaig_Mintz",
    web: "https://liberal.cr/",
  },
  logros: [
    "Consultor internacional en economía y políticas públicas.",
    "Exviceministro de Obras Públicas y Transporte. Expresidente del Consejo Técnico de Aviación Civil.",
    "Exdirector de CINDE en Nueva York. Exmiembro de juntas directivas de FONAFIFO y ARESEP.",
  ],
  bio: "Bachiller en Economía por la Universidad de Costa Rica (1988), MBA por la Universidad Interamericana de Puerto Rico (1991) y Master of Science in Policy Economics por la University of Illinois at Urbana-Champaign (1993).",
  propuestas: eliecerFeinzaigPropuestas,
}