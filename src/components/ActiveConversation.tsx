export default function ActiveConversation() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-900/40 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active conversation</h3>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
          Live
        </span>
      </div>
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-slate-900/70 p-4">
          <p className="text-xs text-slate-400">User request</p>
          <p className="text-sm">
            Draft an onboarding sequence for a new fintech product launch.
          </p>
        </div>
        <div className="rounded-2xl bg-indigo-500/10 p-4">
          <p className="text-xs text-indigo-200">AI response</p>
          <p className="text-sm text-slate-200">
            Deploy a 4-step journey: value promise, compliance assurance, feature tour, and
            activation incentives.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-700 p-4">
          <p className="text-xs text-slate-400">Routing</p>
          <p className="text-sm">Consensus check across ChatGPT, Claude, and Gemini.</p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-2xl border border-slate-700 py-2 text-sm hover:bg-slate-800 transition-colors">
        Open full transcript
      </button>
    </div>
  );
}
