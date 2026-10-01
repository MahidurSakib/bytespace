import { Categories } from "@/components/sections/Categories";
import { Courses } from "@/components/sections/Courses";
import { CreatorCta } from "@/components/sections/CreatorCta";
import { Growth } from "@/components/sections/Growth";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Partners />
        <Courses />
        <Categories />
        <Growth />
        <CreatorCta />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
