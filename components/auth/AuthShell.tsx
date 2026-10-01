import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { HappyStudentsCard } from "@/components/ui/StatCards";
import { Logo } from "@/components/ui/Logo";
import { Ornament } from "@/components/ui/Ornament";
import { courses } from "@/data/courses";

export function AuthShell({ heading, text, children }: { heading: string; text: string; children: React.ReactNode }) {
  return (
    <main id="main" className="on-blue relative min-h-screen overflow-hidden bg-blue-800 bg-grid text-white">
      <Container className="relative pb-12 pt-8 lg:pt-[50px]">
        <Logo markOnly />
        <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[1fr_579px] lg:gap-12">
          <div className="hidden lg:block">
            <h2 className="text-h-xs">{heading}</h2>
            <p className="mt-4 max-w-[420px] text-body-m text-white">{text}</p>

            <div className="relative mt-[96px] h-[560px] w-[500px]" aria-hidden="true">
              <CourseCard course={courses[1]} className="absolute left-0 top-[87px] w-[372px]" />
              <CourseCard course={courses[2]} className="absolute left-[114px] top-0 w-[372px] shadow-card" />
              <Ornament name="torus" tone="lime" className="left-[52px] top-[41px] w-[104px]" />
              <Ornament name="pyramid" tone="lime" className="left-0 top-[415px] w-[126px]" />
              <Ornament name="swirl-b" tone="white" className="left-[383px] top-[351px] w-[116px]" />
              <HappyStudentsCard tone="lime" className="absolute left-[228px] top-[433px]" />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[579px] rounded-3xl bg-white p-6 text-neutral-950 shadow-card sm:p-10 lg:mx-0 lg:min-h-[785px] lg:p-[44px] flex flex-col">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}

export function AuthNotice({ kind, children }: { kind: "success" | "error" | "info"; children: React.ReactNode }) {
  const tone = { success: "bg-lime-100 text-lime-900", error: "bg-red-50 text-red-700", info: "bg-blue-50 text-blue-900" }[kind];
  return (
    <p role={kind === "error" ? "alert" : "status"} className={`mt-4 rounded-xl px-4 py-3 text-body-s ${tone}`}>
      {children}
    </p>
  );
}
