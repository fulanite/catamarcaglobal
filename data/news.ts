export type NewsItem = {
  title: string;
  category: string;
  date: string;
  summary: string;
  href: string;
};

export const newsItems: NewsItem[] = [
  {
    title: "Modelo ONU: capacitaciones y simulación",
    category: "Modelo ONU",
    date: "8/9, 15/10, 9 y 10/11",
    summary:
      "El programa prevé presentación, sorteo de países, investigación, capacitaciones en escuelas, carpeta diplomática, práctica de debate y realización del Modelo ONU.",
    href: "/modelo-onu",
  },
];
