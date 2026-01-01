import type { AIModel } from "../types/index.js";

export const AI_MODELS: AIModel[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Strategy, long-form reasoning, and natural conversation depth.",
    status: "primary",
    reliability: 98,
    latency: 148,
    badgeColor: "indigo"
  },
  {
    id: "claude",
    name: "Claude",
    description: "Long-context analysis, safe completions, and nuanced tone control.",
    status: "strong",
    reliability: 96,
    latency: 162,
    badgeColor: "emerald"
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Image + text synthesis with high-speed iteration for teams.",
    status: "multimodal",
    reliability: 94,
    latency: 138,
    badgeColor: "sky"
  },
  {
    id: "grok",
    name: "Grok",
    description: "Live data grounding with high-velocity conversational outputs.",
    status: "real-time",
    reliability: 90,
    latency: 171,
    badgeColor: "amber"
  },
  {
    id: "copilot",
    name: "Co Pilot",
    description: "Code acceleration, IDE copiloting, and developer workflows.",
    status: "dev",
    reliability: 92,
    latency: 156,
    badgeColor: "purple"
  },
  {
    id: "meta-ai",
    name: "Meta AI",
    description: "Social engagement and creative ideation across channels.",
    status: "social",
    reliability: 91,
    latency: 160,
    badgeColor: "pink"
  },
  {
    id: "manus-ai",
    name: "Manus AI",
    description: "Workflow automation with rapid orchestration for operations teams.",
    status: "ops",
    reliability: 93,
    latency: 149,
    badgeColor: "teal"
  },
  {
    id: "kimi",
    name: "Kimi",
    description: "High-precision summarization with multilingual coverage.",
    status: "summarize",
    reliability: 95,
    latency: 140,
    badgeColor: "lime"
  },
  {
    id: "qwen",
    name: "Qwen",
    description: "Structured reasoning for data-intensive analytical tasks.",
    status: "data",
    reliability: 93,
    latency: 152,
    badgeColor: "cyan"
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Fast retrieval-augmented workflows and research alignment.",
    status: "search",
    reliability: 92,
    latency: 158,
    badgeColor: "rose"
  },
  {
    id: "minimax",
    name: "Minimax",
    description: "Large-scale generation for production content pipelines.",
    status: "scale",
    reliability: 89,
    latency: 170,
    badgeColor: "orange"
  },
  {
    id: "genspark",
    name: "Genspark",
    description: "Guided research synthesis with adaptive sourcing.",
    status: "research",
    reliability: 91,
    latency: 164,
    badgeColor: "fuchsia"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "Cited answers and knowledge mapping for fast decisions.",
    status: "insight",
    reliability: 94,
    latency: 150,
    badgeColor: "slate"
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Lightweight deployments with tuned efficiency for teams.",
    status: "efficient",
    reliability: 93,
    latency: 145,
    badgeColor: "blue"
  }
];
