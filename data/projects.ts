import type { IconName } from "@/components/Icon";

export type Project = {
  title: string;
  slug: string;
  category: string;
  themes: string[];
  status: "Vigente" | "En preparación" | "Próximamente";
  summary: string;
  details: string;
  icon: IconName;
  href: string;
};

export const projects: Project[] = [
  {
    title: "Modelo de Asamblea General de Naciones Unidas",
    slug: "modelo-onu",
    category: "Diplomacia juvenil",
    themes: ["Formación", "Modelo ONU", "ODS", "Derechos Humanos"],
    status: "Vigente",
    summary:
      "Experiencia educativa para estudiantes secundarios orientada a investigación, oratoria, pensamiento crítico, negociación, trabajo en equipo y construcción de consensos.",
    details:
      "El programa trabaja sobre migraciones forzadas y protección internacional de personas desplazadas, con capacitaciones, carpeta diplomática, discurso inicial, debate, negociación y resolución.",
    icon: "Landmark",
    href: "/modelo-onu",
  },
];
