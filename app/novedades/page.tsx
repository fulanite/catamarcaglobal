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
        title="Actualidad de Catamarca Global"
        text="Noticias, lanzamientos e hitos institucionales que conectan a jóvenes, escuelas y aliados estratégicos con una mirada internacional."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Novedades"
            title="Últimas publicaciones"
            intro="Seguimos de cerca los proyectos, capacitaciones y encuentros que impulsan la agenda de Catamarca Global."
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
