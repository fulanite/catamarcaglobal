import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { GradientButton } from "@/components/GradientButton";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";

const stages = [
  {
    title: "Convocatoria y conformación de delegaciones",
    text: "Presentación del proyecto, inscripción, asignación de países y agenda temática.",
  },
  {
    title: "Formación académica e inmersión",
    text: "Conceptos de Naciones Unidas, Asamblea General, Agenda 2030, diplomacia, mociones y debate.",
  },
  {
    title: "Investigación y posición oficial",
    text: "Cada delegación prepara perfil del país, alianzas, estrategia de negociación y discurso inicial.",
  },
  {
    title: "Debate, negociación y resolución",
    text: "Las delegaciones exponen, negocian, redactan propuestas, votan y cierran la experiencia académica.",
  },
];

export const metadata: Metadata = {
  title: "Modelo ONU",
  description:
    "Programa Modelo de Asamblea General de Naciones Unidas de Catamarca Global para diplomacia juvenil, debate y liderazgo.",
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
        title="Una experiencia de diplomacia juvenil, debate y ciudadanía global"
        text="El programa propone aprendizaje experiencial, simulación institucional, investigación, oratoria, negociación y construcción de consensos."
      />
      <section className="section">
        <div className="container editorial-layout">
          <div>
            <SectionHeading
              eyebrow="Fundamentación"
              title="Aprender relaciones internacionales desde la práctica"
            />
            <p>
              El Modelo de Asamblea General de Naciones Unidas es una simulación
              académica del principal órgano deliberativo de la ONU. A través de esta
              experiencia, estudiantes asumen roles diplomáticos, debaten problemáticas
              actuales y construyen propuestas de resolución mediante diálogo,
              negociación y consenso.
            </p>
            <p>
              La propuesta busca fortalecer liderazgo, oratoria, análisis crítico,
              participación ciudadana, trabajo colaborativo y respeto por la diversidad
              de posiciones.
            </p>
            <GradientButton href="/sumate">Quiero recibir información</GradientButton>
          </div>
          <aside className="editorial-aside">
            <h2>Propósito educativo</h2>
            <ul className="check-list">
              <li>Capacitar en historia internacional, geopolítica y diplomacia.</li>
              <li>Fomentar cultura del diálogo y resolución pacífica de conflictos.</li>
              <li>Desarrollar oratoria, argumentación, investigación y negociación.</li>
              <li>Incorporar Agenda 2030 y ODS como marco transversal.</li>
            </ul>
          </aside>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Dinámica"
            title="Etapas de trabajo"
            intro="El proyecto está organizado como un recorrido gradual desde el primer acercamiento conceptual hasta la experiencia de debate."
          />
          <div className="timeline">
            {stages.map((stage, index) => (
              <article className="timeline-item" key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid grid-3">
          {["Debate formal e informal", "Carpeta diplomática", "Proyecto de resolución"].map(
            (item) => (
              <article className="card value-card" key={item}>
                <span className="icon-badge">
                  <Icon name="Landmark" />
                </span>
                <h3>{item}</h3>
                <p>
                  Contenido metodológico extraído del material del programa y adaptable
                  a cada edición confirmada.
                </p>
              </article>
            ),
          )}
        </div>
      </section>
      <CTASection
        title="Formar ciudadanía global también es construir futuro local"
        text="El Modelo ONU queda preparado para publicar convocatorias, recursos, cronograma y sedes cuando el equipo confirme la información."
      />
    </>
  );
}
