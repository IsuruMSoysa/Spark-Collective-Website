import { cn } from "@/lib/cn";

const SIZE_CLASS = {
  default: "max-w-[1280px]",
  narrow: "max-w-[880px]",
} as const;

export type ContainerSize = keyof typeof SIZE_CLASS;

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: ContainerSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-10",
        SIZE_CLASS[size],
        className
      )}
    >
      {children}
    </div>
  );
}
