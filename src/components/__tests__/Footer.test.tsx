import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer.js";

describe("Footer", () => {
  it("renders copyright information", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 AiPowerHouse/i)).toBeInTheDocument();
  });

  it("renders service status", () => {
    render(<Footer />);
    expect(screen.getByText(/Service status: Operational/i)).toBeInTheDocument();
    expect(screen.getByText(/Last sync/i)).toBeInTheDocument();
  });
});
