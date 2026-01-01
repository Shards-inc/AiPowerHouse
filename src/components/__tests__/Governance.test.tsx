import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Governance } from "../Governance.js";

describe("Governance", () => {
  it("renders section title and description", () => {
    render(<Governance />);
    expect(screen.getByText("Safety & governance")).toBeInTheDocument();
    expect(screen.getByText(/Built-in guardrails with audit trails/i)).toBeInTheDocument();
  });

  it("renders all governance controls", () => {
    render(<Governance />);
    expect(screen.getByText("Prompt firewall")).toBeInTheDocument();
    expect(screen.getByText("Human review loop")).toBeInTheDocument();
    expect(screen.getByText("Data residency")).toBeInTheDocument();
  });

  it("displays control statuses", () => {
    render(<Governance />);
    expect(screen.getByText("Enabled")).toBeInTheDocument();
    expect(screen.getByText("Queued")).toBeInTheDocument();
    expect(screen.getByText("Compliant")).toBeInTheDocument();
  });

  it("renders export button", () => {
    render(<Governance />);
    expect(screen.getByText("Export governance report")).toBeInTheDocument();
  });
});
