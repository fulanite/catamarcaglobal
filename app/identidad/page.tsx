import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueCard } from "@/components/ValueCard";
import { generalObjective, mission, specificObjectives, vision } from "@/data/site";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "Misión, visión y valores",
  description:
    "Misión, visión, valores y objetivos institucionales de Catamarca Global.",
  alternates: {
    canonical: "/identidad",
  },
};

export default function IdentityPage() {
  return (
    <>
      <PageHero
        eyebrow="Identidad institucional"
        current="Misión, visión y valores"
        title="Pensar global y actuar local"
        text="La identidad de Catamarca Global se apoya en conectar personas, instituciones y oportunidades para que Catamarca participe con voz propia en agendas globales."
      />
      <section className="section">
        <div className="container grid grid-2">
          <article className="card identity-card">
            <p className="tag">Misión</p>
            <h2>Conectar oportunidades para el desarrollo provincial</h2>
            <p>{mission}</p>
          </article>
          <article className="card identity-card">
            <p className="tag">Visión</p>
            <h2>Jóvenes protagonistas de una Catamarca global</h2>
            <p>{vision}</p>
          </article>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Valores"
            title="Criterios para construir redes y comunidad"
            intro="Cada valor se traduce en decisiones de comunicación, gestión institucional y diseño de programas."
            align="center"
          />
          <div className="grid grid-3">
            {values.map((value) => (
              <ValueCard key={value.name} value={value} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-layout">
          <div>
            <SectionHeading eyebrow="Objetivo general" title={generalObjective} />
            <p>
              El sitio está preparado para ampliar esta sección con indicadores,
              memorias institucionales y resultados cuando existan datos públicos
              confirmados.
            </p>
          </div>
          <div className="numbered-list">
            {specificObjectives.map((objective, index) => (
              <article key={objective}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{objective}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
