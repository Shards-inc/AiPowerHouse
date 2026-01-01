export default function SafetyGovernance() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h3 className="text-lg font-semibold">Safety & governance</h3>
      <p className="mt-2 text-sm text-slate-400">
        Built-in guardrails with audit trails and compliance snapshots.
      </p>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Prompt firewall</p>
            <p className="text-xs text-slate-400">PII redaction and policy tags</p>
          </div>
          <span className="text-xs text-emerald-300">Enabled</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Human review loop</p>
            <p className="text-xs text-slate-400">Approval gates for high-risk flows</p>
          </div>
          <span className="text-xs text-amber-300">Queued</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Data residency</p>
            <p className="text-xs text-slate-400">Region: us-central1</p>
          </div>
          <span className="text-xs text-slate-200">Compliant</span>
        </div>
        <button className="mt-6 w-full rounded-2xl border border-slate-700 py-2 text-sm hover:bg-slate-800 transition-colors">
          Export governance report
        </button>
      </div>
    </div>
  );
}
