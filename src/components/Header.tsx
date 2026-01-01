import type { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20">
            <span className="text-lg font-semibold text-indigo-300">AI</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AiPowerHouse</p>
            <h1 className="text-lg font-semibold">Multi-model Command Center</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
            Workspace
          </button>
          <button className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
            Launch Session
          </button>
        </div>
      </div>
    </header>
  );
};
