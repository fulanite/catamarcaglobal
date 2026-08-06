import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";

const heroImage = {
  src: "/novedades/modelo-onu-lanzamiento/portada-modelo-onu.webp",
  alt: "Autoridades, estudiantes y miembros de Catamarca Global durante el lanzamiento del Modelo ONU.",
};

const photos = [
  {
    src: "/novedades/modelo-onu-lanzamiento/auditorio-estudiantes.webp",
    alt: "Estudiantes y docentes participaron de la presentación en el Auditorio del Nodo Tecnológico.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/convenio-autoridades.webp",
    alt: "Autoridades de Catamarca Global, la Facultad de Derecho y la Municipalidad de la Capital tras la firma del convenio.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/firma-convenio.webp",
    alt: "El intendente Gustavo Saadi firma el convenio de cooperación institucional.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/presentacion-modelo-onu.webp",
    alt: "Exposición durante la presentación del Modelo ONU.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/rol-delegaciones.webp",
    alt: "Presentación sobre el rol de las delegaciones estudiantiles.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/dinamica-introductoria.webp",
    alt: "Actividad introductoria durante el lanzamiento del programa.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/jornada-auditorio.webp",
    alt: "Vista general del auditorio durante la jornada de lanzamiento.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/panel-institucional.webp",
    alt: "Representante institucional interviene con micrófono durante la jornada.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/autoridad-nodo.webp",
    alt: "Autoridad participante durante el acto de presentación.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/comision-directiva.webp",
    alt: "Integrantes de la Comisión Directiva durante el encuentro.",
  },
  {
    src: "/novedades/modelo-onu-lanzamiento/equipo-catamarca-global.webp",
    alt: "Equipo de Catamarca Global junto al banner institucional.",
  },
];

export const metadata: Metadata = {
  title: "Catamarca Global lanzó oficialmente su primer Modelo ONU",
  description:
    "Catamarca Global presentó su primer Modelo de Naciones Unidas para estudiantes secundarios y firmó un convenio con la UNCA y la Municipalidad de la Capital.",
  alternates: {
    canonical: "/novedades/modelo-onu-lanzamiento",
  },
};

function ArticleImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`article-photo ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  );
}

export default function ModeloOnuLaunchNewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Novedades"
        current="Modelo ONU"
        title="Catamarca Global lanzó oficialmente su primer Modelo de Naciones Unidas para estudiantes secundarios"
        text="Con la firma de un convenio entre Catamarca Global, la Facultad de Derecho de la Universidad Nacional de Catamarca y la Municipalidad de la Capital, comenzó oficialmente el primer Modelo ONU impulsado por la asociación civil."
      />

      <article className="section article-section">
        <div className="container article-shell">
          <figure className="article-hero-image">
            <img src={heroImage.src} alt={heroImage.alt} />
          </figure>

          <div className="article-meta">
            <span className="tag">Modelo ONU</span>
            <span>5 de agosto de 2026</span>
            <Link href="/novedades" className="text-link">
              Volver a novedades
            </Link>
          </div>

          <div className="article-content">
            <p className="article-lead">
              Con la firma de un convenio entre <strong>Catamarca Global</strong>, la
              Facultad de Derecho de la Universidad Nacional de Catamarca y la
              Municipalidad de la Capital, comenzó oficialmente el primer Modelo ONU
              impulsado por la asociación civil, una iniciativa destinada a acercar a los
              jóvenes al mundo de la diplomacia, el debate y la construcción de
              consensos.
            </p>
            <p>
              El pasado miércoles 5 de agosto, en el Auditorio del Nodo Tecnológico, se
              realizó la presentación oficial del Modelo de Asamblea General de Naciones
              Unidas, el primer gran proyecto de <strong>Catamarca Global</strong>, con
              la participación de autoridades, docentes, estudiantes y de toda la Comisión
              Directiva de la institución.
            </p>
            <ArticleImage {...photos[0]} />
            <p>
              Durante la jornada se concretó la firma de un convenio de cooperación entre
              {" "}<strong>Catamarca Global</strong>, la Facultad de Derecho de la Universidad
              Nacional de Catamarca y la Municipalidad de la Capital, representada por el
              intendente Gustavo Saadi. El acuerdo permitirá implementar el programa en
              las escuelas municipales N.º 3 "Gustavo Gabriel Levene" y Escuela
              Secundaria Municipal "Miguel Cané", además de incorporar a estudiantes de
              la carrera de Relaciones Internacionales como mentores del proceso
              formativo.
            </p>
            <div className="article-photo-grid">
              <ArticleImage {...photos[1]} />
              <ArticleImage {...photos[2]} />
            </div>
            <p>
              El Modelo ONU busca brindar a estudiantes de nivel secundario una
              experiencia educativa basada en la simulación de la Asamblea General de las
              Naciones Unidas, donde cada delegación representa a un país y debe
              investigar su realidad política, económica, social y diplomática para
              defender su postura mediante el diálogo, la negociación y la construcción de
              consensos. Entre las competencias que promueve se destacan la investigación,
              la oratoria, el pensamiento crítico, el trabajo en equipo y la negociación.
            </p>
            <div className="article-photo-grid">
              <ArticleImage {...photos[3]} className="article-photo--focus-speaker" />
              <ArticleImage {...photos[4]} />
            </div>
            <p>
              Uno de los momentos más esperados de la jornada fue el sorteo oficial de los
              18 países que representarán las delegaciones participantes durante la
              simulación. A partir de esa asignación, cada equipo comenzará una etapa de
              investigación y preparación para asumir el rol diplomático del Estado que le
              fue asignado.
            </p>
            <ArticleImage {...photos[5]} />
            <p>
              En esta primera edición, todas las delegaciones trabajarán sobre una misma
              problemática internacional: "Migraciones forzadas y protección internacional
              de las personas desplazadas", una temática que permitirá analizar los
              desafíos globales desde múltiples perspectivas, abordando cuestiones
              vinculadas a los derechos humanos, la cooperación internacional, los
              Objetivos de Desarrollo Sostenible y las responsabilidades de los Estados.
            </p>
            <ArticleImage {...photos[6]} />
            <p>
              El programa continuará con distintas instancias de formación durante los
              próximos meses. Según el cronograma presentado, se realizarán dos encuentros
              de capacitación en las escuelas participantes, previstos para el 8 de
              septiembre y el 15 de octubre, donde las delegaciones recibirán herramientas
              sobre el funcionamiento de Naciones Unidas, técnicas de investigación,
              representación diplomática, elaboración de discursos, reglas parlamentarias
              y estrategias de negociación. Posteriormente, los estudiantes elaborarán sus
              carpetas diplomáticas y prepararán sus discursos antes de participar en la
              simulación final, que se desarrollará los días 9 y 10 de noviembre.
            </p>
            <div className="article-photo-grid article-photo-grid--three">
              <ArticleImage {...photos[7]} className="article-photo--focus-top" />
              <ArticleImage {...photos[8]} />
              <ArticleImage {...photos[9]} />
            </div>
            <p>
              La iniciativa refleja la misión de <strong>Catamarca Global</strong> de
              promover la formación de jóvenes líderes con mirada internacional mediante
              espacios de capacitación, intercambio y vinculación estratégica, impulsando
              oportunidades que conecten a Catamarca con el mundo. El desarrollo de
              simulaciones académicas como los Modelos de Naciones Unidas forma parte de
              los objetivos fundacionales de la asociación, junto con el fortalecimiento
              del liderazgo juvenil, la cooperación y la internacionalización de la
              provincia.
            </p>
            <ArticleImage {...photos[10]} />
            <p>
              Con este lanzamiento, <strong>Catamarca Global</strong> da inicio a un
              proyecto que busca formar una nueva generación de jóvenes capaces de
              comprender los grandes desafíos internacionales, dialogar con respeto,
              construir acuerdos y convertirse en protagonistas del desarrollo de una
              Catamarca cada vez más conectada con el mundo.
            </p>
          </div>
        </div>
      </article>

      <CTASection
        title="Jóvenes que conectan, ideas que transforman"
        text="El Modelo ONU abre un camino de formación, debate y cooperación para estudiantes secundarios de Catamarca."
      />
    </>
  );
}
