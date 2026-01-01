import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModelRoster } from "../ModelRoster.js";

describe("ModelRoster", () => {
  it("renders all models by default", () => {
    render(<ModelRoster />);
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("Gemini")).toBeInTheDocument();
  });

  it("filters models based on search query", async () => {
    const user = userEvent.setup();
    render(<ModelRoster />);

    const searchInput = screen.getByPlaceholderText("Search models");
    await user.type(searchInput, "ChatGPT");

    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.queryByText("Claude")).not.toBeInTheDocument();
  });

  it("displays section title and description", () => {
    render(<ModelRoster />);
    expect(screen.getByText("Model roster")).toBeInTheDocument();
    expect(
      screen.getByText("Curate, rank, and route tasks to specialized AI partners.")
    ).toBeInTheDocument();
  });
});
