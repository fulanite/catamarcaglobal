import { siteConfig } from "@/data/site";

export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Redes sociales">
      <span>{siteConfig.contact.socialLabel}</span>
      {siteConfig.contact.socials.map((social) => (
        <a
          aria-label={`${social.label} de Catamarca Global`}
          className="social-link"
          href={social.href}
          key={social.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {social.label}
        </a>
      ))}
    </div>
  );
}
