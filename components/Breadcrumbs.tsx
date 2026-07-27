import Link from "next/link";
import { Icon } from "@/components/Icon";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="breadcrumbs" aria-label="Miga de pan">
      <Link href="/">Inicio</Link>
      <Icon name="ChevronRight" />
      <span aria-current="page">{current}</span>
    </nav>
  );
}
