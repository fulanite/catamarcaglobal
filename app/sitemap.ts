import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

const routes = [
  "",
  "/quienes-somos",
  "/identidad",
  "/areas",
  "/proyectos",
  "/modelo-onu",
  "/equipo",
  "/novedades",
  "/sumate",
  "/contacto",
  "/alianzas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-07-27"),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.75,
  }));
}
