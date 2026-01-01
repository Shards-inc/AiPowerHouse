import { describe, it, expect } from "vitest";
import { formatLatency, formatTokenBurn, formatPercentage, getStatusColor, getBadgeColorClass } from "../formatters.js";

describe("formatters", () => {
  describe("formatLatency", () => {
    it("formats latency in milliseconds", () => {
      expect(formatLatency(142)).toBe("142ms");
      expect(formatLatency(0)).toBe("0ms");
    });
  });

  describe("formatTokenBurn", () => {
    it("formats token burn in millions", () => {
      expect(formatTokenBurn(4.2)).toBe("4.2M");
      expect(formatTokenBurn(1)).toBe("1M");
    });
  });

  describe("formatPercentage", () => {
    it("formats positive percentages with plus sign", () => {
      expect(formatPercentage(18)).toBe("+18%");
    });

    it("formats negative percentages correctly", () => {
      expect(formatPercentage(-18)).toBe("-18%");
    });

    it("formats zero correctly", () => {
      expect(formatPercentage(0)).toBe("+0%");
    });
  });

  describe("getStatusColor", () => {
    it("returns correct color for known statuses", () => {
      expect(getStatusColor("Safe")).toBe("emerald");
      expect(getStatusColor("Monitor")).toBe("amber");
      expect(getStatusColor("Optimized")).toBe("indigo");
    });

    it("returns default color for unknown status", () => {
      expect(getStatusColor("Unknown")).toBe("slate");
    });
  });

  describe("getBadgeColorClass", () => {
    it("returns correct Tailwind classes for colors", () => {
      expect(getBadgeColorClass("indigo")).toContain("indigo");
      expect(getBadgeColorClass("emerald")).toContain("emerald");
    });

    it("returns default classes for unknown color", () => {
      expect(getBadgeColorClass("unknown")).toContain("slate");
    });
  });
});
