import Image from "next/image";
import { GradientButton } from "@/components/GradientButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Icon } from "@/components/Icon";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Catamarca Global</p>
          <h1 id="hero-title">
            Conectamos <span>Catamarca</span> con el <span>mundo</span>
          </h1>
          <p>
            Pensamos global, actuamos local: construimos redes y comunidad para
            promover diálogo, formación e intercambio desde Catamarca.
          </p>
          <div className="button-row">
            <GradientButton href="/proyectos">Conocé nuestros proyectos</GradientButton>
            <SecondaryButton href="/sumate">Sumate a Catamarca Global</SecondaryButton>
          </div>
        </div>
        <div className="hero-visual" aria-label="Composición visual de conexiones globales">
          <div className="hero-visual__map" aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-visual__logo">
            <Image
              src="/brand/logo-symbol.webp?v=2"
              alt="Símbolo de Catamarca Global"
              width={260}
              height={260}
              priority
              unoptimized
            />
          </div>
          <div className="hero-visual__panel">
            <Icon name="Network" />
            <strong>Personas, instituciones y oportunidades</strong>
            <span>Un espacio para participar, capacitarse y generar impacto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
