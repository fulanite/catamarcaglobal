import type { IconName } from "@/components/Icon";

export type InstitutionalValue = {
  name: string;
  description: string;
  icon: IconName;
};

export const values: InstitutionalValue[] = [
  {
    name: "Integración",
    description:
      "Promovemos el diálogo, la cooperación y la construcción de vínculos entre comunidades, regiones y países.",
    icon: "Network",
  },
  {
    name: "Compromiso",
    description:
      "Trabajamos con responsabilidad, dedicación y vocación de servicio en cada iniciativa desarrollada.",
    icon: "Handshake",
  },
  {
    name: "Innovación",
    description:
      "Impulsamos ideas creativas y dinámicas para generar nuevas oportunidades para jóvenes y organizaciones.",
    icon: "Sparkles",
  },
  {
    name: "Formación",
    description:
      "Creemos en la educación, el pensamiento crítico y el aprendizaje continuo como herramientas de transformación social.",
    icon: "GraduationCap",
  },
  {
    name: "Inclusión",
    description:
      "Fomentamos espacios abiertos, participativos y diversos, donde todas las voces puedan ser escuchadas y valoradas.",
    icon: "UsersRound",
  },
  {
    name: "Transparencia",
    description:
      "Actuamos con honestidad, ética y claridad en la toma de decisiones y en la gestión institucional.",
    icon: "ShieldCheck",
  },
];
