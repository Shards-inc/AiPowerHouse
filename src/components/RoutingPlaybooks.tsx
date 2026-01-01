import type { FC } from "react";
import { ROUTING_PLAYBOOKS } from "../data/playbooks.js";
import { getStatusColor, getBadgeColorClass } from "../utils/formatters.js";

export const RoutingPlaybooks: FC = () => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h3 className="text-lg font-semibold">Routing playbooks</h3>
      <p className="mt-2 text-sm text-slate-400">
        Drag-and-drop pipelines for automated switching, fallback, and safety checks.
      </p>
      <div className="mt-6 space-y-4">
        {ROUTING_PLAYBOOKS.map((playbook) => {
          const statusColor = getStatusColor(playbook.status);
          const badgeClass = getBadgeColorClass(statusColor);

          return (
            <div key={playbook.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{playbook.name}</p>
                <span className={`rounded-full px-2 py-1 text-xs ${badgeClass}`}>{playbook.status}</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{playbook.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
