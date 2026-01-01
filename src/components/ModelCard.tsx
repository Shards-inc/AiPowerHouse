import type { FC } from "react";
import type { AIModel } from "../types/index.js";
import { getBadgeColorClass } from "../utils/formatters.js";
import { formatLatency } from "../utils/formatters.js";

interface ModelCardProps {
  model: AIModel;
}

export const ModelCard: FC<ModelCardProps> = ({ model }) => {
  const badgeClass = getBadgeColorClass(model.badgeColor);
  const statusLabel = model.status.charAt(0).toUpperCase() + model.status.slice(1).replace(/-/g, " ");

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">{model.name}</h4>
        <span className={`rounded-full px-2 py-1 text-xs ${badgeClass}`}>{statusLabel}</span>
      </div>
      <p className="mt-3 text-sm text-slate-400">{model.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>Reliability {model.reliability}%</span>
        <span>Latency {formatLatency(model.latency)}</span>
      </div>
    </article>
  );
};
