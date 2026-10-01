import Link from "next/link";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" className={className} aria-hidden="true" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#cbfc01"
        d="M0 4.5C0 2 2 0 4.5 0S9 2 9 4.5V14c1.6-1 3.4-1.5 5.5-1.5C21 12.5 26 17 26 22.5S21 32 14.5 32H4.5C2 32 0 30 0 27.5V4.5Zm11 15v8l7-4-7-4Z"
      />
    </svg>
  );
}

export function Logo({ tone = "light", markOnly = false, className }: { tone?: "light" | "dark"; markOnly?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="ByteSpace home" className={cn("inline-flex items-center gap-1.5", className)}>
      <LogoMark className="h-8 w-7" />
      {!markOnly && (
        <span className={cn("font-heading text-[22px] font-bold leading-none tracking-tight", tone === "light" ? "text-white" : "text-neutral-950")}>
          ByteSpace
        </span>
      )}
    </Link>
  );
}
