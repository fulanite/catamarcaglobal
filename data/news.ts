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
    title: "Convocatoria institucional en preparación",
    category: "Contenido editable",
    date: "Fecha editable",
    summary:
      "Espacio reservado para publicar convocatorias, oportunidades o actividades cuando el equipo confirme el contenido público.",
    href: "/novedades#convocatoria-institucional-en-preparacion",
    editable: true,
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
