import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";

const faqs = [
  {
    question: "¿Cómo puedo contactar al equipo?",
    answer:
      "El correo institucional y las redes están marcados como editables hasta que el equipo confirme los canales oficiales.",
  },
  {
    question: "¿Puedo proponer un proyecto?",
    answer:
      "Sí. El formulario permite seleccionar propuesta de proyecto y dejar un mensaje con institución, interés y forma de colaboración.",
  },
  {
    question: "¿Se solicitan datos sensibles?",
    answer:
      "No. El formulario pide datos mínimos de contacto, institución o vínculo, tipo de participación y mensaje.",
  },
];

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Formulario de contacto, canales editables, ubicación general y preguntas frecuentes de Catamarca Global.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        current="Contacto"
        title="Hablemos de formación, cooperación y oportunidades"
        text="El sitio queda listo para conectar correo institucional, redes sociales y canal de envío cuando el equipo los confirme."
      />
      <section className="section">
        <div className="container form-layout">
          <ContactForm />
          <aside className="contact-aside">
            <SectionHeading eyebrow="Canales" title="Información editable" />
            <div className="contact-item">
              <Icon name="Mail" />
              <span>{siteConfig.contact.emailLabel}</span>
            </div>
            <div className="contact-item">
              <Icon name="MapPin" />
              <span>{siteConfig.contact.location}</span>
            </div>
            <div className="contact-item">
              <Icon name="Network" />
              <span>{siteConfig.contact.socialLabel}</span>
            </div>
          </aside>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Antes de escribir" />
          <div className="accordion-stack">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
