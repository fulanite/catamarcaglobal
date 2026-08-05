import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamCard } from "@/components/TeamCard";
import { areas } from "@/data/areas";
import { boardMembers, vocaliaMembers } from "@/data/team";
import { futureTeams as futureTeamNames } from "@/data/site";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Comisión Directiva, vocalías estratégicas y estructura organizacional de Catamarca Global.",
  alternates: {
    canonical: "/equipo",
  },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Equipo"
        current="Equipo"
        title="Comisión Directiva"
        text="Conducción institucional de Catamarca Global."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Equipo"
            title="Comisión Directiva"
          />
          <div className="grid grid-4">
            {boardMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Vocalías"
            title="Responsables de áreas estratégicas"
            intro="Cada vocalía tiene una línea de trabajo propia y relación transversal con las demás áreas."
          />
          <div className="grid grid-3">
            {vocaliaMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Organigrama"
            title="Nodos conectados, lectura simple"
            intro="La organización integra conducción institucional, vocalías y equipos de trabajo."
          />
          <div className="org-chart" aria-label="Organigrama de Catamarca Global">
            <div className="org-node org-node--lead">Presidencia</div>
            <div className="org-level">
              <div className="org-node">Vicepresidencia</div>
              <div className="org-node">Secretaría General</div>
              <div className="org-node">Tesorería</div>
            </div>
            <div className="org-level org-level--areas">
              {areas.map((area) => (
                <div className="org-node" key={area.slug}>
                  <strong>{area.shortName}</strong>
                  <span>{area.responsible}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="future-team-list">
            <h3>Equipos de trabajo</h3>
            <div className="compact-list">
              {futureTeamNames.map((team) => (
                <span key={team}>{team}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
