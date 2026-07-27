import Link from "next/link";
import type { ReactNode } from "react";

export function GradientButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`btn btn-primary ${className}`} href={href}>
      {children}
    </Link>
  );
}
