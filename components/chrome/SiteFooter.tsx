import Link from "next/link";
import type { Route } from "next";
import { Lockup } from "@/components/brand/Lockup";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { footerColumns, socialLinks } from "@/lib/nav";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg py-11">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-[280px]">
            <Lockup href="/" size="lg" withMark={false} />
            <p className="t-body-sm mt-4 text-fg2">
              {SITE.supportingStatement}
            </p>
          </div>

          {/* Two columns since brand doc §9 replaced the three-column layout. */}
          <div className="grid grid-cols-2 gap-8 md:gap-14">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <Eyebrow size="meta" className="mb-3">
                  {column.heading}
                </Eyebrow>

                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {column.items.map((item) => (
                    <li key={`${column.heading}-${item.label}`}>
                      {item.external ? (
                        <a
                          href={item.href}
                          {...(item.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : undefined)}
                          className="t-body-sm text-fg2 transition-colors hover:text-orange"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href as Route}
                          className="t-body-sm text-fg2 transition-colors hover:text-orange"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="t-meta mt-10 flex flex-col gap-5 border-t border-line pt-6 text-fg3 sm:flex-row sm:items-center sm:justify-between">
          {/* Baked at build time under static prerendering — redeploy annually
              rather than opting the whole footer into dynamic rendering. */}
          <div>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>

          {/* Renders nothing until real profile URLs exist — see lib/nav.ts. */}
          {socialLinks.length > 0 ? (
            <ul className="m-0 flex list-none flex-wrap gap-5 p-0">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg2 transition-colors hover:text-orange"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
