import Link from "next/link";
import { Building2, Camera, Code, Laptop, Megaphone, PencilRuler } from "lucide-react";
import { Container } from "@/components/ui/Container";

const categories = [
  { label: "Design", Icon: PencilRuler },
  { label: "Development", Icon: Code },
  { label: "IT & Software", Icon: Laptop },
  { label: "Business", Icon: Building2 },
  { label: "Marketing", Icon: Megaphone },
  { label: "Photography", Icon: Camera },
];

export function Categories() {
  return (
    <section aria-labelledby="paths-title" className="bg-white pb-16 pt-6 md:pb-24">
      <Container>
        <h2 id="paths-title" className="text-center text-[28px] sm:text-[32px] lg:text-h-s">Explore Diverse Learning Paths at Bytespace</h2>
        <p className="mx-auto mt-5 max-w-[900px] text-center text-body-m text-neutral-500">
          At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields,
          ensuring there&apos;s something for everyone. Unleash your potential and explore our carefully curated categories.
        </p>
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {categories.map(({ label, Icon }) => (
            <li key={label}>
              <Link
                href="/#courses"
                className="group flex h-[150px] flex-col items-center justify-center gap-4 rounded-3xl border border-neutral-200 bg-white transition-shadow hover:shadow-card lg:h-[167px]"
              >
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-lime-500 text-neutral-950 transition-transform group-hover:scale-105">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-label-l text-neutral-950">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
