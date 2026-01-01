import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App.js";

describe("App", () => {
  it("renders the complete application", () => {
    render(<App />);

    // Check header
    expect(screen.getByText("AiPowerHouse")).toBeInTheDocument();

    // Check main sections
    expect(screen.getByText("Model roster")).toBeInTheDocument();
    expect(screen.getByText("Routing playbooks")).toBeInTheDocument();
    expect(screen.getByText("Safety & governance")).toBeInTheDocument();

    // Check footer
    expect(screen.getByText(/© 2025 AiPowerHouse/i)).toBeInTheDocument();
  });

  it("renders all model cards", () => {
    render(<App />);
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("Gemini")).toBeInTheDocument();
  });
});
