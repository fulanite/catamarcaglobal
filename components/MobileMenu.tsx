"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { navigation } from "@/data/site";
import { GradientButton } from "@/components/GradientButton";

export function MobileMenu({
  isOpen,
  pathname,
  onClose,
}: {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="mobile-menu" role="presentation" onMouseDown={onClose}>
      <div
        aria-label="Menú principal"
        aria-modal="true"
        className="mobile-menu__panel"
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mobile-menu__top">
          <span>Catamarca Global</span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar menú">
            <X aria-hidden />
          </button>
        </div>
        <nav>
          {navigation.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <GradientButton href="/sumate" className="mobile-menu__cta">
          Sumate
        </GradientButton>
      </div>
    </div>
  );
}
