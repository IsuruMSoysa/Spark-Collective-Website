import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutSections";
import { CtaBand } from "@/components/shared/CtaBand";
import { NumberedList } from "@/components/shared/NumberedList";
import { StatementBand } from "@/components/shared/StatementBand";
import { Band } from "@/components/ui/Band";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  APPROACH_TITLE,
  PRINCIPLES_TITLE,
  aboutCta,
  approach,
  principles,
  whoWeWorkWith,
} from "@/lib/about";

export const metadata: Metadata = {
  // Brand doc §11, verbatim — already carries the brand name, so absolute.
  title: { absolute: "About Spark Collective | Creator-Led Social & Content" },
  description:
    "Spark Collective is a creator-led social and content agency built for brands competing for attention in a world where everyone is publishing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />

      <Band tone="bg" pad="lg">
        <SectionHeader title={APPROACH_TITLE} />
        {/* rows, not a grid: five items in a hairline grid leaves an empty cell
            painting solid --line, and each step carries multiple lines of copy. */}
        <NumberedList items={approach} className="mt-8" />
      </Band>

      <Band tone="bg2" pad="lg" bordered="top">
        <SectionHeader title={PRINCIPLES_TITLE} />
        <NumberedList items={principles} className="mt-8" />
      </Band>

      <StatementBand statement={whoWeWorkWith} />

      <CtaBand content={aboutCta} />
    </main>
  );
}
