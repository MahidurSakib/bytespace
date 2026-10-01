import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { Ornament } from "@/components/ui/Ornament";
import { HappyStudentsCard, LearningProgressCard, RevenueCard, YearToDateCard } from "@/components/ui/StatCards";
import { courses } from "@/data/courses";
import { creatorPoints, stats } from "@/data/site";

/** Fixed-size art stage that scales down as one unit on small screens. */
function Stage({ w, h, mobileScale = 0.62, children }: { w: number; h: number; mobileScale?: number; children: React.ReactNode }) {
  const style = { "--w": `${w}px`, "--h": `${h}px`, "--s": mobileScale } as React.CSSProperties;
  return (
    <div style={style} className="relative mx-auto lg:mx-0 h-[calc(var(--h)*var(--s))] w-[calc(var(--w)*var(--s))] md:h-(--h) md:w-(--w)">
      <div style={{ width: w, height: h }} className="absolute left-0 top-0 origin-top-left scale-(--s) md:scale-100">
        {children}
      </div>
    </div>
  );
}

export function Growth() {
  return (
    <section className="relative overflow-hidden bg-neutral-50/60 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 -top-20 h-[520px] w-[820px] rounded-full bg-lime-200/70 blur-[110px]" />
        <div className="absolute -right-32 top-10 h-[460px] w-[620px] rounded-full bg-blue-100/70 blur-[110px]" />
        <div className="absolute -left-40 top-[620px] h-[420px] w-[520px] rounded-full bg-blue-200/50 blur-[110px]" />
        <div className="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-lime-300/60 blur-[110px]" />
        <div className="absolute -bottom-24 right-0 h-[420px] w-[520px] rounded-full bg-blue-200/50 blur-[110px]" />
      </div>

      <Container className="relative space-y-20 md:space-y-28">
        {/* Block 1 */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[32px] sm:text-[38px] lg:text-h-m">Your Path to Professional Growth Starts Here!</h2>
            <p className="mt-8 max-w-[480px] text-body-m text-neutral-800 md:mt-10">
              Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey.
              Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely,
              we have the resources you need.
            </p>
            <dl className="mt-10 flex gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-heading text-[32px] font-normal leading-tight text-blue-600 md:text-[36px]">{s.value}</dd>
                  <dt className="text-body-m text-neutral-800">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <Stage w={578} h={560}>
            <CourseCard course={courses[0]} className="absolute left-0 top-0 w-[372px] shadow-card" />
            <Image
              src="/images/people/hero-learner.webp"
              alt="Learner smiling while holding a laptop"
              width={516}
              height={483}
              sizes="514px"
              className="absolute left-16 top-[60px] w-[514px] drop-shadow-[0_30px_40px_rgb(36_37_40/0.25)]"
            />
            <Ornament name="swirl-a" tone="lime" className="left-[452px] top-[95px] w-[124px]" />
            <LearningProgressCard className="absolute left-[346px] top-[215px]" />
          </Stage>
        </div>

        {/* Block 2 */}
        <div id="creators" className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Stage w={520} h={560}>
              <Image
                src="/images/people/creator.webp"
                alt="Creator wearing a headset and holding a tablet"
                width={500}
                height={500}
                sizes="440px"
                className="absolute left-[70px] top-[20px] w-[440px] drop-shadow-[0_30px_40px_rgb(36_37_40/0.2)]"
              />
              <RevenueCard className="absolute left-0 top-[12px]" />
              <YearToDateCard className="absolute left-0 top-[165px]" />
              <Ornament name="swirl-b" tone="lime" className="left-[340px] top-[120px] w-[145px]" />
              <HappyStudentsCard className="absolute left-[268px] top-[440px]" />
            </Stage>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-[32px] sm:text-[38px] lg:text-h-m">Create &amp; Manage Courses Easily.</h2>
            <p className="mt-8 max-w-[500px] text-body-m text-neutral-800">
              <strong className="font-medium text-neutral-950">ByteSpace</strong> supports individuals or entities in the creation,
              publication, and administration of educational courses.
            </p>
            <ul className="mt-6 space-y-3">
              {creatorPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 text-body-l text-neutral-950">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
