'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, ChevronRight } from 'lucide-react';
import { spacecraft } from '@/data/spacecraft';
import { missions } from '@/data/missions';
import { launchers } from '@/data/launchers';
import { launches } from '@/data/launches';
import type { SearchSelection } from '@/components/explorer/Search';

interface ArchiveInterfaceProps {
  onSelect: (selection: SearchSelection) => void;
}

export default function ArchiveInterface({ onSelect }: ArchiveInterfaceProps) {
  const [query, setQuery] = useState('');
  const [entityType, setEntityType] = useState<'all' | 'spacecraft' | 'missions' | 'launchers' | 'launches'>(
    'all'
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    const filterSpacecraft = spacecraft.filter((s) =>
      `${s.name} ${s.category} ${s.orbit}`.toLowerCase().includes(q)
    );
    const filterMissions = missions.filter((m) =>
      `${m.name} ${m.destination}`.toLowerCase().includes(q)
    );
    const filterLaunchers = launchers.filter((l) =>
      `${l.name}`.toLowerCase().includes(q)
    );
    const filterLaunches = launches.filter((l) =>
      `${l.vehicle} ${l.payload}`.toLowerCase().includes(q)
    );

    return {
      spacecraft: entityType === 'all' || entityType === 'spacecraft' ? filterSpacecraft : [],
      missions: entityType === 'all' || entityType === 'missions' ? filterMissions : [],
      launchers: entityType === 'all' || entityType === 'launchers' ? filterLaunchers : [],
      launches: entityType === 'all' || entityType === 'launches' ? filterLaunches : [],
    };
  }, [query, entityType]);

  const hasResults =
    filtered.spacecraft.length > 0 ||
    filtered.missions.length > 0 ||
    filtered.launchers.length > 0 ||
    filtered.launches.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-4xl font-light tracking-wide text-white">Archive</h2>
        <p className="text-white/60">
          Search and explore India's space program comprehensive database
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="relative bg-black/40 border border-white/10 rounded-lg overflow-hidden">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input
            type="text"
            placeholder="Search spacecraft, missions, launchers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
            autoFocus
          />
        </div>
      </motion.div>

      {/* Entity Type Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 flex-wrap"
      >
        {[
          { value: 'all', label: 'All' },
          { value: 'spacecraft', label: 'Spacecraft' },
          { value: 'missions', label: 'Missions' },
          { value: 'launchers', label: 'Launchers' },
          { value: 'launches', label: 'Launches' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setEntityType(value as typeof entityType)}
            className={`px-3 py-2 rounded text-sm transition-all ${
              entityType === value
                ? 'bg-[#e4a25b]/20 text-[#e4a25b] border border-[#e4a25b]'
                : 'bg-black/20 text-white/60 border border-white/10 hover:border-white/30'
            }`}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Results */}
      {!query ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/20 border border-white/10 rounded-lg p-8 text-center"
        >
          <p className="text-white/60">Enter a search query to explore the archive</p>
        </motion.div>
      ) : !hasResults ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/20 border border-white/10 rounded-lg p-8 text-center"
        >
          <p className="text-white/60">No results found for "{query}"</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Spacecraft Results */}
          {filtered.spacecraft.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4">
                Spacecraft ({filtered.spacecraft.length})
              </h3>
              <div className="grid gap-2">
                {filtered.spacecraft.slice(0, 6).map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => onSelect({ kind: 'spacecraft', id: s.id })}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-left p-3 rounded-lg bg-black/20 border border-white/10 hover:border-[#e4a25b]/50 hover:bg-[#e4a25b]/5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white group-hover:text-[#e4a25b] transition-colors">
                          {s.name}
                        </p>
                        <p className="text-xs text-white/50">
                          {s.category} • {s.year}
                        </p>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-[#e4a25b] transition-colors" size={16} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Missions Results */}
          {filtered.missions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4">
                Missions ({filtered.missions.length})
              </h3>
              <div className="grid gap-2">
                {filtered.missions.slice(0, 6).map((m, i) => (
                  <motion.button
                    key={m.id}
                    onClick={() => onSelect({ kind: 'mission', id: m.id })}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-left p-3 rounded-lg bg-black/20 border border-white/10 hover:border-[#6366f1]/50 hover:bg-[#6366f1]/5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white group-hover:text-[#6366f1] transition-colors">
                          {m.name}
                        </p>
                        <p className="text-xs text-white/50">
                          {m.destination} • {m.year}
                        </p>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-[#6366f1] transition-colors" size={16} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Launchers Results */}
          {filtered.launchers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4">
                Launchers ({filtered.launchers.length})
              </h3>
              <div className="grid gap-2">
                {filtered.launchers.slice(0, 6).map((l, i) => (
                  <motion.button
                    key={l.id}
                    onClick={() => onSelect({ kind: 'launcher', id: l.id })}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-left p-3 rounded-lg bg-black/20 border border-white/10 hover:border-[#22c55e]/50 hover:bg-[#22c55e]/5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white group-hover:text-[#22c55e] transition-colors">
                          {l.name}
                        </p>
                        <p className="text-xs text-white/50">
                          {l.stages} stages {l.payload_to_leo ? `• ${l.payload_to_leo}kg to LEO` : ""}
                        </p>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-[#22c55e] transition-colors" size={16} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Launches Results */}
          {filtered.launches.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4">
                Launches ({filtered.launches.length})
              </h3>
              <div className="grid gap-2">
                {filtered.launches.slice(0, 6).map((l, i) => (
                  <motion.div
                    key={`${l.date}-${l.vehicle}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-3 rounded-lg bg-black/20 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{l.vehicle}</p>
                        <p className="text-xs text-white/50">
                          {new Date(l.date).toLocaleDateString()} • {l.payload}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        l.outcome === "Success"
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {l.outcome === "Success" ? 'Success' : 'Unsuccessful'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
