import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap { if (!site.siteUrl) return []; const base = site.siteUrl.replace(/\/$/, ""); return [{ url: base, changeFrequency: "monthly", priority: 1 }, ...projects.map(project => ({ url: `${base}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: .7 }))]; }
