import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { EmberField, GlowField, GridLines } from "@/components/ui/decor";
import { heroBlurb, heroEyebrow } from "@/lib/home";
import { ARROW, CTA } from "@/lib/microcopy";
import { SITE } from "@/lib/site";

/**
 * Brand doc §3's hero.
 *
 * The H1 is `SITE.tagline` rather than inline JSX so the primary tagline lives
 * in exactly one place — it is also the homepage title and the OG title.
 *
 * The four social-proof numbers deliberately sit in their own band below this
 * one rather than beside the buttons: four figures do not fit next to two pills
 * at `md`, and §3 wants them visible on phones too.
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
        <Eyebrow tone="orange" size="wide" className="mb-4.5">
          {heroEyebrow}
        </Eyebrow>

        <h1 className="t-hero relative m-0 max-w-[22ch]">{SITE.tagline}</h1>

        <p className="t-body-lg mt-6 max-w-[56ch] text-fg2">{heroBlurb}</p>

        <div className="mt-9 flex flex-col items-stretch gap-2.5 pb-12 sm:flex-row sm:items-start md:mt-11">
          <PillLink href="/contact" variant="solid" trailing={ARROW}>
            {CTA.startConversation}
          </PillLink>

          <PillLink href="/work" variant="outline" trailing={ARROW}>
            {CTA.seeOurWork}
          </PillLink>
        </div>
      </Container>
    </section>
  );
}
