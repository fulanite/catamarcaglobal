import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Líneas de acción y proyectos de Catamarca Global con filtros por formación, cooperación, innovación, Modelo ONU, ODS, cultura y derechos humanos.",
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
        title="Un sistema de iniciativas listo para sumar nuevas oportunidades"
        text="Los proyectos se presentan con estados prudentes y contenido editable cuando todavía no hay datos públicos confirmados."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Explorar"
            title="Filtrar por temática"
            intro="La estructura admite nuevos proyectos, estados y categorías sin duplicar contenido en la interfaz."
          />
          <ProjectExplorer />
        </div>
      </section>
      <CTASection />
    </>
  );
}
