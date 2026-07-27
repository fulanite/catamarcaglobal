import { Icon } from "@/components/Icon";

export function EmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="empty-state">
      <Icon name="FileText" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
