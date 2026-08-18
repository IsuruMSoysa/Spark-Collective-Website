import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { PackageTier } from "@/lib/packages";
import { PACKAGES_NOTE } from "@/lib/packages";

function PackageCard({ tier }: { tier: PackageTier }) {
  return (
    // No overflow-hidden anywhere up this subtree: the badge is pinned onto the
    // top border and an overflow-hidden ancestor would silently clip it.
    <Card
      tone="card"
      pad="md"
      accent={tier.featured}
      className="flex items-center justify-between gap-4"
    >
      {tier.badge ? (
        <span className="t-meta absolute -top-[9px] left-5 rounded-pill bg-orange px-2.5 py-1 text-on-orange">
          {tier.badge}
        </span>
      ) : null}

      <div>
        <div className="t-h4 text-fg">{tier.name}</div>
        <p className="t-body-sm m-0 mt-1.5 text-fg2">{tier.summary}</p>
      </div>

      <div className="shrink-0 text-right">
        <div className="t-stat text-fg">{tier.price}</div>
        <div className="t-meta mt-1 text-fg3">{tier.cadence}</div>
      </div>
    </Card>
  );
}

export function PackagesPanel({
  tiers,
  note = PACKAGES_NOTE,
}: {
  tiers: readonly PackageTier[];
  note?: string;
}) {
  return (
    <div>
      <Eyebrow size="wide" className="mb-6">
        Packages
      </Eyebrow>

      <div className="flex flex-col gap-3">
        {tiers.map((tier) => (
          <PackageCard key={tier.id} tier={tier} />
        ))}
      </div>

      <p className="t-body-sm m-0 mt-5 text-fg3">{note}</p>
    </div>
  );
}
