"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillAnchor, PillButton } from "@/components/ui/Pill";
import { CONTACT_EMAIL, WHATSAPP_PHONE_DISPLAY, getWhatsAppUrl } from "@/lib/contact";

/** Must be a client component — framework requirement for error boundaries. */
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-20 md:py-28">
        <Eyebrow tone="orange" size="wide" className="mb-4.5">
          Something broke
        </Eyebrow>

        <h1 className="t-h1 m-0 max-w-[18ch] text-fg">
          That didn&rsquo;t load
        </h1>

        <p className="t-body-lg mt-5 max-w-[44ch] text-fg2">
          An unexpected error stopped this page rendering. Try again, and if it
          keeps happening email{" "}
          <a className="text-orange" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{" "}
          or message us on WhatsApp.
        </p>

        {/* The nav is part of the layout, so it survives this boundary — but the
            contact page might be what failed, hence two direct channels here. */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <PillButton onClick={reset} variant="solid">
            Try again
          </PillButton>

          <PillAnchor href={getWhatsAppUrl()} external variant="outline">
            {WHATSAPP_PHONE_DISPLAY}
          </PillAnchor>
        </div>
      </Container>
    </main>
  );
}
