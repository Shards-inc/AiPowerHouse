export default function Footer() {
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-6 py-6">
        <p className="text-xs text-slate-500">
          © 2025 AiPowerHouse. Built for multi-model orchestration.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>Service status: Operational</span>
          <span>Last sync 2m ago</span>
        </div>
      </div>
    </footer>
  );
}
