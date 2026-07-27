import { GradientButton } from "@/components/GradientButton";
import { SecondaryButton } from "@/components/SecondaryButton";

export function CTASection({
  title = "El mundo también puede comenzar en Catamarca",
  text = "Sumate a nuestras actividades, proyectos y espacios de cooperación para construir oportunidades con proyección global.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="container cta-section__inner">
        <p className="eyebrow eyebrow--light">Participación</p>
        <h2 id="cta-title">{title}</h2>
        <p>{text}</p>
        <div className="button-row button-row--center">
          <GradientButton href="/sumate">Quiero sumarme</GradientButton>
          <SecondaryButton href="/contacto" className="btn-secondary--light">
            Contactar al equipo
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
