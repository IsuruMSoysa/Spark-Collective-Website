import type { Metadata } from "next";
import { MobileActionBar } from "@/components/chrome/MobileActionBar";
import { Hero } from "@/components/home/Hero";
import { ReelStrip } from "@/components/home/ReelStrip";
import { ServicesTable } from "@/components/home/ServicesTable";
import { ArrowFlow } from "@/components/shared/ArrowFlow";
import { CtaBand } from "@/components/shared/CtaBand";
import { NumberedList } from "@/components/shared/NumberedList";
import { StatementBand } from "@/components/shared/StatementBand";
import { Band } from "@/components/ui/Band";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatRow } from "@/components/ui/StatBlock";
import {
  contentSection,
  creatorAdvantage,
  creatorFlow,
  homeCta,
  homeStats,
  performanceSection,
  problemSection,
  whySpark,
  whySparkPoints,
} from "@/lib/home";
import { WHAT_WE_DO, marqueeItems } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // absolute, so the root layout's "%s | Spark Collective" template does not
  // double the brand name. Brand doc §11, verbatim.
  title: { absolute: "Spark Collective | Creator-Led Social & Content Agency" },
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex-1 pb-20 md:pb-0">
      <Hero />

      {/* §3's four social-proof numbers. `divided` gives the design's hairline
          treatment; columns=4 is a 2×2 on phones and one row from lg. */}
      <Band tone="bg" pad="sm" bordered="both">
        <StatRow stats={homeStats} columns={4} divided />
      </Band>

      <ReelStrip />

      <Marquee items={marqueeItems} durationSeconds={26} className="hidden md:block" />
      <Marquee
        items={marqueeItems}
        durationSeconds={18}
        size="sm"
        className="md:hidden"
      />

      <StatementBand statement={problemSection} tone="bg2" />

      <Band tone="bg" pad="lg" bordered="top" id="services">
        <SectionHeader eyebrow={WHAT_WE_DO.eyebrow} title={WHAT_WE_DO.title} />

        {/* The doc's intro is a full sentence, so it reads as a lede rather than
            in SectionHeader's right-aligned mono `meta` slot. */}
        <p className="t-lead mt-6 max-w-[52ch] text-fg2">{WHAT_WE_DO.intro}</p>

        <ServicesTable linkRows className="mt-10" />
      </Band>

      <StatementBand
        statement={creatorAdvantage}
        footer={<ArrowFlow steps={creatorFlow} />}
      />

      <StatementBand statement={contentSection} tone="bg2" />

      <StatementBand statement={performanceSection} />

      <StatementBand
        statement={whySpark}
        tone="bg2"
        size="default"
        footer={
          <NumberedList
            items={whySparkPoints}
            layout="grid"
            columns={4}
            surface="bg2"
          />
        }
      />

      <CtaBand content={homeCta} />

      <MobileActionBar />
    </main>
  );
}
