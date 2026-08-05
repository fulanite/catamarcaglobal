import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Area } from "@/data/areas";

export function AreaCard({ area }: { area: Area }) {
  return (
    <article className="card area-card" id={area.slug}>
      <div className="card-topline">
        <span className="icon-badge">
          <Icon name={area.icon} />
        </span>
        <span className="tag">{area.line}</span>
      </div>
      <h3>{area.shortName}</h3>
      <p>{area.summary}</p>
      <dl className="meta-list">
        <div>
          <dt>Responsable</dt>
          <dd>{area.responsible}</dd>
        </div>
      </dl>
      <Link className="text-link" href={`/areas#${area.slug}-detalle`}>
        Conocer el área <Icon name="ArrowRight" />
      </Link>
    </article>
  );
}
