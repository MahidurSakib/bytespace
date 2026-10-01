import Image from "next/image";
import { cn } from "@/lib/cn";

export function AvatarStack({ count = 4, badge, badgeTone = "lime", size = 32, className }: {
  count?: number; badge: string; badgeTone?: "lime" | "dark"; size?: number; className?: string;
}) {
  const px = { width: size, height: size };
  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Image
          key={i}
          src={`/images/people/avatar-${(i % 7) + 1}.webp`}
          alt=""
          aria-hidden="true"
          width={size}
          height={size}
          style={px}
          className="-ml-2 rounded-full border-2 border-white object-cover first:ml-0"
        />
      ))}
      <span
        style={px}
        className={cn(
          "-ml-2 inline-flex items-center justify-center rounded-full border-2 border-white text-label-xs font-medium",
          badgeTone === "lime" ? "bg-lime-500 text-neutral-950" : "bg-neutral-950 text-white",
        )}
      >
        {badge}
      </span>
    </div>
  );
}
