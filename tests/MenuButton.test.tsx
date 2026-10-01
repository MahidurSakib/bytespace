import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuButton } from "@/components/ui/MenuButton";

const options = [{ value: "", label: "All levels" }, { value: "Beginner", label: "Beginner" }];

describe("MenuButton", () => {
  it("opens, selects an option and closes", async () => {
    const onChange = vi.fn();
    render(<MenuButton label="Level" options={options} value="" onChange={onChange} />);
    const trigger = screen.getByRole("button", { name: /level/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("menuitemradio", { name: "Beginner" }));
    expect(onChange).toHaveBeenCalledWith("Beginner");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<MenuButton label="Level" options={options} value="" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: /level/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
