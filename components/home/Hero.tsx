import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillAnchor, PillLink } from "@/components/ui/Pill";
import { StatBlock } from "@/components/ui/StatBlock";
import { EmberField, GlowField, GridLines } from "@/components/ui/decor";
import { NEW_BUSINESS_EMAIL } from "@/lib/contact";
import { heroBlurb, heroEyebrow, heroStatus, homeStats } from "@/lib/home";

/**
 * Artboard 1a's hero, with 1c's mobile treatment.
 *
 * Responsive reconciliation: 1a puts the status pill and the blurb in a split
 * row above the headline and the stats beside the CTAs; 1c leads with the orange
 * eyebrow, drops the stats (its ticker carries the numbers instead) and stacks
 * the CTAs. Both are expressed here rather than in two components.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 md:pt-[88px]">
      <GlowField
        size="lg"
        durationSeconds={7}
        className="-top-[180px] left-1/2 -translate-x-1/2"
      />
      <GridLines />
      <EmberField />

      <Container className="relative">
        {/* 1c leads with this; 1a uses the status pill below. */}
        <Eyebrow tone="orange" size="wide" className="mb-3.5 md:hidden">
          {heroEyebrow}
        </Eyebrow>

        <div className="mb-6 hidden items-start justify-between gap-5 md:flex">
          <Eyebrow
            dot={heroStatus.tone}
            tone="fg2"
            size="wide"
            className="rounded-pill border border-line2 px-3.5 py-2"
          >
            {heroStatus.label}
          </Eyebrow>

          <p className="t-body m-0 max-w-[300px] text-fg2">{heroBlurb}</p>
        </div>

        <h1 className="t-hero relative m-0">
          We don&rsquo;t post.
          <br />
          We <span className="text-orange">ignite</span>{" "}
          <span className="relative inline-block">
            culture.
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-[0.08em] block h-[0.045em] bg-orange"
            />
          </span>
        </h1>

        <p className="t-body mt-4 max-w-[36ch] text-fg2 md:hidden">
          {heroBlurb}
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-between gap-8 pb-11 md:mt-10 md:flex-row md:items-end">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <PillAnchor
              href={`mailto:${NEW_BUSINESS_EMAIL}`}
              variant="solid"
              trailing="→"
            >
              Email the team
            </PillAnchor>

            <PillLink href="/work" variant="outline">
              See the work
            </PillLink>
          </div>

          {/* 1c omits these — the ticker below carries the figures. */}
          <div className="hidden gap-11 md:flex">
            {homeStats.map((stat) => (
              <StatBlock key={stat.label} stat={stat} size="md" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
