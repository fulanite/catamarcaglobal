import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { areas } from "@/data/areas";
import { generalObjective, mission, specificObjectives, vision } from "@/data/site";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Presentación institucional, propósito, objetivos y enfoque territorial e internacional de Catamarca Global.",
  alternates: {
    canonical: "/quienes-somos",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        current="Quiénes somos"
        title="Una asociación civil joven para conectar oportunidades"
        text="Catamarca Global reúne jóvenes profesionales y estudiantes universitarios comprometidos con la internacionalización, la cooperación, la formación y la integración regional."
      />
      <section className="section">
        <div className="container editorial-layout">
          <div>
            <SectionHeading
              eyebrow="Presentación"
              title="Catamarca tiene potencial y sus jóvenes deben ser protagonistas"
            />
            <p>
              La asociación nace para construir un espacio que conecte personas,
              instituciones y oportunidades para el desarrollo de la provincia. Su
              mirada combina formación académica, redes de cooperación,
              internacionalización de oportunidades, participación ciudadana, trabajo
              colaborativo y liderazgo juvenil.
            </p>
            <p>
              El punto de partida es claro: muchas oportunidades existen pero no llegan
              a todos, las instituciones muchas veces trabajan de manera aislada y los
              jóvenes necesitan espacios para participar, capacitarse y generar impacto.
            </p>
          </div>
          <aside className="editorial-aside">
            <h2>Ejes de compromiso</h2>
            <ul className="check-list">
              <li>Internacionalización.</li>
              <li>Cooperación.</li>
              <li>Formación.</li>
              <li>Integración regional.</li>
            </ul>
          </aside>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container grid grid-2">
          <article className="card">
            <p className="tag">Misión</p>
            <h2>Crear oportunidades con mirada internacional</h2>
            <p>{mission}</p>
          </article>
          <article className="card">
            <p className="tag">Visión</p>
            <h2>Una referencia provincial en formación global</h2>
            <p>{vision}</p>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Objetivos"
            title="De la necesidad detectada a la acción"
            intro={generalObjective}
          />
          <div className="objective-grid">
            {specificObjectives.slice(0, 8).map((objective) => (
              <article className="objective-item" key={objective}>
                {objective}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Valores y áreas"
            title="Cómo se organiza el trabajo"
            intro="Los valores dan criterio institucional; las vocalías transforman ese criterio en líneas de acción concretas."
          />
          <div className="compact-list">
            {values.map((value) => (
              <span key={value.name}>{value.name}</span>
            ))}
          </div>
          <div className="grid grid-3 area-mini-grid">
            {areas.map((area) => (
              <article className="card" key={area.slug}>
                <p className="tag">{area.responsible}</p>
                <h3>{area.shortName}</h3>
                <p>{area.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
