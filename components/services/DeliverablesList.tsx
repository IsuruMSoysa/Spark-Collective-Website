import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Deliverable } from "@/lib/services";

/** Artboard 1d's "What you get, every month" column. */
export function DeliverablesList({
  title = "What you get, every month",
  items,
}: {
  title?: string;
  items: readonly Deliverable[];
}) {
  return (
    <div>
      <Eyebrow size="wide" className="mb-6">
        {title}
      </Eyebrow>

      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="mt-[7px] size-2 shrink-0 bg-orange"
            />
            <div>
              <div className="t-h5 text-fg">{item.title}</div>
              <p className="t-body m-0 mt-1 text-fg2">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
