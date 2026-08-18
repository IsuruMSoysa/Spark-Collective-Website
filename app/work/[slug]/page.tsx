import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CaseAssetGrid,
  CaseBody,
  CaseHero,
  CaseMetaList,
  CaseMetrics,
  CaseNeighborNav,
  CaseQuoteBand,
} from "@/components/work/CaseDetail";
import { Container } from "@/components/ui/Container";
import {
  detailedCases,
  getCaseBySlug,
  getCaseNeighbors,
  hasDetail,
} from "@/lib/cases";

export const dynamicParams = false;

/**
 * Only cases with a written-up `detail` get a page — see lib/cases.ts for why
 * the other two are not authored rather than invented.
 */
export function generateStaticParams() {
  return detailedCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseBySlug(slug);
  if (!study) return {};

  return {
    title: study.headline,
    description: study.detail?.lead,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseBySlug(slug);

  if (!study || !hasDetail(study)) notFound();

  const { detail } = study;
  const { prev, next } = getCaseNeighbors(study.slug);

  return (
    <main className="flex-1">
      <CaseHero study={study} detail={detail} />
      <CaseMetrics detail={detail} />

      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[250px_1fr] lg:gap-11">
        <CaseMetaList detail={detail} />
        <CaseBody detail={detail} />
      </Container>

      <CaseAssetGrid detail={detail} />
      <CaseQuoteBand detail={detail} />
      <CaseNeighborNav prev={prev} next={next} />
    </main>
  );
}
