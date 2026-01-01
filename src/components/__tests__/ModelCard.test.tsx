import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ModelCard } from "../ModelCard.js";
import type { AIModel } from "../../types/index.js";

const mockModel: AIModel = {
  id: "test-model",
  name: "Test Model",
  description: "A test AI model",
  status: "primary",
  reliability: 95,
  latency: 150,
  badgeColor: "indigo"
};

describe("ModelCard", () => {
  it("renders model information correctly", () => {
    render(<ModelCard model={mockModel} />);

    expect(screen.getByText("Test Model")).toBeInTheDocument();
    expect(screen.getByText("A test AI model")).toBeInTheDocument();
    expect(screen.getByText("Reliability 95%")).toBeInTheDocument();
    expect(screen.getByText("Latency 150ms")).toBeInTheDocument();
  });

  it("displays status badge", () => {
    render(<ModelCard model={mockModel} />);
    expect(screen.getByText("Primary")).toBeInTheDocument();
  });
});
