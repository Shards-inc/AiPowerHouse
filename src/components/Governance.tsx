import type { FC } from "react";
import { GOVERNANCE_CONTROLS } from "../data/governance.js";
import { getStatusColor, getBadgeColorClass } from "../utils/formatters.js";

export const Governance: FC = () => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h3 className="text-lg font-semibold">Safety & governance</h3>
      <p className="mt-2 text-sm text-slate-400">Built-in guardrails with audit trails and compliance snapshots.</p>
      <div className="mt-6 space-y-4">
        {GOVERNANCE_CONTROLS.map((control) => {
          const statusColor = getStatusColor(control.status);
          const badgeClass = getBadgeColorClass(statusColor);

          return (
            <div key={control.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{control.name}</p>
                <p className="text-xs text-slate-400">{control.description}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs ${badgeClass}`}>{control.status}</span>
            </div>
          );
        })}
        <button className="mt-6 w-full rounded-2xl border border-slate-700 py-2 text-sm">
          Export governance report
        </button>
      </div>
    </div>
  );
};
