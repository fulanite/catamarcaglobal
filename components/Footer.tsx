import Image from "next/image";
import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__stripe" aria-hidden />
      <div className="container site-footer__grid">
        <div>
          <Image
            src="/brand/logo-catamarca-global.webp?v=3"
            alt="Catamarca Global"
            width={260}
            height={108}
            className="footer-logo"
            unoptimized
          />
          <p>{siteConfig.description}</p>
          <SocialLinks />
        </div>
        <div>
          <h2>Navegación</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Proyectos</h2>
          <ul>
            {projects.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <Link href={project.href}>{project.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Contacto</h2>
          <p>{siteConfig.contact.emailLabel}</p>
          <p>{siteConfig.contact.location}</p>
          <Link className="footer-contact" href="/contacto">
            Escribir al equipo
          </Link>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 Catamarca Global. Todos los derechos reservados.</span>
        <span>Contenido institucional editable.</span>
      </div>
    </footer>
  );
}
