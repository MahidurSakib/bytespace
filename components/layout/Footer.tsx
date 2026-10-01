import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { footerColumns, legalLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50/40">
      <Container className="pt-16 md:pt-[88px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="max-w-[520px]">
            <Logo tone="dark" />
            <p className="mt-3 text-body-s text-neutral-950">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>
            <div className="mt-8"><NewsletterForm /></div>
            <p className="mt-4 max-w-[420px] text-body-xs text-neutral-950">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {footerColumns.map((col, i) => (
              <ul key={i} className="flex flex-col gap-4">
                {col.map((label) => (
                  <li key={label}>
                    <Link href="/" className="text-body-s text-neutral-950 transition-colors hover:text-blue-600">{label}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-200 py-8 text-body-xs text-neutral-950 md:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p>@ 2023 ByteSpace. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l}><Link href="/" className="hover:text-blue-600">{l}</Link></li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
