import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { HappyStudentsCard, LearningProgressCard, TopicCard } from "@/components/ui/StatCards";
import { HeroSearch } from "@/components/sections/HeroSearch";

export function Hero() {
  return (
    <section className="on-blue relative overflow-hidden bg-blue-800 bg-grid text-white">
      {/* decorative 3D shapes: absolute px tops match the 1440px frame */}
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]" aria-hidden="true">
        <Ornament name="swirl-a" tone="lime" className="-left-6 top-[150px] w-[90px] lg:-left-[0.4%] lg:top-[285px] lg:w-[14.2%]" />
        <Ornament name="cylinder" tone="lime" className="-right-8 top-[130px] w-[100px] lg:left-[88.5%] lg:right-auto lg:top-[257px] lg:w-[19%]" />
        <Ornament name="swirl-b" tone="white" className="hidden lg:block lg:left-[15%] lg:top-[505px] lg:w-[8%]" />
        <Ornament name="pyramid" tone="white" className="hidden lg:block lg:left-[78.4%] lg:top-[483px] lg:w-[9%]" />
        <Ornament name="torus" tone="white" className="left-[-2%] top-[430px] w-[90px] md:top-[560px] md:w-[130px] lg:left-[4.6%] lg:top-[738px] lg:w-[16.7%]" />
        <Ornament name="swirl-a" tone="white" className="right-[-1%] top-[470px] w-[80px] md:top-[600px] md:w-[110px] lg:left-[83%] lg:right-auto lg:top-[710px] lg:w-[13.2%]" />
      </div>

      <Container className="relative z-10 pt-[120px] text-center md:pt-[178px]">
        <h1 className="mx-auto max-w-[880px] text-[40px] leading-[1.2] sm:text-[52px] lg:text-h-l">
          Get Access to Hundreds Courses Available
        </h1>
        <p className="mx-auto mt-5 max-w-[900px] text-body-m text-white/90 md:mt-6 md:text-body-l">
          Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
        </p>
        <HeroSearch />
      </Container>

      <div className="relative mx-auto mt-10 h-[300px] w-full max-w-[1440px] sm:h-[400px] md:mt-[34px] md:h-[440px] lg:h-[475px]">
        <div className="absolute bottom-0 left-1/2 h-[190px] w-[560px] -translate-x-1/2 overflow-hidden sm:h-[260px] sm:w-[760px] md:h-[340px] md:w-[940px] lg:h-[410px] lg:w-[1176px]">
          <div className="aspect-square w-full rounded-full bg-lime-500" />
        </div>

        <Image
          src="/images/people/hero-learner.webp"
          alt="Smiling student with headphones holding a laptop"
          width={516}
          height={483}
          priority
          sizes="(max-width: 768px) 300px, 508px"
          className="absolute bottom-0 left-1/2 w-[270px] -translate-x-1/2 sm:w-[340px] md:ml-10 md:w-[420px] lg:ml-[60px] lg:w-[508px]"
        />

        <TopicCard className="absolute top-[70px] left-[calc(50%-315px)] hidden md:block lg:top-[92px]" />
        <LearningProgressCard className="absolute right-3 top-[70px] w-[170px] origin-top-right scale-90 sm:right-[8%] md:top-[80px] md:w-[232px] md:scale-100 lg:right-auto lg:left-[calc(50%+122px)] lg:top-[103px]" />
        <HappyStudentsCard className="absolute bottom-6 left-3 hidden sm:block sm:left-[6%] lg:bottom-auto lg:left-[calc(50%-392px)] lg:top-[290px]" />
      </div>
    </section>
  );
}
