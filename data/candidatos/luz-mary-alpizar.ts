import { Candidato } from "@/lib/data";
import { luzMaryAlpizarPropuestas } from "../propuestas/luz-mary-alpizar";

export const luzMaryAlpizar: Candidato = {
  id: "luz-mary-alpizar",
  nombre: "Luz María Alpizar",
  partido: "Partido Progreso Social Democrático",
  partidoSiglas: "PPSD",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1762641148047_luz-mary-alpizar-loaiza-690fc4f34903a.webp",
  color: "#44d72d",
  colores: ["#44d72d", "#01119f"],
  ocupacion: "Consultora y Gerente General de Aproimsa S.A. Especialista en calidad y metrología.",
  ideologia: "Social Demócrata Moderno",
  posicionPolitica: "Centro-Derecha",
  redesSociales: {
    twitter: "https://twitter.com/laurafernandez",
    instagram: "https://instagram.com/laurafernandez",
    facebook: "https://facebook.com/laurafernandezcr",
    tiktok: "https://tiktok.com/@laurafernandez",
    youtube: "https://youtube.com/@laurafernandez",
    web: "https://laurafernandez.cr",
  },
  logros: [
    "Consultora y Gerente General de Aproimsa S.A. Especialista en calidad y metrología.",
    "Evaluadora líder del Ente Costarricense de Acreditación y consultora internacional para FAO, Unión Europea y otros organismos.",  
    "Docente e investigadora en la Universidad de Costa Rica.",
  ],  
  bio: "Licenciada en Ingeniería Química por la Universidad de Costa Rica (1997) y Máster en Administración y Dirección de Empresas con énfasis en Mercadeo (2002).",
  propuestas: luzMaryAlpizarPropuestas,
}