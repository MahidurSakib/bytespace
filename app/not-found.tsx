import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero>
          <Container className="flex min-h-[640px] flex-col items-center justify-center py-28 text-center md:min-h-[979px]">
            <p
              aria-hidden="true"
              className="select-none bg-gradient-to-b from-lime-400 from-25% to-lime-400/0 to-95% bg-clip-text font-heading text-[150px] font-bold leading-[0.9] text-transparent sm:text-[260px] md:text-[360px] lg:text-[440px]"
            >
              404
            </p>
            <h1 className="relative -mt-10 max-w-[940px] text-[32px] sm:-mt-16 sm:text-[44px] md:-mt-24 lg:-mt-32 lg:text-h-l">
              The page you are looking for doesn&rsquo;t exist
            </h1>
            <p className="mt-7 max-w-[520px] text-body-m text-white">Try to use a correct url or go back to homepage to start again</p>
            <Button href="/" size="lg" className="mt-8">Back to Home</Button>
          </Container>
        </PageHero>
      </main>
      <Footer />
    </>
  );
}
