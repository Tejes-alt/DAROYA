"use client";

import { useMemo, useState } from "react";
import { people } from "@/data/people";
import type { PersonCategory } from "@/data/people";

const categories: (PersonCategory | "All")[] = ["All", "Pioneer", "Programme Leader", "Scientist", "Engineer"];

interface PeopleExplorerProps {
  onSelect: (id: string) => void;
}

/**
 * The people layer (spec §24): verified contributors connected to
 * programmes and centres through the knowledge graph. No quotes are
 * invented — every note is a documented role or milestone.
 */
export default function PeopleExplorer({ onSelect }: PeopleExplorerProps) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (category === "All" ? people : people.filter((p) => p.category === category)),
    [category]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-2 text-[8px] uppercase tracking-[.16em] transition ${
              category === c ? "border-[#e4a25b]/60 bg-[#e4a25b]/10 text-[#e4a25b]" : "border-white/10 text-white/35 hover:text-white/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
        {filtered.map((p) => (
          <button key={p.id} onClick={() => onSelect(p.id)} className="group bg-[#04060a] p-6 text-left transition hover:bg-[#080b12] md:p-8">
            <div className="mono text-[8px] tracking-[.22em] text-[#e4a25b]">{p.years} · {p.category.toUpperCase()}</div>
            <h3 className="serif mt-2 text-2xl md:text-3xl">{p.name}</h3>
            <div className="mt-2 text-xs text-white/45">{p.role}</div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/32">{p.note}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
