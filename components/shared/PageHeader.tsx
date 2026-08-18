import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/**
 * The shared page-header block from artboards 1d–1g: mono eyebrow, oversized
 * H1, and an optional right-aligned blurb.
 */
export function PageHeader({
  eyebrow,
  title,
  blurb,
  bordered = true,
  children,
  className,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  blurb?: React.ReactNode;
  bordered?: boolean;
  /** Slot beneath the header — the services tab bar lives here. */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(bordered && "border-b border-line", className)}
    >
      <Container className="pb-10 pt-12 md:pb-10 md:pt-[60px]">
        <Eyebrow size="wide" className="mb-4">
          {eyebrow}
        </Eyebrow>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <h1 className="t-h1 m-0 max-w-[760px] text-fg">{title}</h1>

          {blurb ? (
            <p className="t-body m-0 max-w-[300px] text-fg2">{blurb}</p>
          ) : null}
        </div>
      </Container>

      {children}
    </header>
  );
}
