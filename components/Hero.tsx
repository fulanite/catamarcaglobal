import { GradientButton } from "@/components/GradientButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Icon, type IconName } from "@/components/Icon";

const heroPillars = [
  {
    icon: "Globe2",
    title: "Pensamos global",
    text: "actuamos local",
  },
  {
    icon: "Network",
    title: "Construimos redes",
    text: "y comunidad",
  },
  {
    icon: "MessagesSquare",
    title: "Promovemos el diálogo",
    text: "la formación y el intercambio",
  },
] as const satisfies Array<{ icon: IconName; title: string; text: string }>;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__shell">
        <div className="hero__content">
          <p className="eyebrow">Catamarca Global</p>
          <h1 id="hero-title">
            Formación, redes y participación joven para conectar la provincia con el mundo
          </h1>
          <p className="hero__tagline">
            Una asociación civil que impulsa internacionalización, cooperación e
            integración regional desde Catamarca.
          </p>
          <p className="hero__lead">
            Somos una asociación civil integrada por jóvenes profesionales y estudiantes
            universitarios comprometidos con la internacionalización, la formación y la
            integración regional.
          </p>
          <div className="button-row">
            <GradientButton href="/modelo-onu">Conocé el Modelo ONU</GradientButton>
            <SecondaryButton href="/sumate">Sumate a Catamarca Global</SecondaryButton>
          </div>
        </div>
        <div className="hero__pillars" aria-label="Ejes de Catamarca Global">
          {heroPillars.map((pillar) => (
            <div className="hero__pillar" key={pillar.title}>
              <span className="hero__pillar-icon">
                <Icon name={pillar.icon} />
              </span>
              <span>
                <strong>{pillar.title}</strong>
                {pillar.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
