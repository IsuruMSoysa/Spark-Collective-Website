import type { Metadata } from "next";
import { BriefBuilder } from "@/components/contact/BriefBuilder";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillAnchor } from "@/components/ui/Pill";
import { GlowField } from "@/components/ui/decor";
import {
  CONTACT_COPY,
  NEW_BUSINESS_EMAIL,
  contactChannels,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT_COPY.blurb,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <div className="grid lg:grid-cols-2">
        <section className="relative overflow-hidden border-line lg:border-r">
          <GlowField size="md" durationSeconds={8} className="-left-20 -top-36" />

          <Container className="relative py-14 md:py-[70px]">
            <Eyebrow tone="orange" size="wide" className="mb-4.5">
              {CONTACT_COPY.eyebrow}
            </Eyebrow>

            <h1 className="t-h1 m-0 text-fg">{CONTACT_COPY.headline}</h1>

            <p className="t-body-lg mt-5 max-w-[420px] text-fg2">
              {CONTACT_COPY.blurb}
            </p>

            <PillAnchor
              href={`mailto:${NEW_BUSINESS_EMAIL}`}
              variant="solid"
              size="lg"
              shape="card"
              className="mt-8 max-w-full"
            >
              <span className="truncate">{NEW_BUSINESS_EMAIL}</span>
            </PillAnchor>

            <div className="mt-11">
              <ContactChannels channels={contactChannels} />
            </div>
          </Container>
        </section>

        <section className="border-t border-line bg-bg2 lg:border-t-0">
          <Container className="py-14 md:py-[70px]">
            <BriefBuilder to={NEW_BUSINESS_EMAIL} />
          </Container>
        </section>
      </div>
    </main>
  );
}
