import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import {
  ABOUT_BODY,
  ABOUT_EYEBROW,
  ABOUT_HEADLINE,
  ABOUT_PHOTO,
} from "@/lib/about";

/**
 * Brand doc §4's hero: a 1.2fr / 1fr copy-and-photo split.
 *
 * The photo is still a placeholder slot — adding `src`/`alt` to ABOUT_PHOTO
 * swaps in real imagery with no layout change.
 */
export function AboutHero() {
  return (
    <section className="grid border-b border-line lg:grid-cols-[1.2fr_1fr]">
      <div className="order-2 lg:order-1">
        <Container className="py-12 md:py-[66px]">
          <Eyebrow tone="orange" size="wide" className="mb-4.5">
            {ABOUT_EYEBROW}
          </Eyebrow>

          <h1 className="t-h1 m-0 text-fg">{ABOUT_HEADLINE}</h1>

          {ABOUT_BODY.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="t-body-lg mt-6 max-w-[520px] text-fg2"
            >
              {paragraph}
            </p>
          ))}
        </Container>
      </div>

      <MediaPlaceholder
        ratio="4:3"
        label={ABOUT_PHOTO.label}
        src={ABOUT_PHOTO.src}
        alt={ABOUT_PHOTO.alt}
        sizes="(max-width: 1024px) 100vw, 40vw"
        hatch="lg"
        className="order-1 lg:order-2 lg:aspect-auto lg:min-h-[400px]"
      />
    </section>
  );
}
