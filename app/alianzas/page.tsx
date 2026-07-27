import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { EmptyState } from "@/components/EmptyState";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { editableAlliances } from "@/data/site";

export const metadata: Metadata = {
  title: "Alianzas",
  description:
    "Espacio preparado para publicar alianzas confirmadas de Catamarca Global con universidades, municipios, organismos, organizaciones, empresas y redes.",
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
        text="El sitio no publica aliados como reales hasta que Catamarca Global confirme qué logos, convenios o vínculos pueden mostrarse."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Preparado para crecer"
            title="Categorías de aliados"
            intro="Los placeholders permiten reservar el espacio visual sin inventar nombres ni logos."
          />
          <div className="grid grid-3">
            {editableAlliances.map((alliance) => (
              <article className="card value-card" key={alliance}>
                <span className="icon-badge">
                  <Icon name="Network" />
                </span>
                <h3>{alliance}</h3>
                <p>Logo, convenio o descripción pendiente de confirmación pública.</p>
              </article>
            ))}
          </div>
          <EmptyState
            title="Alianzas por publicar"
            text="Cuando existan instituciones confirmadas, se pueden cargar logos optimizados y enlaces descriptivos."
          />
        </div>
      </section>
      <CTASection />
    </>
  );
}
