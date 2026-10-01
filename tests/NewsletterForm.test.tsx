import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

afterEach(() => vi.restoreAllMocks());

describe("NewsletterForm", () => {
  it("shows a validation error for an invalid email and does not call the API", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<NewsletterForm />);
    await userEvent.type(screen.getByLabelText(/email address/i), "not-an-email");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows the success message after subscribing", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ message: "Thanks for subscribing!" }), { status: 200 }));
    render(<NewsletterForm />);
    await userEvent.type(screen.getByLabelText(/email address/i), "fan@example.com");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(await screen.findByRole("status")).toHaveTextContent(/thanks for subscribing/i);
  });

  it("shows an error when the network fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));
    render(<NewsletterForm />);
    await userEvent.type(screen.getByLabelText(/email address/i), "fan@example.com");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/network error/i);
  });
});
