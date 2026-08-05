import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { GradientButton } from "@/components/GradientButton";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";

const supportMaterialUrl = `${siteConfig.url}/modelo-onu/#material-de-apoyo`;

const competencies = [
  "Investigación",
  "Oratoria",
  "Pensamiento crítico",
  "Negociación",
  "Trabajo en equipo",
  "Construcción de consensos",
];

const whyItems = [
  {
    title: "Mirar el mundo desde Catamarca",
    text: "El programa invita a conectar la realidad local con debates internacionales.",
    icon: "Globe2",
  },
  {
    title: "Debatir problemáticas internacionales",
    text: "Las delegaciones trabajan sobre desafíos globales desde la posición de un Estado.",
    icon: "MessagesSquare",
  },
  {
    title: "Aprender a negociar",
    text: "La experiencia pone en práctica diálogo, acuerdos y soluciones colectivas.",
    icon: "Handshake",
  },
] as const satisfies Array<{ title: string; text: string; icon: IconName }>;

const beforeModel = [
  "Historia y características generales del país.",
  "Sistema político y situación económica y social.",
  "Política exterior y alianzas internacionales.",
  "Posición oficial frente al tema debatido.",
];

const duringModel = [
  "Representar la postura del país asignado.",
  "Participar activamente del debate.",
  "Negociar con otras delegaciones.",
  "Elaborar propuestas de solución.",
  "Construir acuerdos.",
  "Votar proyectos de resolución.",
];

const debateIncludes = [
  "Presentación y análisis del conflicto.",
  "Objetivos de Desarrollo Sostenible vinculados.",
  "Cooperación internacional.",
  "Intereses y responsabilidades de los Estados.",
  "Posibles soluciones multilaterales.",
];

const prepBlocks = [
  {
    title: "Carpeta diplomática",
    icon: "FileText",
    items: [
      "Perfil general del país.",
      "Contexto político, social y económico.",
      "Política exterior y principales alianzas.",
      "Posición oficial frente al tema.",
      "Propuestas de acción.",
    ],
  },
  {
    title: "Discurso inicial",
    icon: "MessagesSquare",
    items: [
      "Presentación formal de la delegación.",
      "Exposición de la postura oficial.",
      "Argumentos principales.",
      "Propuestas concretas de solución.",
    ],
  },
  {
    title: "Estrategia de negociación",
    icon: "Handshake",
    items: [
      "Construcción de acuerdos con otras delegaciones.",
      "Lectura de intereses comunes y diferencias.",
      "Búsqueda de consensos viables y fundamentados.",
    ],
  },
] as const satisfies Array<{ title: string; icon: IconName; items: string[] }>;

const trainingTopics = [
  "Qué es la Organización de las Naciones Unidas y cómo funciona la Asamblea General.",
  "Cómo se desarrolla un Modelo ONU.",
  "Cómo investigar la posición oficial de un Estado.",
  "Cómo representar diplomáticamente a un país.",
  "Cómo redactar y presentar un discurso.",
  "Cómo utilizar las reglas parlamentarias.",
  "Cómo negociar, construir consensos y elaborar una resolución.",
  "Objetivos de Desarrollo Sostenible y cooperación internacional.",
];

const stages = [
  {
    title: "Presentación del programa y sorteo de países",
    text: "Primer acercamiento a la dinámica, asignación de delegaciones y organización inicial.",
  },
  {
    title: "Investigación del país asignado",
    text: "Cada delegación analiza su país, su política exterior, sus intereses y su postura oficial.",
  },
  {
    title: "Capacitaciones en las escuelas",
    text: "Encuentros para adquirir herramientas teóricas y prácticas.",
    meta: "Fechas previstas: 8 de septiembre y 15 de octubre.",
  },
  {
    title: "Elaboración de la carpeta diplomática",
    text: "Preparación de perfil, contexto, alianzas, posición oficial y propuestas de acción.",
  },
  {
    title: "Preparación del discurso y práctica de debate",
    text: "Entrenamiento de exposición, argumentación, escucha y uso de lenguaje diplomático.",
  },
  {
    title: "Desarrollo de estrategias de negociación",
    text: "Diseño de acuerdos posibles con otras delegaciones para llegar a resoluciones.",
  },
  {
    title: "Realización del Modelo ONU",
    text: "Simulación, debate, negociación, presentación de propuestas y votación.",
    meta: "Fechas previstas: 9 y 10 de noviembre.",
  },
];

const rules = [
  "Hablar desde el rol del país asignado.",
  "Utilizar lenguaje formal y diplomático.",
  "Solicitar la palabra antes de intervenir.",
  "Respetar turnos y tiempos establecidos.",
  "Escuchar las diferentes posiciones.",
  "Defender ideas con argumentos sólidos.",
  "Mantener una actitud respetuosa y colaborativa.",
  "Buscar acuerdos mediante diálogo, negociación y consenso.",
];

export const metadata: Metadata = {
  title: "Modelo ONU",
  description:
    "Modelo de Asamblea General de Naciones Unidas de Catamarca Global para estudiantes secundarios, con investigación, debate, negociación y construcción de consensos.",
  alternates: {
    canonical: "/modelo-onu",
  },
};

export default function ModelOnuPage() {
  return (
    <>
      <PageHero
        eyebrow="Modelo ONU"
        current="Modelo ONU"
        title="Modelo de Asamblea General de Naciones Unidas"
        text="Una experiencia educativa para aprender a debatir, negociar y construir acuerdos mediante una simulación diplomática."
      />
      <section className="section">
        <div className="container editorial-layout">
          <div>
            <SectionHeading
              eyebrow="Nuestro primer proyecto"
              title="Una experiencia para estudiantes secundarios"
            />
            <p>
              El Modelo ONU permite que estudiantes representen distintos países,
              debatan una problemática internacional y sigan reglas diplomáticas
              similares a las utilizadas en Naciones Unidas.
            </p>
            <p>
              Durante la actividad, cada delegación investiga la realidad política,
              económica, social y cultural del país asignado, conoce su política
              exterior y defiende su posición oficial mediante diálogo, negociación y
              consenso.
            </p>
            <div className="button-row">
              <GradientButton href="/sumate">Quiero recibir información</GradientButton>
            </div>
          </div>
          <aside className="editorial-aside">
            <h2>Competencias que desarrolla</h2>
            <ul className="check-list">
              {competencies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Punto de partida"
            title="Por qué estamos acá"
            intro="La propuesta empieza con una idea central: los jóvenes también pueden pensar respuestas para los grandes desafíos globales."
          />
          <div className="grid grid-3">
            {whyItems.map((item) => (
              <article className="card value-card" key={item.title}>
                <span className="icon-badge">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Tema de debate"
            title="Migraciones forzadas y protección internacional de las personas desplazadas"
            intro="Todas las delegaciones trabajan sobre una misma problemática internacional, pero deben comprenderla desde la perspectiva política, económica y diplomática del país que representan."
          />
          <div className="grid grid-3">
            {debateIncludes.map((item) => (
              <article className="card value-card" key={item}>
                <span className="icon-badge">
                  <Icon name="Globe2" />
                </span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container editorial-layout">
          <div>
            <SectionHeading
              eyebrow="Rol de las delegaciones"
              title="Investigar, representar y negociar"
            />
            <div className="grid grid-2">
              <article className="card">
                <p className="tag">Antes del Modelo</p>
                <h3>La delegación investiga</h3>
                <ul className="check-list">
                  {beforeModel.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="card">
                <p className="tag">Durante la simulación</p>
                <h3>La delegación representa</h3>
                <ul className="check-list">
                  {duringModel.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
          <aside className="editorial-aside">
            <h2>Articulación institucional</h2>
            <p>
              El material de presentación identifica el proyecto en articulación con la
              Universidad Nacional de Catamarca y Catamarca Capital.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Preparación"
            title="Materiales y productos de trabajo"
            intro="Cada delegación llega al debate con investigación completa, postura oficial, discurso preparado y propuestas de solución concretas, viables y fundamentadas."
          />
          <div className="grid grid-3">
            {prepBlocks.map((block) => (
              <article className="card value-card" key={block.title}>
                <span className="icon-badge">
                  <Icon name={block.icon} />
                </span>
                <h3>{block.title}</h3>
                <ul className="check-list">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="material-de-apoyo">
        <div className="container editorial-layout">
          <div>
            <SectionHeading
              eyebrow="Material de apoyo"
              title="Material descargable para el Modelo ONU"
              intro="El documento reúne contenidos de consulta para acompañar la preparación de las delegaciones antes de la simulación."
            />
            <p>
              Está pensado como recurso de trabajo para estudiantes y docentes durante
              la investigación, las capacitaciones, la elaboración de la carpeta
              diplomática y la práctica de debate.
            </p>
          </div>
          <aside className="editorial-aside">
            <span className="icon-badge">
              <Icon name="Download" />
            </span>
            <h2>Material Modelo ONU</h2>
            <p>Guía en PDF para consultar y usar durante el recorrido del programa.</p>
            <a className="qr-card" href={supportMaterialUrl}>
              <Image
                alt="QR para abrir la sección de material de apoyo del Modelo ONU"
                height={180}
                src="/materiales/qr-material-modelo-onu.png"
                width={180}
              />
              <span>Escaneá el QR para abrir esta sección del sitio.</span>
            </a>
            <div className="button-row">
              <a
                className="btn btn-primary"
                href="/materiales/material-modelo-onu.pdf"
                download="Material Modelo ONU.pdf"
              >
                Descargar PDF
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container editorial-layout">
          <div>
            <SectionHeading
              eyebrow="Capacitaciones"
              title="Herramientas para participar con seguridad y solvencia"
              intro="Los encuentros combinan contenidos teóricos y prácticos para fortalecer conocimientos, habilidades y participación respetuosa en el debate internacional."
            />
            <div className="numbered-list">
              {trainingTopics.map((topic, index) => (
                <article key={topic}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{topic}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="editorial-aside">
            <h2>Recursos tecnológicos</h2>
            <p>
              Podrán aplicarse recursos informáticos como inteligencia artificial,
              plataformas de diseño, herramientas colaborativas y presentaciones
              digitales para elaborar y presentar trabajos.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Cronograma"
            title="Etapas del programa"
            intro="El recorrido acompaña a las delegaciones desde la presentación inicial hasta la simulación final."
          />
          <div className="timeline">
            {stages.map((stage, index) => (
              <article className="timeline-item" key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                {stage.meta ? <p className="editable-note">{stage.meta}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Reglas básicas"
            title="Expectativas durante la simulación"
            intro="El Modelo ONU busca que el debate sea formal, respetuoso, colaborativo y orientado a consensos."
          />
          <div className="objective-grid">
            {rules.map((rule) => (
              <article className="objective-item" key={rule}>
                {rule}
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Tu voz suma al diálogo global"
        text="El espacio queda preparado para consultas, inscripción, materiales y recursos cuando el equipo confirme el canal institucional de participación."
      />
    </>
  );
}
