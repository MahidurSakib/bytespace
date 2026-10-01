import { Disc3, Orbit, Sun, Waves, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";

const partners = [Waves, Sun, Zap, Orbit, Disc3];

export function Partners() {
  return (
    <section aria-label="Our partners" className="bg-neutral-50 py-12 md:py-16 lg:py-[82px]">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-neutral-400 lg:justify-between">
          {partners.map((Icon, i) => (
            <li key={i} className="flex items-center gap-2">
              <Icon className="h-9 w-9" strokeWidth={2.2} aria-hidden="true" />
              <span className="font-heading text-[26px] font-semibold tracking-tight">Logoipsum</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
