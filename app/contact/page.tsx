import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { Band } from "@/components/ui/Band";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlowField } from "@/components/ui/decor";
import {
  CONTACT_CLOSING,
  CONTACT_COPY,
  CONTACT_EMAIL,
  contactChannels,
} from "@/lib/contact";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // absolute: brand doc §11's title already contains the brand name, so the
  // root layout's "%s | Spark Collective" template would double it.
  title: { absolute: "Contact Spark Collective | Let's Talk" },
  description: SITE.description,
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

            {CONTACT_COPY.body.map((line) => (
              <p
                key={line.slice(0, 24)}
                className="t-body-lg mt-5 max-w-[440px] text-fg2"
              >
                {line}
              </p>
            ))}

            <div className="mt-11">
              <ContactChannels channels={contactChannels} />
            </div>
          </Container>
        </section>

        <section className="border-t border-line bg-bg2 lg:border-t-0">
          <Container className="py-14 md:py-[70px]">
            <Eyebrow size="wide" className="mb-6">
              {CONTACT_COPY.formEyebrow}
            </Eyebrow>

            <ContactForm />
          </Container>
        </section>
      </div>

      <Band tone="bg" bordered="top" pad="md">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="t-h2 m-0 text-fg">{CONTACT_CLOSING.title}</h2>

            {CONTACT_CLOSING.body.map((line) => (
              <p key={line} className="t-lead mt-2 text-fg2">
                {line}
              </p>
            ))}
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="t-h4 break-all text-orange transition-colors hover:text-orange2"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </Band>
    </main>
  );
}
