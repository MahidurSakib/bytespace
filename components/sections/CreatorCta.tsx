import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";

export function CreatorCta() {
  return (
    <section aria-labelledby="cta-title" className="on-blue relative overflow-hidden bg-blue-800 bg-grid text-white">
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]" aria-hidden="true">
        <Ornament name="swirl-a" tone="lime" className="-left-4 -top-4 w-[80px] lg:-left-[1%] lg:-top-5 lg:w-[12%]" />
        <Ornament name="swirl-b" tone="white" className="left-[6%] top-8 hidden w-[60px] sm:block lg:left-[14.6%] lg:top-[34px] lg:w-[8%]" />
        <Ornament name="pyramid" tone="lime" className="right-[8%] top-6 hidden w-[70px] sm:block lg:left-[76.9%] lg:right-auto lg:top-[21px] lg:w-[8.5%]" />
        <Ornament name="cylinder" tone="white" className="-right-6 top-10 w-[80px] lg:left-[88.5%] lg:right-auto lg:top-[53px] lg:w-[15%]" />
        <Ornament name="cone" tone="white" className="-left-3 bottom-24 hidden w-[60px] sm:block lg:-left-[0.7%] lg:bottom-auto lg:top-[243px] lg:w-[7.6%]" />
        <Ornament name="torus" tone="lime" className="bottom-[-30px] left-[4%] w-[100px] lg:left-[4.8%] lg:bottom-auto lg:top-[357px] lg:w-[16.5%]" />
        <Ornament name="swirl-a" tone="lime" className="-right-2 bottom-[-20px] w-[70px] lg:left-[82%] lg:right-auto lg:bottom-auto lg:top-[330px] lg:w-[13%]" />
      </div>
      <Container className="relative py-20 text-center md:py-[92px]">
        <h2 id="cta-title" className="mx-auto max-w-[580px] text-[30px] sm:text-[36px] lg:text-h-m">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="mx-auto mt-8 max-w-[960px] text-body-m text-white/95">
          Experience the collaboration of numerous creators and an expanding selection of courses. Register now and become a part of a
          community comprising over 10,000 local and international creators. Utilize our Course Editor, and showcase your expertise by
          publishing your finest course on the ByteSpace Course Library.
        </p>
        <Button href="/register" size="lg" className="mt-9">Join as Creator</Button>
      </Container>
    </section>
  );
}
