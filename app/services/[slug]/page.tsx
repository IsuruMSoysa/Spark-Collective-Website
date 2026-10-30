import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeliverablesList } from "@/components/services/DeliverablesList";
import { ServiceTabs } from "@/components/services/ServiceTabs";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHeader } from "@/components/shared/PageHeader";
import { Band } from "@/components/ui/Band";
import { homeCta } from "@/lib/home";
import { getServiceBySlug, services } from "@/lib/services";

/** Unknown slugs 404 at the routing level rather than rendering on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.description[0],
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);

  // Also narrows Service | undefined for TypeScript, and covers next dev.
  if (!service) notFound();

  return (
    <main className="flex-1">
      <PageHeader
        eyebrow={`Services / ${service.number} — ${service.name}`}
        title={service.tagline}
        bordered={false}
      >
        <ServiceTabs activeSlug={service.slug} />
      </PageHeader>

      <Band tone="bg" pad="md" bordered="bottom">
        {service.description.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="t-lead mt-0 mb-5 max-w-[68ch] text-fg2 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </Band>

      <Band tone="bg2" pad="lg" bordered="bottom">
        <DeliverablesList
          title={service.includesLabel}
          items={service.includes}
        />
      </Band>

      <CtaBand content={homeCta} />
    </main>
  );
}
