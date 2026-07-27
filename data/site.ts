export const siteConfig = {
  name: "Catamarca Global",
  legalName: "Catamarca Global Asociación Civil",
  tagline: "Conectamos Catamarca con el mundo",
  description:
    "Asociación civil orientada a formación internacional, cooperación, diplomacia juvenil, innovación, integración regional e intercambio cultural desde Catamarca.",
  locale: "es-AR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://catamarca-global.pages.dev",
  contact: {
    emailLabel: "Correo institucional editable",
    email: "",
    location: "Catamarca, Argentina",
    socialLabel: "Redes sociales editables",
  },
};

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Áreas", href: "/areas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Modelo ONU", href: "/modelo-onu" },
  { label: "Equipo", href: "/equipo" },
  { label: "Novedades", href: "/novedades" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const mission =
  "Promover la formación de jóvenes líderes con mirada internacional mediante espacios de capacitación, debate, intercambio cultural y vinculación estratégica, impulsando iniciativas relacionadas con relaciones internacionales, diplomacia, comercio exterior, integración regional y liderazgo juvenil.";

export const vision =
  "Consolidarse como una organización referente en la provincia en materia de formación internacional, diplomacia juvenil e integración regional, generando oportunidades de participación, cooperación e intercambio que conecten a Catamarca con el mundo.";

export const generalObjective =
  "Impulsar la internacionalización de Catamarca mediante actividades de formación, intercambio y cooperación orientadas a jóvenes, instituciones y sectores productivos.";

export const specificObjectives = [
  "Organizar programas de formación vinculados a relaciones internacionales, comercio exterior, diplomacia y liderazgo juvenil.",
  "Desarrollar simulaciones académicas y espacios de debate, como Modelos de Naciones Unidas.",
  "Promover actividades de integración, diversidad cultural y cooperación regional con organismos e instituciones nacionales e internacionales.",
  "Generar redes de vinculación entre jóvenes, profesionales, universidades, organismos públicos y sector privado.",
  "Fomentar la participación juvenil en iniciativas internacionales, académicas y de desarrollo comunitario.",
  "Impulsar proyectos de intercambio cultural, educativo y productivo entre Catamarca y otras regiones del país y del exterior.",
  "Brindar herramientas de capacitación y asistencia técnica orientadas a la internacionalización y proyección global de actores locales.",
  "Promover la difusión de la cultura, identidad y producción catamarqueña en ámbitos nacionales e internacionales.",
  "Impulsar acciones alineadas con la Agenda 2030 y los Objetivos de Desarrollo Sostenible.",
  "Promover igualdad de oportunidades, perspectiva de género, diversidad e inclusión como pilares de participación ciudadana.",
  "Participar en redes, foros y plataformas vinculadas a juventud, cooperación, educación, innovación y desarrollo sostenible.",
  "Favorecer la articulación entre sector público, privado, académico y sociedad civil para iniciativas de impacto territorial.",
  "Promover nuevas tecnologías, herramientas digitales e inteligencia artificial para educación, innovación y desarrollo de capacidades.",
  "Gestionar alianzas estratégicas, convenios y mecanismos de cooperación con instituciones nacionales e internacionales.",
];

export const impactConcepts = [
  "Jóvenes líderes",
  "Cooperación",
  "Formación",
  "Innovación",
  "Redes internacionales",
  "Impacto territorial",
];

export const participationOptions = [
  "Participar en actividades",
  "Voluntariado",
  "Mentorías",
  "Alianzas institucionales",
  "Apoyo o patrocinio",
  "Proponer un proyecto",
];

export const futureTeams = [
  "Comunicación",
  "Académico",
  "Voluntariado/RRHH",
  "Eventos",
];

export const editableAlliances = [
  "Universidades",
  "Municipios",
  "Organismos públicos",
  "Organizaciones sociales",
  "Empresas",
  "Redes nacionales e internacionales",
];
