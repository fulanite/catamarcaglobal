export type NewsItem = {
  title: string;
  category: string;
  date: string;
  summary: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

export const newsItems: NewsItem[] = [
  {
    title: "Catamarca Global lanzó oficialmente su primer Modelo de Naciones Unidas",
    category: "Modelo ONU",
    date: "5 de agosto de 2026",
    summary:
      "La asociación civil presentó su primer Modelo ONU para estudiantes secundarios y firmó un convenio con la Facultad de Derecho de la UNCA y la Municipalidad de la Capital.",
    href: "/novedades/modelo-onu-lanzamiento",
    image: "/novedades/modelo-onu-lanzamiento/portada-modelo-onu.webp",
    imageAlt:
      "Autoridades, estudiantes y miembros de Catamarca Global durante el lanzamiento del Modelo ONU.",
  },
  {
    title: "Modelo ONU: capacitaciones y simulación",
    category: "Modelo ONU",
    date: "8/9, 15/10, 9 y 10/11",
    summary:
      "El programa prevé presentación, sorteo de países, investigación, capacitaciones en escuelas, carpeta diplomática, práctica de debate y realización del Modelo ONU.",
    href: "/modelo-onu",
  },
];
