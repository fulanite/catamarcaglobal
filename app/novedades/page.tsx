import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { EmptyState } from "@/components/EmptyState";
import { NewsCard } from "@/components/NewsCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { newsItems } from "@/data/news";

export const metadata: Metadata = {
  title: "Novedades",
  description:
    "Noticias, convocatorias, actividades y oportunidades de Catamarca Global, con contenidos editables pendientes de publicación.",
  alternates: {
    canonical: "/novedades",
  },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Novedades"
        current="Novedades"
        title="Un espacio preparado para comunicar oportunidades reales"
        text="Las noticias iniciales están marcadas como editables para evitar publicar actividades, fechas o resultados que todavía no estén confirmados."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Contenido editable"
            title="Tarjetas modelo para próximas publicaciones"
          />
          <div className="grid grid-3">
            {newsItems.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
          </div>
          <EmptyState
            title="Noticias reales en preparación"
            text="Cuando existan convocatorias, actividades o alianzas confirmadas, este bloque puede reemplazarse por publicaciones definitivas."
          />
        </div>
      </section>
      <CTASection />
    </>
  );
}
