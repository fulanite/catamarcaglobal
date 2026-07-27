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
        title="Una asociación civil para proyectar Catamarca hacia el mundo"
        text="Catamarca Global conecta formación internacional, cooperación, innovación y liderazgo joven con una mirada territorial, inclusiva y profesional."
      />
      <section className="section">
        <div className="container editorial-layout">
          <div>
            <SectionHeading
              eyebrow="Presentación"
              title="Formación, cooperación y participación joven"
            />
            <p>
              Catamarca Global nace como una organización orientada a crear espacios
              de capacitación, debate, intercambio cultural y vinculación estratégica.
              Su trabajo busca acercar herramientas internacionales a jóvenes,
              instituciones y sectores productivos de la provincia.
            </p>
            <p>
              La primera reunión documentada fue el 9 de mayo de 2026, con una agenda
              inicial centrada en formación internacional, integración regional,
              cooperación, participación juvenil, innovación y organización
              institucional.
            </p>
          </div>
          <aside className="editorial-aside">
            <h2>Enfoque institucional</h2>
            <ul className="check-list">
              <li>Identidad catamarqueña con proyección global.</li>
              <li>Participación juvenil y aprendizaje continuo.</li>
              <li>Articulación entre sector público, académico, privado y sociedad civil.</li>
              <li>Cooperación, innovación y derechos humanos como ejes transversales.</li>
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
            title="Una agenda institucional amplia y escalable"
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
