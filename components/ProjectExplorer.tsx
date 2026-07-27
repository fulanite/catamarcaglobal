"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projectThemes, projects } from "@/data/projects";

export function ProjectExplorer() {
  const [theme, setTheme] = useState<string>("Todos");
  const filteredProjects = useMemo(
    () =>
      theme === "Todos"
        ? projects
        : projects.filter((project) => project.themes.includes(theme)),
    [theme],
  );

  return (
    <div className="project-explorer">
      <div className="filter-bar" aria-label="Filtrar proyectos por temática">
        {["Todos", ...projectThemes].map((item) => (
          <button
            aria-pressed={theme === item}
            className="filter-chip"
            key={item}
            type="button"
            onClick={() => setTheme(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
