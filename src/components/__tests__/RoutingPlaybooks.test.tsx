import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RoutingPlaybooks } from "../RoutingPlaybooks.js";

describe("RoutingPlaybooks", () => {
  it("renders section title and description", () => {
    render(<RoutingPlaybooks />);
    expect(screen.getByText("Routing playbooks")).toBeInTheDocument();
    expect(
      screen.getByText(/Drag-and-drop pipelines for automated switching/i)
    ).toBeInTheDocument();
  });

  it("renders all playbooks", () => {
    render(<RoutingPlaybooks />);
    expect(screen.getByText("Launch readiness")).toBeInTheDocument();
    expect(screen.getByText("Ops escalation")).toBeInTheDocument();
    expect(screen.getByText("Developer copilot")).toBeInTheDocument();
  });

  it("displays playbook statuses", () => {
    render(<RoutingPlaybooks />);
    expect(screen.getByText("Safe")).toBeInTheDocument();
    expect(screen.getByText("Monitor")).toBeInTheDocument();
    expect(screen.getByText("Optimized")).toBeInTheDocument();
  });
});
