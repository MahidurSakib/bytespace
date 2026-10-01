import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section aria-labelledby="community-title" className="relative overflow-hidden bg-neutral-50/60 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[30%] top-[-120px] h-[380px] w-[560px] rounded-full bg-lime-300/70 blur-[100px]" />
        <div className="absolute -right-20 top-0 h-[520px] w-[520px] rounded-full bg-lime-200/80 blur-[100px]" />
        <div className="absolute -left-32 bottom-[-40px] h-[420px] w-[420px] rounded-full bg-blue-300/50 blur-[110px]" />
      </div>
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <h2 id="community-title" className="text-[30px] text-neutral-950 sm:text-[36px] lg:max-w-[540px] lg:text-h-m">
            Discover What Our Community Is Saying
          </h2>
          <p className="max-w-[560px] text-body-m text-neutral-600">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>
        <ul className="mt-12 grid items-start gap-6 md:grid-cols-3 md:gap-10">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="rounded-3xl bg-white p-6">
                <Image src={`/images/people/${t.image}.webp`} alt={`Portrait of ${t.name}`} width={80} height={80} className="h-20 w-20 rounded-full object-cover" />
                <figcaption className="mt-5">
                  <p className="font-heading text-h-xs font-semibold text-neutral-950">{t.name}</p>
                  <p className="mt-1 text-body-m text-blue-600">{t.role}</p>
                </figcaption>
                <blockquote className="mt-5 text-body-m text-neutral-600">&ldquo;{t.quote}&rdquo;</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
