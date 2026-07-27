import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { participationOptions } from "@/data/site";

export const metadata: Metadata = {
  title: "Sumate",
  description:
    "Opciones de participación, voluntariado, mentorías, alianzas y formulario para sumarse a Catamarca Global.",
  alternates: {
    canonical: "/sumate",
  },
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Sumate"
        current="Sumate"
        title="Participar, colaborar y construir redes desde Catamarca"
        text="Jóvenes, profesionales, instituciones y organizaciones pueden acercarse a actividades, voluntariado, mentorías, alianzas o proyectos."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Formas de participar"
            title="Opciones abiertas para distintos perfiles"
            intro="La gestión de voluntariado prevista combina modalidad digital, dedicación clara, acompañamiento por área y certificación institucional."
          />
          <div className="grid grid-3">
            {participationOptions.map((option) => (
              <article className="card value-card" key={option}>
                <span className="icon-badge">
                  <Icon name="Handshake" />
                </span>
                <h3>{option}</h3>
                <p>
                  Opción preparada para configurar convocatorias, requisitos y alcance
                  cuando el equipo institucional lo confirme.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container form-layout">
          <ContactForm context="sumate" />
          <aside className="editorial-aside">
            <h2>Voluntariado con foco operativo</h2>
            <p>
              El procedimiento interno prevé convocatorias digitales, inducción ágil,
              dedicación estimada, alta en canales de trabajo, primera microtarea y
              seguimiento mensual.
            </p>
          </aside>
        </div>
      </section>
      <CTASection title="Tu mirada también puede abrir una oportunidad global" />
    </>
  );
}
