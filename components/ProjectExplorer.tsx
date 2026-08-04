import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function ProjectExplorer() {
  return (
    <div className="project-explorer">
      <div className="grid grid-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
