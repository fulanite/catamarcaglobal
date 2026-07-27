import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
      {children}
    </div>
  );
}
