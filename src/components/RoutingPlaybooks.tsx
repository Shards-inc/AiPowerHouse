export default function RoutingPlaybooks() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h3 className="text-lg font-semibold">Routing playbooks</h3>
      <p className="mt-2 text-sm text-slate-400">
        Drag-and-drop pipelines for automated switching, fallback, and safety checks.
      </p>
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Launch readiness</p>
            <span className="text-xs text-emerald-300">Safe</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            ChatGPT → Claude → Gemini (confidence &gt; 0.86)
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Ops escalation</p>
            <span className="text-xs text-amber-300">Monitor</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Grok → Perplexity → DeepSeek (live data routed)
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Developer copilot</p>
            <span className="text-xs text-indigo-300">Optimized</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Co Pilot → Qwen → Mistral (code + docs coverage)
          </p>
        </div>
      </div>
    </div>
  );
}
