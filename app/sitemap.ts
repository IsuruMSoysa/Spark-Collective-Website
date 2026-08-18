import type { MetadataRoute } from "next";
import { detailedCases } from "@/lib/cases";
import { services } from "@/lib/services";
import { SITE } from "@/lib/site";

/**
 * The payoff of a typed data layer: the sitemap is a couple of maps, and it can
 * never list a case study that has no page (only `detailedCases` get routes).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  return [
    { url: url("/"), priority: 1 },
    { url: url("/work"), priority: 0.9 },
    { url: url("/services"), priority: 0.9 },
    { url: url("/about"), priority: 0.7 },
    { url: url("/contact"), priority: 0.8 },
    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      priority: 0.7,
    })),
    ...detailedCases.map((study) => ({
      url: url(`/work/${study.slug}`),
      priority: 0.7,
    })),
  ];
}
