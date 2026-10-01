import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  variant?: "lime" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children"> | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>));

const styles = {
  base: "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  variant: {
    lime: "bg-lime-500 text-neutral-950 hover:bg-lime-400 active:bg-lime-600",
    ghost: "border border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50",
  },
  size: { md: "h-11 px-6 text-label-m", lg: "h-12 px-7 text-label-m" },
};

export function Button({ variant = "lime", size = "md", className, children, ...rest }: Props) {
  const cls = cn(styles.base, styles.variant[variant], styles.size[size], className);
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest;
    return <Link href={href} className={cls} {...linkProps}>{children}</Link>;
  }
  const { type = "button", ...btnProps } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={type} className={cls} {...btnProps}>{children}</button>;
}
