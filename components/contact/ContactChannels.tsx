import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ContactChannel } from "@/lib/contact";

export function ContactChannels({
  channels,
}: {
  channels: readonly ContactChannel[];
}) {
  return (
    <dl className="m-0 flex flex-col gap-5 border-t border-line pt-8">
      {channels.map((channel) => (
        <div key={channel.id}>
          <dt>
            <Eyebrow size="meta">{channel.label}</Eyebrow>
          </dt>
          <dd className="m-0 mt-1.5">
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : undefined)}
              className="t-h5 break-all text-fg transition-colors hover:text-orange"
            >
              {channel.value}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}
