/**
 * Utility functions for formatting data
 */

export const formatLatency = (ms: number): string => {
  return `${ms}ms`;
};

export const formatTokenBurn = (millions: number): string => {
  return `${millions}M`;
};

export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value}%`;
};

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    Safe: "emerald",
    Monitor: "amber",
    Optimized: "indigo",
    Enabled: "emerald",
    Queued: "amber",
    Compliant: "slate"
  };
  return colorMap[status] || "slate";
};

export const getBadgeColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-500/20 text-indigo-200",
    emerald: "bg-emerald-500/20 text-emerald-200",
    sky: "bg-sky-500/20 text-sky-200",
    amber: "bg-amber-500/20 text-amber-200",
    purple: "bg-purple-500/20 text-purple-200",
    pink: "bg-pink-500/20 text-pink-200",
    teal: "bg-teal-500/20 text-teal-200",
    lime: "bg-lime-500/20 text-lime-200",
    cyan: "bg-cyan-500/20 text-cyan-200",
    rose: "bg-rose-500/20 text-rose-200",
    orange: "bg-orange-500/20 text-orange-200",
    fuchsia: "bg-fuchsia-500/20 text-fuchsia-200",
    slate: "bg-slate-200/20 text-slate-200",
    blue: "bg-blue-500/20 text-blue-200"
  };
  return colorMap[color] || "bg-slate-500/20 text-slate-200";
};
