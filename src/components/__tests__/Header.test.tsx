import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header.js";

describe("Header", () => {
  it("renders application title", () => {
    render(<Header />);
    expect(screen.getByText("AiPowerHouse")).toBeInTheDocument();
    expect(screen.getByText("Multi-model Command Center")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<Header />);
    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByText("Launch Session")).toBeInTheDocument();
  });

  it("renders AI logo", () => {
    render(<Header />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });
});
