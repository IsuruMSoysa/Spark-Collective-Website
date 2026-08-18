"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/Pill";
import { NEW_BUSINESS_EMAIL } from "@/lib/contact";

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
          <a className="text-orange" href={`mailto:${NEW_BUSINESS_EMAIL}`}>
            {NEW_BUSINESS_EMAIL}
          </a>
          .
        </p>

        <PillButton onClick={reset} variant="solid" className="mt-8">
          Try again
        </PillButton>
      </Container>
    </main>
  );
}
