import type { Metadata } from "next";
import { AreaCard } from "@/components/AreaCard";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { areas } from "@/data/areas";

export const metadata: Metadata = {
  title: "Áreas de trabajo",
  description:
    "Vocalías estratégicas, responsables, funciones, líneas de acción y articulación interna de Catamarca Global.",
  alternates: {
    canonical: "/areas",
  },
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Áreas de trabajo"
        current="Áreas"
        title="Una estructura estratégica, transversal y preparada para crecer"
        text="Las vocalías ordenan el trabajo institucional sin fragmentar la organización: cada área aporta una mirada y colabora con las demás."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Mapa de áreas"
            title="Tres ejes complementarios"
            intro="Cada tarjeta resume línea estratégica, responsable y función institucional."
          />
          <div className="grid grid-3">
            {areas.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container area-detail-stack">
          {areas.map((area) => (
            <article className="area-detail" id={`${area.slug}-detalle`} key={area.slug}>
              <div>
                <p className="tag">{area.line}</p>
                <h2>{area.name}</h2>
                <p>{area.summary}</p>
                <dl className="meta-list">
                  <div>
                    <dt>Responsable</dt>
                    <dd>{area.responsible}</dd>
                  </div>
                </dl>
              </div>
              <div className="accordion-stack">
                <details open>
                  <summary>Presentación y misión</summary>
                  <p>{area.mission}</p>
                </details>
                <details>
                  <summary>Objetivo general</summary>
                  <p>{area.objective}</p>
                </details>
                <details>
                  <summary>Líneas de acción</summary>
                  <ul>
                    {area.actionLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </details>
                <details>
                  <summary>Funciones principales</summary>
                  <ul>
                    {area.functions.map((fn) => (
                      <li key={fn}>{fn}</li>
                    ))}
                  </ul>
                </details>
                <details>
                  <summary>Relación con otras áreas</summary>
                  <p>{area.relation}</p>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
