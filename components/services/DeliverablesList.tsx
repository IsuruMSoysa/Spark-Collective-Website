import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The "Services include:" / "Content includes:" capability list from brand doc
 * §3. Two columns from `sm` up: the doc gives each service 8–11 items, which is
 * a long single column on anything wider than a phone.
 */
export function DeliverablesList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <Eyebrow size="wide" className="mb-6">
        {title}
      </Eyebrow>

      <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-3.5 p-0 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="mt-[7px] size-2 shrink-0 bg-orange"
            />
            <span className="t-h5 text-fg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
