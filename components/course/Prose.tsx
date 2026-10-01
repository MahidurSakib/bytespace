import { cn } from "@/lib/cn";

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("font-heading text-h-xs font-semibold text-neutral-950", className)}>{children}</h2>;
}

export function Paragraph({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-body-m text-neutral-700", className)}>{children}</p>;
}
