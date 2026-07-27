import Link from "next/link";
import type { ReactNode } from "react";

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`btn btn-secondary ${className}`} href={href}>
      {children}
    </Link>
  );
}
