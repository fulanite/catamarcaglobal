import { Icon } from "@/components/Icon";
import type { InstitutionalValue } from "@/data/values";

export function ValueCard({ value }: { value: InstitutionalValue }) {
  return (
    <article className="card value-card">
      <span className="icon-badge">
        <Icon name={value.icon} />
      </span>
      <h3>{value.name}</h3>
      <p>{value.description}</p>
    </article>
  );
}
