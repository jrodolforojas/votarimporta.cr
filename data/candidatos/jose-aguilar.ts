import { Candidato } from "@/lib/data";
import { joseAguilarPropuestas } from "../propuestas/jose-aguilar";

export const joseAguilar: Candidato = {
  id: "jose-aguilar",  
  nombre: "José Aguilar",
  partido: "Partido Avanza",
  partidoSiglas: "AV",
  foto: "https://cdn.apolitico.cr/storage/v1/object/public/candidate-photos/1762634507284_jose-aguilar-berrocal-690faaeabfa48.webp",
  color: "#0415b5",
  colores: ["#0415b5", "#fe0002", "#ffffff"],
  ocupacion: "Psicólogo, impulsor de proyectos sociales y comunitarios.",
  ideologia: "Liberalismo clásico con alta sensibilidad social",
  posicionPolitica: "Centro-Derecha",
  redesSociales: {
    twitter: "https://x.com/JoseAguilarBerr",
    instagram: "https://www.instagram.com/joseaguilarb_cr/?hl=es",
    facebook: "https://www.facebook.com/jose.a.berrocal",
    tiktok: "https://www.tiktok.com/@joseaguilarb_cr?lang=en",
    youtube: "https://www.youtube.com/@joseaguilarb_cr",
    web: "https://www.avanzacr.net/",
  },
  logros: [
    "Fundador de la Fundación Acción Joven, con intervenciones en más de 200 escuelas y apoyo a más de 93.000 estudiantes.",
    "Impulsor del proyecto Conectemos la Esperanza para alianzas público-privadas en zonas costeras.",  
    "Impulsor del programa Reactivemos la Esperanza, que sirvió más de 130.000 platos y reactivó pequeños negocios.",
  ],
  bio: "Psicólogo con Maestría en Development Management por la London School of Economics and Political Science, Maestría en Formulación y Gestión de Proyectos por el Instituto Centroamericano de Administración Pública y formación técnica en combate a la pobreza por la Universidad de Oxford.",
  propuestas: joseAguilarPropuestas,
}