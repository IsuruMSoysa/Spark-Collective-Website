import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DeckBand } from "@/components/services/DeckBand";
import { ProcessGrid } from "@/components/services/ProcessGrid";
import { ServicesTable } from "@/components/home/ServicesTable";
import { Band } from "@/components/ui/Band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six disciplines, one team: social management, paid and performance, creator campaigns, content studio, live and experiential, talent and booking.",
  alternates: { canonical: "/services" },
};

/**
 * No artboard exists for this index, so it is composed entirely from parts that
 * already do — the same ServicesTable the homepage uses, plus the shared process
 * grid. Redirecting to the first service would point a primary nav item at a
 * redirect and give the other five no internal inbound link.
 */
export default function ServicesPage() {
  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Services"
        title="Six disciplines, one team"
        blurb="Pick a discipline to see what a month actually looks like — deliverables, packages and the first ninety days."
      />

      <Band tone="bg" pad="md">
        <ServicesTable linkRows />
      </Band>

      <Band tone="bg" pad="md" bordered="bottom">
        <ProcessGrid />
      </Band>

      <DeckBand />
    </main>
  );
}
