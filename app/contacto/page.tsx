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
      "Podés escribirnos por nuestro Instagram oficial o enviarnos un correo a voluntarios.catamarcaglobal@gmail.com.",
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
    "Formulario de contacto, canales oficiales, ubicación general y preguntas frecuentes de Catamarca Global.",
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
        text="Podés contactarnos por nuestro Instagram oficial o enviarnos un correo a voluntarios.catamarcaglobal@gmail.com."
      />
      <section className="section">
        <div className="container form-layout">
          <ContactForm />
          <aside className="contact-aside">
            <SectionHeading eyebrow="Canales" title="Información de contacto" />
            <div className="contact-item">
              <Icon name="Mail" />
              <a className="contact-link" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.emailLabel}
              </a>
            </div>
            <div className="contact-item">
              <Icon name="MapPin" />
              <span>{siteConfig.contact.location}</span>
            </div>
            {siteConfig.contact.socials.map((social) => (
              <div className="contact-item" key={social.href}>
                <Icon name="Network" />
                <a className="contact-link" href={social.href} rel="noopener noreferrer" target="_blank">
                  {social.label} {social.handle}
                </a>
              </div>
            ))}
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
