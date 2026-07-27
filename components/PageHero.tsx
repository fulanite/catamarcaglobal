import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  text,
  current,
}: {
  eyebrow: string;
  title: string;
  text: string;
  current: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs current={current} />
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
