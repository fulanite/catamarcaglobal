import { siteConfig } from "@/data/site";

export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Redes sociales">
      <span>{siteConfig.contact.socialLabel}</span>
      <span className="social-placeholder">Instagram</span>
      <span className="social-placeholder">LinkedIn</span>
    </div>
  );
}
