export type NewsItem = {
  title: string;
  category: string;
  date: string;
  summary: string;
  href: string;
  editable: boolean;
};

export const newsItems: NewsItem[] = [
  {
    title: "Modelo ONU: capacitaciones y simulación",
    category: "Modelo ONU",
    date: "8/9, 15/10, 9 y 10/11",
    summary:
      "El programa prevé presentación, sorteo de países, investigación, capacitaciones en escuelas, carpeta diplomática, práctica de debate y realización del Modelo ONU.",
    href: "/modelo-onu",
    editable: false,
  },
  {
    title: "Agenda de formación internacional",
    category: "Contenido editable",
    date: "Fecha editable",
    summary:
      "Tarjeta modelo para difundir charlas, capacitaciones o conversatorios sin inventar fechas, sedes ni participantes.",
    href: "/novedades#agenda-de-formacion-internacional",
    editable: true,
  },
  {
    title: "Oportunidades para voluntariado",
    category: "Contenido editable",
    date: "Fecha editable",
    summary:
      "Bloque preparado para anunciar llamados a voluntariado por área, modalidad, dedicación y formulario de postulación.",
    href: "/novedades#oportunidades-para-voluntariado",
    editable: true,
  },
];
