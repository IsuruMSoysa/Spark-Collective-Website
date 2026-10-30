import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { SITE } from "@/lib/site";

/**
 * The payoff of a typed data layer: the sitemap is one map over `services`, so
 * it can never list a discipline that has no page.
 *
 * There are no /work/[slug] entries because there are no case studies yet — see
 * lib/work.ts. Add the map back alongside real case data.
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
  ];
}
