import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { NewsCard } from "@/components/NewsCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { newsItems } from "@/data/news";

export const metadata: Metadata = {
  title: "Novedades",
  description:
    "Novedades del Modelo ONU de Catamarca Global, con capacitaciones y simulación para estudiantes secundarios.",
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
        title="Actualidad del Modelo ONU"
        text="La novedad vigente de Catamarca Global acompaña el recorrido de capacitaciones, investigación y simulación diplomática del Modelo ONU."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Modelo ONU"
            title="Capacitaciones y simulación"
            intro="Por ahora, el Modelo ONU concentra las novedades institucionales publicadas."
          />
          <div className="grid grid-3">
            {newsItems.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
