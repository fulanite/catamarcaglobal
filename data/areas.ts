import type { IconName } from "@/components/Icon";

export type Area = {
  slug: string;
  name: string;
  shortName: string;
  icon: IconName;
  responsible: string;
  line: string;
  summary: string;
  mission: string;
  objective: string;
  functions: string[];
  actionLines: string[];
  relation: string;
};

export const areas: Area[] = [
  {
    slug: "legales-e-institucionales",
    name: "Vocalía de Legales e Institucionales",
    shortName: "Legales e Institucionales",
    icon: "Scale",
    responsible: "Luciana Parodi Cruz",
    line: "Fortalecimiento institucional, gobernanza democrática y derechos humanos",
    summary:
      "Brinda soporte jurídico e institucional para que la asociación crezca con seguridad jurídica, transparencia, enfoque de derechos humanos y reglas claras.",
    mission:
      "Brindar asesoramiento jurídico e institucional estratégico, fortalecer la gobernanza de Catamarca Global y acompañar la construcción de instrumentos normativos, procesos de formalización y estándares de derechos humanos.",
    objective:
      "Fortalecer la institucionalidad de Catamarca Global mediante asesoramiento jurídico permanente, marcos regulatorios internos, acompañamiento de la formalización y enfoque basado en derechos humanos.",
    functions: [
      "Asesorar a Presidencia, Comisión Directiva y vocalías en asuntos jurídicos e institucionales.",
      "Elaborar, revisar y actualizar estatutos, reglamentos, protocolos, convenios y acuerdos de cooperación.",
      "Acompañar el proceso de formalización institucional.",
      "Promover transparencia, participación, integridad, ética institucional y rendición de cuentas.",
      "Asesorar sobre protección de datos personales, propiedad intelectual, responsabilidad institucional y cumplimiento normativo.",
      "Impulsar formación jurídica e institucional para voluntarios, coordinadores, mentores y jóvenes participantes.",
    ],
    actionLines: [
      "Asesoramiento jurídico institucional",
      "Gobernanza y fortalecimiento institucional",
      "Convenios y relaciones institucionales",
      "Derechos humanos y transversalización",
      "Innovación jurídica y modernización institucional",
      "Cooperación jurídica internacional",
      "Formación y cultura institucional",
    ],
    relation:
      "Trabaja de manera transversal con Cooperación para marcos de convenios y estándares internacionales, y con Innovación para modernización normativa y herramientas jurídicas digitales.",
  },
  {
    slug: "cooperacion-y-proyectos-internacionales",
    name: "Vocalía de Cooperación y Proyectos Internacionales",
    shortName: "Cooperación y Proyectos Internacionales",
    icon: "Globe2",
    responsible: "Mariana Arenas",
    line: "Cooperación, territorio y desarrollo",
    summary:
      "Diseña, articula, formula y acompaña iniciativas de cooperación, formación, desarrollo territorial e internacionalización con enfoque inclusivo y sostenible.",
    mission:
      "Diseñar, articular y acompañar iniciativas de cooperación y proyectos para el desarrollo que fortalezcan la internacionalización de Catamarca desde una perspectiva territorial, comunitaria, inclusiva y sostenible.",
    objective:
      "Fortalecer la capacidad de Catamarca Global para formular, gestionar, acompañar y proyectar iniciativas de cooperación local, nacional e internacional con enfoque territorial, participativo e inclusivo acorde a la Agenda 2030.",
    functions: [
      "Identificar oportunidades de cooperación, financiamiento, formación, asistencia técnica e intercambio.",
      "Formular, planificar y acompañar proyectos vinculados a cooperación, desarrollo territorial, juventud, educación, cultura, innovación social e internacionalización.",
      "Articular con organismos públicos, universidades, municipios, organizaciones sociales, sector privado, redes de cooperación y actores comunitarios.",
      "Incorporar Agenda 2030, ODS, derechos humanos, género, sostenibilidad, diversidad e interculturalidad.",
      "Elaborar diagnósticos, matrices de proyectos, informes, indicadores y herramientas de seguimiento.",
      "Aportar contenidos técnicos a capacitaciones, Modelos ONU, conversatorios y programas de formación.",
    ],
    actionLines: [
      "Formulación y seguimiento de proyectos",
      "Cooperación, convocatorias y redes",
      "Datos, información estratégica e innovación aplicada",
      "Presupuesto, viabilidad y gestión económica",
      "Agenda 2030, ODS y enfoques transversales",
      "Territorio, patrimonio e interculturalidad",
      "Formación, liderazgo juvenil y Modelo ONU con ODS",
      "Sistematización, evaluación e impacto",
      "Comunicación técnica y relato de impacto",
    ],
    relation:
      "Conecta la agenda global con las capacidades locales de Catamarca, y ordena proyectos junto a Legales, Tesorería, Innovación y equipos futuros.",
  },
  {
    slug: "innovacion-y-modernizacion",
    name: "Vocalía de Innovación y Modernización",
    shortName: "Innovación y Modernización",
    icon: "Bot",
    responsible: "Matías Cardozo",
    line: "Innovación, formación y transformación digital",
    summary:
      "Promueve cultura de innovación, aprendizaje continuo, herramientas digitales e inteligencia artificial para fortalecer programas, procesos y oportunidades.",
    mission:
      "Promover una cultura de innovación y aprendizaje continuo incorporando metodologías innovadoras, herramientas digitales e inteligencia artificial para formar jóvenes líderes y generar soluciones con impacto local y proyección internacional.",
    objective:
      "Fortalecer la capacidad de Catamarca Global para formar jóvenes líderes mediante innovación, tecnologías emergentes e inteligencia artificial, promoviendo soluciones y transformación digital institucional.",
    functions: [
      "Diseñar programas de formación en innovación e inteligencia artificial.",
      "Coordinar el Observatorio de Innovación y Oportunidades Globales.",
      "Impulsar el Laboratorio de Innovación.",
      "Desarrollar plataformas digitales institucionales.",
      "Implementar procesos de transformación digital.",
      "Promover el uso ético y responsable de la inteligencia artificial.",
      "Brindar asistencia tecnológica al resto de las vocalías.",
      "Generar recursos educativos abiertos y alianzas con el ecosistema tecnológico.",
    ],
    actionLines: [
      "Academia de Innovación Global",
      "Observatorio de Innovación y Oportunidades Globales",
      "Laboratorio de Innovación",
      "Transformación Digital Institucional",
      "Innovación abierta",
      "Inteligencia artificial responsable",
      "Inclusión digital",
    ],
    relation:
      "Acompaña al resto de las áreas con herramientas, procesos, automatización, documentación digital y metodologías de experimentación.",
  },
];
