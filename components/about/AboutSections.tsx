import { Band } from "@/components/ui/Band";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { PillAnchor } from "@/components/ui/Pill";
import { Lockup } from "@/components/brand/Lockup";
import {
  ABOUT_BODY,
  ABOUT_EYEBROW,
  ABOUT_HEADLINE,
  ABOUT_PHOTO,
  HIRING_HEADLINE,
  principles,
  team,
} from "@/lib/about";
import { CAREERS_EMAIL } from "@/lib/contact";

/** Artboard 1f's 1.2fr / 1fr intro split. */
export function IntroSplit() {
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

/** Three-up principles row, hairlines via 1px gaps. */
export function PrinciplesRow() {
  return (
    <section className="grid gap-px border-b border-line bg-line md:grid-cols-3">
      {principles.map((principle) => (
        <div key={principle.number} className="bg-bg p-7 md:p-9">
          <Eyebrow tone="orange" size="eyebrow" className="mb-3.5">
            Principle {principle.number}
          </Eyebrow>
          <h2 className="t-h4 m-0 text-fg">{principle.title}</h2>
          <p className="t-body m-0 mt-3 text-fg2">{principle.description}</p>
        </div>
      ))}
    </section>
  );
}

export function TeamGrid() {
  return (
    <Band tone="bg" pad="md" id="team">
      <h2 className="t-h2 m-0 mb-8 text-fg">The team</h2>

      <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 lg:grid-cols-5">
        {team.map((member) => (
          <li key={member.id}>
            <MediaPlaceholder
              ratio="3:4"
              label={member.photo.label}
              src={member.photo.src}
              alt={member.photo.alt ?? member.name}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              hatch="sm"
              className="rounded-card"
            />
            <div className="t-h5 mt-3 text-fg">{member.name}</div>
            <div className="t-meta mt-1 text-fg3">{member.role}</div>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/** Full-bleed orange band with an inverted button. */
export function HiringBand() {
  return (
    <Band tone="orange" pad="md">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <Lockup variant="inline" size="sm" tone="onOrange" href={false} />
          <h2 className="t-h3 m-0 mt-3 text-on-orange">{HIRING_HEADLINE}</h2>
        </div>

        <PillAnchor
          href={`mailto:${CAREERS_EMAIL}`}
          variant="inverted"
          className="max-w-full"
        >
          <span className="truncate">{CAREERS_EMAIL}</span>
        </PillAnchor>
      </div>
    </Band>
  );
}
