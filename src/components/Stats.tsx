export default function Stats() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Unified AI Hub</p>
        <h2 className="text-4xl font-semibold leading-tight text-white">
          Build, compare, and deploy across the most capable AI models in one workspace.
        </h2>
        <p className="text-slate-300">
          Orchestrate multi-model workflows with live routing, memory sync, and
          production-grade monitoring.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors">
          Start new pipeline
        </button>
        <button className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-100 hover:bg-slate-800 transition-colors">
          View integrations
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Latency</p>
          <p className="text-2xl font-semibold text-white">142ms</p>
          <p className="text-xs text-emerald-300">-18% vs last week</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Token burn</p>
          <p className="text-2xl font-semibold text-white">4.2M</p>
          <p className="text-xs text-amber-300">Top route: ChatGPT</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk</p>
          <p className="text-2xl font-semibold text-white">Low</p>
          <p className="text-xs text-slate-400">Safety score 98%</p>
        </div>
      </div>
    </div>
  );
}
