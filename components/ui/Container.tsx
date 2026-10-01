import { cn } from "@/lib/cn";

/** 1200px content width = 1440px frame with 120px margins (Style Guide layout grid). */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8 xl:px-0", className)}>{children}</div>;
}
