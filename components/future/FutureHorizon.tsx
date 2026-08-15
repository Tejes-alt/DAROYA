"use client";

import { futureProgrammes, type FutureStatus } from "@/data/future";

interface FutureHorizonProps {
  onSelect: (id: string) => void;
}

const STATUS_ORDER: FutureStatus[] = ["Approved", "Under development", "Planned", "Conceptual"];

const STATUS_TONE: Record<FutureStatus, string> = {
  Approved: "text-[#9fd8b0] border-[#9fd8b0]/30",
  "Under development": "text-[#e4a25b] border-[#e4a25b]/30",
  Planned: "text-[#5b9bd5] border-[#5b9bd5]/30",
  Conceptual: "text-white/45 border-white/15",
};

/**
 * The 2047 horizon layer (spec §27). Every programme is tagged with
 * an explicit status so an announced aspiration is never presented
 * as completed — Approved / Under development / Planned / Conceptual,
 * ordered from most to least certain.
 */
export default function FutureHorizon({ onSelect }: FutureHorizonProps) {
  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: futureProgrammes.filter((f) => f.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {grouped.map((group) => (
        <div key={group.status}>
          <div className={`mono inline-block rounded-full border px-3 py-1.5 text-[8px] uppercase tracking-[.2em] ${STATUS_TONE[group.status]}`}>
            {group.status}
          </div>
          <div className="mt-4 space-y-px border border-white/10 bg-white/10">
            {group.items.map((f) => (
              <button
                key={f.id}
                onClick={() => onSelect(f.id)}
                className="block w-full bg-[#04060a] p-6 text-left transition hover:bg-[#0a0d14]"
              >
                <div className="text-lg text-white/80">{f.name}</div>
                <div className="mono mt-2 text-[8px] tracking-[.18em] text-white/30">{f.targetYear}</div>
                <p className="mt-3 text-xs leading-6 text-white/35">{f.summary}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
