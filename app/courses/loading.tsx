import { CourseCardSkeleton } from "@/components/ui/CourseCard";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";

export default function Loading() {
  return (
    <main aria-busy="true">
      <PageHero>
        <div className="h-[330px] md:h-[366px]" />
      </PageHero>
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => <CourseCardSkeleton key={i} />)}
        </div>
      </Container>
    </main>
  );
}
