import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de Catamarca Global con foco en Modelo ONU, formación académica, cooperación, internacionalización de oportunidades y liderazgo juvenil.",
  alternates: {
    canonical: "/proyectos",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        current="Proyectos"
        title="Iniciativas para participar, capacitarse y generar impacto"
        text="El primer proyecto institucional es el Modelo de Asamblea General de Naciones Unidas, una experiencia educativa para mirar el mundo desde Catamarca y construir soluciones colectivas."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Explorar"
            title="Filtrar por temática"
            intro="La estructura queda preparada para sumar nuevas líneas de formación, cooperación, integración regional e internacionalización de oportunidades."
          />
          <ProjectExplorer />
        </div>
      </section>
      <CTASection />
    </>
  );
}
