"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/cn";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const linkCls = "text-label-m text-white/85 transition-colors hover:text-white";

  return (
    <header className={cn("on-blue fixed inset-x-0 top-0 z-50 transition-colors duration-200", scrolled || open ? "bg-blue-800/95 shadow-lg backdrop-blur" : "bg-transparent")}>
      <Container className="flex h-[76px] items-center justify-between md:h-[116px]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
          {navLinks.map((l) => {
            const active = isActive(l.href, pathname);
            return (
              <Link key={l.label} href={l.href} aria-current={active ? "page" : undefined} className={cn(linkCls, active && "text-white")}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/login" className={linkCls}>Sign In</Link>
          <Link href="/register" className={linkCls}>Join Us</Link>
          <button type="button" aria-label="Shopping bag" className="text-white/90 transition-colors hover:text-white">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <div id={panelId} hidden={!open} className="border-t border-white/15 md:hidden">
        <Container className="flex flex-col gap-1 py-4">
          {[...navLinks, { label: "Sign In", href: "/login" }, { label: "Join Us", href: "/register" }].map((l) => (
            <Link key={l.label} href={l.href} onClick={close} className="rounded-lg px-2 py-3 text-label-l text-white hover:bg-white/10">
              {l.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
