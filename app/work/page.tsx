import type { Metadata } from "next";
import { CtaBand } from "@/components/shared/CtaBand";
import { NumberedList } from "@/components/shared/NumberedList";
import { PageHeader } from "@/components/shared/PageHeader";
import { Band } from "@/components/ui/Band";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { REPORTING_TITLE, WORK_PAGE, reportingFramework, workCta } from "@/lib/work";

export const metadata: Metadata = {
  // Brand doc §11, verbatim.
  title: { absolute: "Our Work | Spark Collective" },
  description:
    "Campaigns, content and creator collaborations built for brands — and the standard every Spark write-up has to meet.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main className="flex-1">
      <PageHeader
        eyebrow={WORK_PAGE.eyebrow}
        title={
          <>
            {WORK_PAGE.title}
            <br />
            {WORK_PAGE.subtitle}
          </>
        }
        blurb={WORK_PAGE.blurb}
      />

      {/* §6 supplies a case-study structure but no verified case studies, and
          §12 rules out inventing any. So the structure is the content: this is
          the standard a write-up has to meet. Real cases slot in above it. */}
      <Band tone="bg" pad="lg">
        <SectionHeader title={REPORTING_TITLE} />
        <NumberedList items={reportingFramework} className="mt-8" />
      </Band>

      <CtaBand content={workCta} />
    </main>
  );
}
