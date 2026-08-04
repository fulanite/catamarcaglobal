import type { Metadata } from "next";
import Link from "next/link";
import { AreaCard } from "@/components/AreaCard";
import { CTASection } from "@/components/CTASection";
import { GradientButton } from "@/components/GradientButton";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { NewsCard } from "@/components/NewsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SecondaryButton } from "@/components/SecondaryButton";
import { TeamCard } from "@/components/TeamCard";
import { ValueCard } from "@/components/ValueCard";
import { areas } from "@/data/areas";
import { newsItems } from "@/data/news";
import { projects } from "@/data/projects";
import { impactConcepts, mission, vision } from "@/data/site";
import { teamMembers } from "@/data/team";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Catamarca Global impulsa formación internacional, cooperación, diplomacia juvenil, innovación e integración desde Catamarca.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container split-layout">
          <div>
            <SectionHeading
              eyebrow="Quiénes somos"
              title="Jóvenes que conectan Catamarca con oportunidades"
              intro="Catamarca Global es una asociación civil integrada por jóvenes profesionales y estudiantes universitarios comprometidos con la internacionalización, la cooperación, la formación y la integración regional."
            />
            <p>
              Nace para responder a una necesidad concreta: muchas oportunidades
              existen pero no llegan a todos, las instituciones suelen trabajar de
              manera aislada y los jóvenes necesitan espacios para participar,
              capacitarse y generar impacto.
            </p>
            <div className="button-row">
              <GradientButton href="/quienes-somos">Conocer la asociación</GradientButton>
              <SecondaryButton href="/identidad">Ver misión y valores</SecondaryButton>
            </div>
          </div>
          <div className="mission-vision">
            <article className="card">
              <p className="tag">Misión</p>
              <h3>Formación, debate y vinculación estratégica</h3>
              <p>{mission}</p>
            </article>
            <article className="card card--accent">
              <p className="tag">Visión</p>
              <h3>Referencia provincial con proyección internacional</h3>
              <p>{vision}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Valores"
            title="Principios para cooperar mejor"
            intro="Seis valores orientan la forma de diseñar programas, convocar equipos y construir vínculos institucionales."
            align="center"
          />
          <div className="grid grid-3">
            {values.map((value) => (
              <ValueCard key={value.name} value={value} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Áreas estratégicas"
            title="Tres vocalías que ordenan el trabajo institucional"
            intro="Las áreas funcionan como partes complementarias de una misma organización: fortalecimiento institucional, cooperación territorial e innovación aplicada."
          />
          <div className="grid grid-3">
            {areas.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
            <SectionHeading
              eyebrow="Proyectos"
              title="Nuestro primer proyecto ya tiene una hoja de ruta"
              intro="El Modelo de Asamblea General de Naciones Unidas abre una agenda de formación para mirar el mundo desde Catamarca, debatir problemáticas internacionales y construir soluciones colectivas."
            />
          <div className="grid grid-3">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section model-band">
        <div className="container model-band__grid">
          <div>
            <p className="eyebrow eyebrow--light">Modelo ONU</p>
            <h2>Diplomacia juvenil para aprender haciendo</h2>
            <p>
              El programa permitirá a estudiantes secundarios desarrollar investigación,
              oratoria, pensamiento crítico, negociación, trabajo en equipo y
              construcción de consensos en articulación con instituciones locales.
            </p>
          </div>
          <div className="model-band__actions">
            <GradientButton href="/modelo-onu">Conocer el Modelo ONU</GradientButton>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Equipo"
            title="Comisión Directiva y vocalías"
            intro="La organización articula perfiles jóvenes, profesionales y universitarios para sostener formación, cooperación, innovación e integración regional."
          />
          <div className="grid grid-3">
            {teamMembers.slice(0, 6).map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
          <div className="section-action">
            <SecondaryButton href="/equipo">Ver estructura completa</SecondaryButton>
          </div>
        </div>
      </section>

      <section className="impact-section" aria-labelledby="impact-title">
        <div className="container">
          <p className="eyebrow eyebrow--light">Proyección</p>
          <h2 id="impact-title">Qué buscamos construir</h2>
          <div className="impact-grid">
            {impactConcepts.map((concept) => (
              <div key={concept}>
                <Icon name="Sparkles" />
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Novedades"
            title="Actualidad del Modelo ONU"
            intro="La novedad vigente acompaña el recorrido de capacitaciones, investigación y simulación diplomática del Modelo ONU."
          />
          <div className="grid grid-3">
            {newsItems.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alliances-preview">
        <div className="container split-layout split-layout--center">
          <SectionHeading
            eyebrow="Alianzas"
            title="Construimos redes que generan oportunidades"
            intro="Este espacio queda preparado para universidades, municipios, organismos, organizaciones, empresas y redes cuando el equipo confirme su publicación."
          />
          <Link className="text-link text-link--large" href="/alianzas">
            Ver espacio de alianzas <Icon name="ArrowRight" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
