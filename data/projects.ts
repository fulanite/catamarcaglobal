import type { IconName } from "@/components/Icon";

export type Project = {
  title: string;
  slug: string;
  category: string;
  themes: string[];
  status: "En preparación" | "Contenido editable" | "Próximamente";
  summary: string;
  details: string;
  icon: IconName;
  href: string;
  editableNote?: string;
};

export const projectThemes = [
  "Formación",
  "Cooperación",
  "Innovación",
  "Modelo ONU",
  "Internacionalización",
  "ODS",
  "Derechos Humanos",
  "Cultura",
] as const;

export const projects: Project[] = [
  {
    title: "Modelo de Asamblea General de Naciones Unidas",
    slug: "modelo-onu",
    category: "Diplomacia juvenil",
    themes: ["Formación", "Modelo ONU", "ODS"],
    status: "En preparación",
    summary:
      "Simulación académica para que estudiantes asuman roles diplomáticos, debatan problemáticas internacionales y construyan resoluciones mediante diálogo y consenso.",
    details:
      "El programa combina capacitación, investigación, oratoria, negociación y ciudadanía global, con acompañamiento académico y trabajo colaborativo.",
    icon: "Landmark",
    href: "/modelo-onu",
  },
  {
    title: "Conversatorios internacionales",
    slug: "conversatorios-internacionales",
    category: "Formación internacional",
    themes: ["Formación", "Internacionalización"],
    status: "En preparación",
    summary:
      "Espacios de diálogo para estudiantes de Relaciones Internacionales y carreras afines con profesionales de diplomacia, comercio exterior, derecho y cooperación.",
    details:
      "La línea surge de minutas internas y está pensada para abordar trayectorias profesionales, salidas laborales y desafíos globales.",
    icon: "MessagesSquare",
    href: "/proyectos#conversatorios-internacionales",
  },
  {
    title: "Internacionalización de municipios",
    slug: "internacionalizacion-de-municipios",
    category: "Cooperación territorial",
    themes: ["Cooperación", "Internacionalización", "ODS"],
    status: "Contenido editable",
    summary:
      "Línea futura para acompañar a gobiernos locales en capacidades, redes y proyectos que conecten agendas territoriales con oportunidades nacionales e internacionales.",
    details:
      "El contenido operativo está en preparación y deberá completarse cuando la asociación defina alcance, aliados y etapas.",
    icon: "Map",
    href: "/proyectos#internacionalizacion-de-municipios",
    editableNote: "Contenido editable: publicar detalles cuando el proyecto esté formalizado.",
  },
  {
    title: "Alfabetización digital potenciada con IA",
    slug: "alfabetizacion-digital-ia",
    category: "Innovación",
    themes: ["Innovación", "Formación"],
    status: "En preparación",
    summary:
      "Talleres orientados a fortalecer competencias digitales, uso responsable de inteligencia artificial y herramientas prácticas para jóvenes y organizaciones.",
    details:
      "Se articula con la Vocalía de Innovación y Modernización y con la idea de formar capacidades transferibles.",
    icon: "Bot",
    href: "/proyectos#alfabetizacion-digital-ia",
  },
  {
    title: "Integración e intercambio cultural",
    slug: "integracion-e-intercambio-cultural",
    category: "Cultura",
    themes: ["Cultura", "Internacionalización"],
    status: "Contenido editable",
    summary:
      "Espacios de intercambio con jóvenes, residentes universitarios y redes culturales para fortalecer diversidad, convivencia y vínculos internacionales desde Catamarca.",
    details:
      "La línea aparece como idea de trabajo futuro y requiere completar formato, convocatoria y aliados confirmados antes de su publicación definitiva.",
    icon: "UsersRound",
    href: "/proyectos#integracion-e-intercambio-cultural",
    editableNote: "Contenido editable: no se publican alianzas hasta que estén confirmadas.",
  },
  {
    title: "Laboratorio de Derechos Humanos e Innovación Institucional",
    slug: "laboratorio-ddhh-innovacion",
    category: "Fortalecimiento institucional",
    themes: ["Derechos Humanos", "Innovación", "Formación"],
    status: "En preparación",
    summary:
      "Espacio propuesto para producir herramientas, reflexiones y materiales que integren derechos humanos, innovación, cooperación y gobernanza democrática.",
    details:
      "Surge de la Vocalía de Legales e Institucionales como línea transversal de formación y fortalecimiento.",
    icon: "Scale",
    href: "/proyectos#laboratorio-ddhh-innovacion",
  },
];
