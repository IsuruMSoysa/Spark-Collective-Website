import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-20 md:py-28">
        <Eyebrow tone="orange" size="wide" className="mb-4.5">
          Error 404
        </Eyebrow>

        <h1 className="t-h1 m-0 max-w-[18ch] text-fg">
          This page never made it to air
        </h1>

        <p className="t-body-lg mt-5 max-w-[44ch] text-fg2">
          The link is dead or the page moved. The work, the services and a real
          human are all still where you left them.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <PillLink href="/" variant="solid">
            Back to home
          </PillLink>
          <PillLink href="/work" variant="outline">
            See the work
          </PillLink>
        </div>
      </Container>
    </main>
  );
}
