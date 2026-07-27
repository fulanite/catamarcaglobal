export type TeamMember = {
  name: string;
  role: string;
  area: string;
  summary: string;
  href: string;
};

export const boardMembers: TeamMember[] = [
  {
    name: "María Estela Argerich",
    role: "Presidenta",
    area: "Comisión Directiva Provisoria",
    summary:
      "Representación institucional, dirección estratégica, coordinación general y generación de alianzas.",
    href: "/equipo#maria-estela-argerich",
  },
  {
    name: "Gabriel Molina",
    role: "Vicepresidente",
    area: "Comisión Directiva Provisoria",
    summary:
      "Acompañamiento estratégico a Presidencia, seguimiento de proyectos y vinculación con actores productivos y organismos estratégicos.",
    href: "/equipo#gabriel-molina",
  },
  {
    name: "Yuliana Herrera",
    role: "Secretaria General",
    area: "Comisión Directiva Provisoria",
    summary:
      "Coordinación administrativa, seguimiento de documentación oficial, reuniones, actas y comunicación interna.",
    href: "/equipo#yuliana-herrera",
  },
  {
    name: "Ana Laura Ahumada",
    role: "Tesorera",
    area: "Comisión Directiva Provisoria",
    summary:
      "Administración financiera y contable, presupuestos, balances, rendiciones y seguimiento económico de proyectos.",
    href: "/equipo#ana-laura-ahumada",
  },
];

export const vocaliaMembers: TeamMember[] = [
  {
    name: "Luciana Parodi Cruz",
    role: "Vocal de Legales e Institucionales",
    area: "Legales e Institucionales",
    summary:
      "Asesoramiento jurídico e institucional, convenios, reglamentos, formalización y enfoque de derechos humanos.",
    href: "/equipo#luciana-parodi-cruz",
  },
  {
    name: "Mariana Arenas",
    role: "Vocal de Cooperación y Proyectos Internacionales",
    area: "Cooperación y Proyectos Internacionales",
    summary:
      "Formulación de proyectos, Agenda 2030, cooperación, territorio, alianzas, sistematización e impacto.",
    href: "/equipo#mariana-arenas",
  },
  {
    name: "Matías Cardozo",
    role: "Vocal de Innovación y Modernización",
    area: "Innovación y Modernización",
    summary:
      "Innovación, transformación digital, inteligencia artificial, herramientas institucionales y soluciones tecnológicas.",
    href: "/equipo#matias-cardozo",
  },
];

export const teamMembers = [...boardMembers, ...vocaliaMembers];
