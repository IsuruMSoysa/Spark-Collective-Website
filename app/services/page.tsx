import type { Metadata } from "next";
import { ServicesTable } from "@/components/home/ServicesTable";
import { ServicesCta } from "@/components/services/ServicesCta";
import { NumberedList } from "@/components/shared/NumberedList";
import { PageHeader } from "@/components/shared/PageHeader";
import { Band } from "@/components/ui/Band";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HOW_WE_WORK, howWeWork } from "@/lib/process";
import { SERVICES_PAGE } from "@/lib/services";

export const metadata: Metadata = {
  // Brand doc §11, verbatim.
  title: { absolute: "Social, Creator Campaigns & Content | Spark Collective" },
  description:
    "Social media, creator campaigns, content production, paid media and performance, creative strategy, and UGC and creator content — one team, one connected system.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <PageHeader
        eyebrow={SERVICES_PAGE.eyebrow}
        title={SERVICES_PAGE.title}
        blurb={SERVICES_PAGE.blurb}
      />

      <Band tone="bg" pad="md">
        <ServicesTable linkRows />
      </Band>

      {/* Rendered here and not on the six detail pages: one agency-wide process
          repeated six times is noise. */}
      <Band tone="bg2" pad="lg" bordered="top">
        <SectionHeader eyebrow={HOW_WE_WORK.eyebrow} title={HOW_WE_WORK.title} />
        <NumberedList
          items={howWeWork}
          layout="grid"
          columns={3}
          surface="bg2"
          className="mt-10"
        />
      </Band>

      <ServicesCta />
    </main>
  );
}
