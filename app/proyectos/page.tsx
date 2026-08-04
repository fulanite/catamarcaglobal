import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyecto vigente de Catamarca Global: Modelo de Asamblea General de Naciones Unidas.",
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
        title="Nuestro proyecto vigente"
        text="Actualmente, el proyecto activo de Catamarca Global es el Modelo de Asamblea General de Naciones Unidas."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Modelo ONU"
            title="Una experiencia para mirar el mundo desde Catamarca"
            intro="El Modelo ONU concentra la agenda vigente de formación, debate, investigación, negociación y construcción de consensos."
          />
          <ProjectExplorer />
        </div>
      </section>
      <CTASection />
    </>
  );
}
