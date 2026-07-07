import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { programs } from "@/content/programs";
import { news } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/academics",
    "/admissions",
    "/campus-life",
    "/gallery",
    "/achievements",
    "/news",
    "/parents",
    "/contact",
    "/privacy-policy",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/admissions" ? 0.9 : 0.7,
  }));

  const programPages = programs.map((program) => ({
    url: `${site.url}/academics/${program.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const newsPages = news.map((item) => ({
    url: `${site.url}/news/${item.slug}`,
    lastModified: new Date(item.date + "T00:00:00"),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...programPages, ...newsPages];
}
