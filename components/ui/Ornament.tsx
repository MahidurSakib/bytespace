import Image from "next/image";
import { cn } from "@/lib/cn";

const sizes = {
  "cone": [900, 1070],
  "cylinder": [900, 986],
  "pyramid": [900, 991],
  "swirl-a": [900, 1180],
  "swirl-b": [900, 956],
  "torus": [900, 824],
} as const;

export type OrnamentName = keyof typeof sizes;

/** Decorative 3D shape from the design. Always hidden from assistive tech. */
export function Ornament({ name, tone, className }: { name: OrnamentName; tone: "white" | "lime"; className?: string }) {
  const [w, h] = sizes[name];
  return (
    <Image
      src={`/images/ornaments/${name}-${tone}.webp`}
      alt=""
      aria-hidden="true"
      width={w}
      height={h}
      sizes="(max-width: 768px) 120px, 240px"
      className={cn("pointer-events-none absolute select-none", className)}
    />
  );
}
