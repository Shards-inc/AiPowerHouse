import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection.js";

describe("HeroSection", () => {
  it("renders hero title and description", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Build, compare, and deploy across the most capable AI models/i)
    ).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText("Start new pipeline")).toBeInTheDocument();
    expect(screen.getByText("View integrations")).toBeInTheDocument();
  });

  it("renders metrics cards", () => {
    render(<HeroSection />);
    expect(screen.getByText("Latency")).toBeInTheDocument();
    expect(screen.getByText("Token burn")).toBeInTheDocument();
    expect(screen.getByText("Risk")).toBeInTheDocument();
  });

  it("renders active conversation card", () => {
    render(<HeroSection />);
    expect(screen.getByText("Active conversation")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
  });
});
