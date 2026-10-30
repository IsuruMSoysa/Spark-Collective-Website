import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { ARROW, CTA, NOT_FOUND } from "@/lib/microcopy";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Brand doc §10's 404. */
export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-20 md:py-28">
        <Eyebrow tone="orange" size="wide" className="mb-4.5">
          Error 404
        </Eyebrow>

        <h1 className="t-h1 m-0 max-w-[18ch] text-fg">{NOT_FOUND.title}</h1>

        <p className="t-body-lg mt-5 max-w-[44ch] text-fg2">{NOT_FOUND.body}</p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <PillLink href="/" variant="solid" trailing={ARROW}>
            {NOT_FOUND.cta}
          </PillLink>

          <PillLink href="/contact" variant="outline" trailing={ARROW}>
            {CTA.startConversation}
          </PillLink>
        </div>
      </Container>
    </main>
  );
}
