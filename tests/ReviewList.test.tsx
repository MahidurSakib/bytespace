import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReviewList } from "@/components/course/ReviewList";
import { getCourseDetail } from "@/data/course-details";

const reviews = getCourseDetail("digital-asset")!.reviews;

describe("ReviewList", () => {
  it("shows every review under All rating", () => {
    render(<ReviewList reviews={reviews} />);
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("shows an empty state for a rating with no reviews", async () => {
    render(<ReviewList reviews={reviews} />);
    await userEvent.click(screen.getByRole("button", { name: /3 star/i }));
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText(/no 3-star reviews/i)).toBeInTheDocument();
  });

  it("filters to 5-star reviews and marks the active pill", async () => {
    render(<ReviewList reviews={reviews} />);
    const five = screen.getByRole("button", { name: /5 star/i });
    await userEvent.click(five);
    expect(five).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });
});
