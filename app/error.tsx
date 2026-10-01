"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Logo } from "@/components/ui/Logo";

/** Route-level error boundary: shown when a page throws while rendering. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main">
      <PageHero>
        <Container className="flex min-h-screen flex-col items-center justify-center gap-6 py-24 text-center">
          <Logo markOnly />
          <h1 className="text-[32px] sm:text-h-m">Something went wrong</h1>
          <p className="max-w-[460px] text-body-m text-white">We couldn&apos;t load this page. Please try again, or head back to the homepage.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>Try again</Button>
            <Button href="/" variant="ghost">Back to Home</Button>
          </div>
        </Container>
      </PageHero>
    </main>
  );
}
