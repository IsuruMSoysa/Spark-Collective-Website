import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { DeckBand } from "@/components/services/DeckBand";
import { DeliverablesList } from "@/components/services/DeliverablesList";
import { PackagesPanel } from "@/components/services/PackagesPanel";
import { ProcessGrid } from "@/components/services/ProcessGrid";
import { ServiceTabs } from "@/components/services/ServiceTabs";
import { Band } from "@/components/ui/Band";
import { Container } from "@/components/ui/Container";
import { getServiceBySlug, getServicePackages, services } from "@/lib/services";

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
    description: service.description,
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
        title={service.headline}
        blurb={service.blurb}
        bordered={false}
      >
        <ServiceTabs activeSlug={service.slug} />
      </PageHeader>

      {/* Two-column split: deliverables left, packages right on bg2. The 1px gap
          over a line background gives the artboard's centre hairline. */}
      <div className="grid gap-px border-b border-line bg-line lg:grid-cols-2">
        <div className="bg-bg">
          <Container className="py-12 md:py-[54px]">
            <DeliverablesList items={service.deliverables} />
          </Container>
        </div>

        <div className="bg-bg2">
          <Container className="py-12 md:py-[54px]">
            <PackagesPanel tiers={getServicePackages(service)} />
          </Container>
        </div>
      </div>

      <Band tone="bg" pad="md" bordered="bottom">
        <ProcessGrid />
      </Band>

      <DeckBand />
    </main>
  );
}
