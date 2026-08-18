import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { CtaBand } from "@/components/home/CtaBand";
import { Band } from "@/components/ui/Band";
import { ReceiptsGrid } from "@/components/work/ReceiptsGrid";
import { cases, detailedCases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Campaign results across beverage, festival and fintech — social, creators, paid and live.",
  alternates: { canonical: "/work" },
};

/**
 * The design has no /work index artboard, so this reuses the homepage's
 * asymmetric "Receipts" grid rather than inventing a new layout. Cases without a
 * written-up detail render as non-linked cards, so there are no dead links.
 */
export default function WorkPage() {
  const pending = cases.length - detailedCases.length;

  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Work"
        title="Receipts"
        blurb={
          pending > 0
            ? `Selected campaigns. ${pending} more write-ups are on the way.`
            : "Selected campaigns, with the numbers attached."
        }
      />

      <Band tone="bg" pad="md">
        <ReceiptsGrid cases={cases} />
      </Band>

      <CtaBand />
    </main>
  );
}
