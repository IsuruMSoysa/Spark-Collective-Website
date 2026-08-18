import type { Metadata } from "next";
import { MobileActionBar } from "@/components/chrome/MobileActionBar";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { ReelStrip } from "@/components/home/ReelStrip";
import { ServicesTable } from "@/components/home/ServicesTable";
import { Band } from "@/components/ui/Band";
import { Marquee } from "@/components/ui/Marquee";
import { PillLink } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ReceiptsGrid } from "@/components/work/ReceiptsGrid";
import { cases } from "@/lib/cases";
import { mobileTickerItems, servicesSection, workSection } from "@/lib/home";
import { marqueeItems } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // absolute, so the root layout's "%s — Spark Collective" template does not
  // double the brand name on the homepage.
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex-1 pb-20 md:pb-0">
      <Hero />
      <ReelStrip />

      {/* 1a's full service marquee; 1c's tighter figure ticker below md. */}
      <Marquee
        items={marqueeItems}
        durationSeconds={26}
        className="hidden md:block"
      />
      <Marquee
        items={mobileTickerItems}
        durationSeconds={18}
        size="sm"
        className="md:hidden"
      />

      <Band tone="bg" pad="lg" id="services">
        <SectionHeader
          title={
            <>
              What we
              <br />
              run for you
            </>
          }
          meta={servicesSection.meta}
        />
        <ServicesTable linkRows className="mt-10" />
      </Band>

      {/* pad="none" + explicit bottom padding: the artboard runs the services
          table straight into Receipts with no gap between the two sections. */}
      <Band tone="bg" pad="none" id="work" className="pb-16 md:pb-24">
        <SectionHeader
          title={workSection.title}
          trailing={
            <PillLink href="/work" variant="ghost" size="sm">
              {workSection.linkLabel} →
            </PillLink>
          }
        />
        <ReceiptsGrid cases={cases} className="mt-7" />
      </Band>

      <CtaBand />

      <MobileActionBar />
    </main>
  );
}
