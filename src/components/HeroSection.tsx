import type { FC } from "react";
import { DEFAULT_METRICS, LATENCY_CHANGE, TOP_ROUTE } from "../utils/constants.js";
import { formatLatency, formatTokenBurn, formatPercentage } from "../utils/formatters.js";

export const HeroSection: FC = () => {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Unified AI Hub</p>
          <h2 className="text-4xl font-semibold leading-tight text-white">
            Build, compare, and deploy across the most capable AI models in one workspace.
          </h2>
          <p className="text-slate-300">
            Orchestrate multi-model workflows with live routing, memory sync, and production-grade monitoring.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white">
            Start new pipeline
          </button>
          <button className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-100">
            View integrations
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Latency</p>
            <p className="text-2xl font-semibold text-white">{formatLatency(DEFAULT_METRICS.latency)}</p>
            <p className="text-xs text-emerald-300">{formatPercentage(LATENCY_CHANGE)} vs last week</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Token burn</p>
            <p className="text-2xl font-semibold text-white">{formatTokenBurn(DEFAULT_METRICS.tokenBurn)}</p>
            <p className="text-xs text-amber-300">Top route: {TOP_ROUTE}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk</p>
            <p className="text-2xl font-semibold text-white">{DEFAULT_METRICS.risk}</p>
            <p className="text-xs text-slate-400">Safety score {DEFAULT_METRICS.safetyScore}%</p>
          </div>
        </div>
      </div>

      <ActiveConversationCard />
    </section>
  );
};

const ActiveConversationCard: FC = () => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-900/40 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active conversation</h3>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">Live</span>
      </div>
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-slate-900/70 p-4">
          <p className="text-xs text-slate-400">User request</p>
          <p className="text-sm">Draft an onboarding sequence for a new fintech product launch.</p>
        </div>
        <div className="rounded-2xl bg-indigo-500/10 p-4">
          <p className="text-xs text-indigo-200">AI response</p>
          <p className="text-sm text-slate-200">
            Deploy a 4-step journey: value promise, compliance assurance, feature tour, and activation incentives.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-700 p-4">
          <p className="text-xs text-slate-400">Routing</p>
          <p className="text-sm">Consensus check across ChatGPT, Claude, and Gemini.</p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-2xl border border-slate-700 py-2 text-sm">
        Open full transcript
      </button>
    </div>
  );
};
