import Link from "next/link";
import type { Case, CaseDetail as CaseDetailData } from "@/lib/cases";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { PullQuote } from "@/components/ui/PullQuote";
import { StatRow } from "@/components/ui/StatBlock";

/** Artboard 1e's 16:5 hero with the bottom-fade and overlaid eyebrow + H1. */
export function CaseHero({
  study,
  detail,
}: {
  study: Case;
  detail: CaseDetailData;
}) {
  return (
    <section className="relative">
      <MediaPlaceholder
        ratio="16:5"
        label={detail.hero.label}
        src={detail.hero.src}
        alt={detail.hero.alt}
        sizes="100vw"
        preload
        hatch="lg"
        fade
        // Top-right, per the artboard — bottom-left would put it behind the H1.
        labelPosition="topRight"
        className="min-h-[320px] md:min-h-[420px]"
      >
        <Container className="absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-10">
          <Eyebrow tone="orange" size="wide" className="mb-4">
            {detail.eyebrow}
          </Eyebrow>
          <h1 className="t-h1 m-0 max-w-[820px] text-fg">{study.headline}</h1>
        </Container>
      </MediaPlaceholder>
    </section>
  );
}

/** The four-column metrics bar. */
export function CaseMetrics({ detail }: { detail: CaseDetailData }) {
  return (
    <div className="border-y border-line">
      {/* leadAccent: the artboard makes only the first figure orange, rather
          than accenting every unit as the homepage hero does. */}
      <StatRow stats={detail.metrics} columns={4} size="lg" divided leadAccent />
    </div>
  );
}

/** Mono meta list beside the body copy. */
export function CaseMetaList({ detail }: { detail: CaseDetailData }) {
  return (
    <dl className="m-0 flex flex-col gap-3.5">
      {detail.meta.map((row) => (
        <div key={row.label}>
          <dt className="t-meta text-fg3">{row.label}</dt>
          <dd className="t-body-sm m-0 mt-1 text-fg">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseBody({ detail }: { detail: CaseDetailData }) {
  return (
    <div className="max-w-[720px]">
      <p className="t-lead m-0 mb-6 text-fg">{detail.lead}</p>
      {detail.body.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="t-body-lg mb-4 text-fg2">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function CaseAssetGrid({ detail }: { detail: CaseDetailData }) {
  return (
    <div className="grid gap-px border-y border-line bg-line grid-cols-2 lg:grid-cols-4">
      {detail.assets.map((asset) => (
        <MediaPlaceholder
          key={asset.id}
          ratio="4:5"
          label={asset.label}
          src={asset.src}
          alt={asset.alt}
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      ))}
    </div>
  );
}

export function CaseQuoteBand({ detail }: { detail: CaseDetailData }) {
  return (
    <div className="bg-bg2 py-14 md:py-16">
      <Container>
        <PullQuote
          quote={detail.quote.quote}
          attribution={detail.quote.attribution}
        />
      </Container>
    </div>
  );
}

/** Prev/next footer. Wraps around, and renders nothing when there is one case. */
export function CaseNeighborNav({
  prev,
  next,
}: {
  prev?: Case;
  next?: Case;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More case studies"
      className="border-t border-line"
    >
      <Container className="flex items-center justify-between gap-6 py-8">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="t-h4 max-w-[45%] text-fg2 transition-colors hover:text-orange"
          >
            ← {prev.headline}
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="t-h4 max-w-[45%] text-right text-fg transition-colors hover:text-orange"
          >
            {next.headline} →
          </Link>
        ) : (
          <span />
        )}
      </Container>
    </nav>
  );
}
