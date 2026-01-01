const MODELS = [
  { name: 'ChatGPT', tag: 'Primary', tagColor: 'text-indigo-200 bg-indigo-500/20', desc: 'Strategy, long-form reasoning, and natural conversation depth.', rel: '98%', lat: '148ms' },
  { name: 'Claude', tag: 'Strong', tagColor: 'text-emerald-200 bg-emerald-500/20', desc: 'Long-context analysis, safe completions, and nuanced tone control.', rel: '96%', lat: '162ms' },
  { name: 'Gemini', tag: 'Multimodal', tagColor: 'text-sky-200 bg-sky-500/20', desc: 'Image + text synthesis with high-speed iteration for teams.', rel: '94%', lat: '138ms' },
  { name: 'Grok', tag: 'Real-time', tagColor: 'text-amber-200 bg-amber-500/20', desc: 'Live data grounding with high-velocity conversational outputs.', rel: '90%', lat: '171ms' },
  { name: 'Co Pilot', tag: 'Dev', tagColor: 'text-purple-200 bg-purple-500/20', desc: 'Code acceleration, IDE copiloting, and developer workflows.', rel: '92%', lat: '156ms' },
  { name: 'Meta AI', tag: 'Social', tagColor: 'text-pink-200 bg-pink-500/20', desc: 'Social engagement and creative ideation across channels.', rel: '91%', lat: '160ms' },
  { name: 'Manus AI', tag: 'Ops', tagColor: 'text-teal-200 bg-teal-500/20', desc: 'Workflow automation with rapid orchestration for operations teams.', rel: '93%', lat: '149ms' },
  { name: 'Kimi', tag: 'Summarize', tagColor: 'text-lime-200 bg-lime-500/20', desc: 'High-precision summarization with multilingual coverage.', rel: '95%', lat: '140ms' },
  { name: 'Qwen', tag: 'Data', tagColor: 'text-cyan-200 bg-cyan-500/20', desc: 'Structured reasoning for data-intensive analytical tasks.', rel: '93%', lat: '152ms' },
  { name: 'DeepSeek', tag: 'Search', tagColor: 'text-rose-200 bg-rose-500/20', desc: 'Fast retrieval-augmented workflows and research alignment.', rel: '92%', lat: '158ms' },
  { name: 'Minimax', tag: 'Scale', tagColor: 'text-orange-200 bg-orange-500/20', desc: 'Large-scale generation for production content pipelines.', rel: '89%', lat: '170ms' },
  { name: 'Genspark', tag: 'Research', tagColor: 'text-fuchsia-200 bg-fuchsia-500/20', desc: 'Guided research synthesis with adaptive sourcing.', rel: '91%', lat: '164ms' },
  { name: 'Perplexity', tag: 'Insight', tagColor: 'text-slate-200 bg-slate-200/20', desc: 'Cited answers and knowledge mapping for fast decisions.', rel: '94%', lat: '150ms' },
  { name: 'Mistral', tag: 'Efficient', tagColor: 'text-blue-200 bg-blue-500/20', desc: 'Lightweight deployments with tuned efficiency for teams.', rel: '93%', lat: '145ms' },
];

export default function ModelRoster() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Model roster</h3>
          <p className="text-sm text-slate-400">
            Curate, rank, and route tasks to specialized AI partners.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Search models"
            type="text"
          />
          <button className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 transition-colors">
            Filters
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MODELS.map((model) => (
          <article key={model.name} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:bg-slate-900/60 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{model.name}</h4>
              <span className={`rounded-full px-2 py-1 text-xs ${model.tagColor}`}>
                {model.tag}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {model.desc}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Reliability {model.rel}</span>
              <span>Latency {model.lat}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
