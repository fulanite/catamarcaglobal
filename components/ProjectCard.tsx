import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card project-card" id={project.slug}>
      <div className="project-card__visual" aria-hidden>
        <Icon name={project.icon} />
      </div>
      <div className="card-topline">
        <span className="tag">{project.category}</span>
        <span className="status-pill">{project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      {project.editableNote ? <p className="editable-note">{project.editableNote}</p> : null}
      <Link className="text-link" href={project.href}>
        Ver proyecto <Icon name="ArrowRight" />
      </Link>
    </article>
  );
}
