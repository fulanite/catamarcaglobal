"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navigation } from "@/data/site";
import { GradientButton } from "@/components/GradientButton";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <a className="skip-link" href="#main">
        Saltar al contenido principal
      </a>
      <div className="container site-header__inner">
        <Link className="brand-link" href="/" aria-label="Catamarca Global - Inicio">
          <Image
            src="/brand/logo-catamarca-global.webp?v=2"
            alt="Catamarca Global"
            width={240}
            height={100}
            priority
            unoptimized
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <GradientButton href="/sumate" className="header-actions__cta">
            Sumate
          </GradientButton>
          <button
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
            className="icon-button menu-button"
            type="button"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu aria-hidden />
          </button>
        </div>
      </div>
      <div id="mobile-menu">
        <MobileMenu
          isOpen={isMenuOpen}
          pathname={pathname}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
}
