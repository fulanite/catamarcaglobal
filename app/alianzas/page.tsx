import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { allianceCategories } from "@/data/site";

export const metadata: Metadata = {
  title: "Alianzas",
  description:
    "Alianzas y redes institucionales de Catamarca Global con universidades, municipios, organismos, organizaciones, empresas y redes.",
  alternates: {
    canonical: "/alianzas",
  },
};

export default function AlliancesPage() {
  return (
    <>
      <PageHero
        eyebrow="Alianzas"
        current="Alianzas"
        title="Redes institucionales para generar oportunidades"
        text="Construimos vínculos de cooperación para conectar formación, territorio, juventud e internacionalización."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Redes de cooperación"
            title="Ámbitos de articulación"
            intro="La agenda institucional se apoya en vínculos con actores públicos, privados, académicos y sociales."
          />
          <div className="grid grid-3">
            {allianceCategories.map((alliance) => (
              <article className="card value-card" key={alliance}>
                <span className="icon-badge">
                  <Icon name="Network" />
                </span>
                <h3>{alliance}</h3>
                <p>Articulación para promover oportunidades, formación y proyectos con impacto territorial.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
