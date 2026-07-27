import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { NewsItem } from "@/data/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card news-card" id={item.href.split("#")[1]}>
      <div className="news-card__image" aria-hidden>
        <Icon name="CalendarDays" />
      </div>
      <div className="card-topline">
        <span className="tag">{item.category}</span>
        <span>{item.date}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      {item.editable ? <p className="editable-note">Contenido editable pendiente de publicación.</p> : null}
      <Link className="text-link" href={item.href}>
        Leer más <Icon name="ArrowRight" />
      </Link>
    </article>
  );
}
