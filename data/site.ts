export const siteConfig = {
  name: "Catamarca Global",
  legalName: "Catamarca Global Asociación Civil",
  tagline: "Conectamos Catamarca con el mundo",
  description:
    "Asociación civil integrada por jóvenes profesionales y estudiantes universitarios comprometidos con la internacionalización, la cooperación, la formación y la integración regional desde Catamarca.",
  locale: "es-AR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://catamarca-global.pages.dev",
  contact: {
    emailLabel: "Correo institucional editable",
    email: "",
    location: "Catamarca, Argentina",
    socialLabel: "Redes sociales",
    socials: [
      {
        label: "Instagram",
        handle: "@catamarca.global",
        href: "https://www.instagram.com/catamarca.global/",
      },
    ],
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
  "Construir un espacio que conecte personas, instituciones y oportunidades para el desarrollo de Catamarca, promoviendo formación, diálogo, cooperación e intercambio con mirada internacional.";

export const vision =
  "Consolidar una comunidad de jóvenes protagonistas del desarrollo provincial, capaz de mirar el mundo desde Catamarca y proyectar respuestas locales a desafíos globales.";

export const generalObjective =
  "Impulsar la internacionalización de oportunidades mediante formación académica, redes de cooperación, participación ciudadana, trabajo colaborativo y liderazgo juvenil.";

export const specificObjectives = [
  "Acercar oportunidades que existen pero no siempre llegan a todos.",
  "Articular instituciones que muchas veces trabajan de manera aislada.",
  "Crear espacios para que jóvenes puedan participar, capacitarse y generar impacto.",
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
  "Formación académica",
  "Redes de cooperación",
  "Internacionalización de oportunidades",
  "Participación ciudadana",
  "Trabajo colaborativo",
  "Liderazgo juvenil",
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
