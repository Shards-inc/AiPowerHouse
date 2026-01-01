import type { FC } from "react";
import { useState } from "react";
import { AI_MODELS } from "../data/models.js";
import { ModelCard } from "./ModelCard.js";

export const ModelRoster: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = AI_MODELS.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Model roster</h3>
          <p className="text-sm text-slate-400">Curate, rank, and route tasks to specialized AI partners.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200"
            placeholder="Search models"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-200">
            Filters
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </section>
  );
};
