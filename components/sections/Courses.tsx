import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { CourseExplorer } from "@/components/sections/CourseExplorer";
import { courses } from "@/data/courses";

export function Courses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="scroll-mt-20 bg-white py-16 md:py-[64px]">
      <Container>
        <h2 id="courses-title" className="mx-auto max-w-[700px] text-center text-[30px] sm:text-[36px] lg:text-h-m">
          Discover Your Passion,<br className="hidden sm:block" /> Build Your Skills
        </h2>
        <p className="mx-auto mt-6 max-w-[830px] text-center text-body-m text-neutral-500">
          At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields,
          from technology to the arts, and make a difference in your career and life.
        </p>
        <Suspense
          fallback={
            <div className="mt-[190px] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          }
        >
          <CourseExplorer initialCourses={courses} />
        </Suspense>
      </Container>
    </section>
  );
}
