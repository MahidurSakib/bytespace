import { cn } from "@/lib/cn";

/** Blue grid banner used at the top of inner pages. The fixed navbar sits on top of it. */
export function PageHero({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn("on-blue relative overflow-hidden bg-blue-800 bg-grid text-white", className)}>{children}</section>;
}
