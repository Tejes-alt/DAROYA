'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, ChevronRight } from 'lucide-react';
import type { Mission } from '@/lib/data/types';

interface MissionNetworkProps {
  missions: Mission[];
  onSelectMission: (missionId: string) => void;
}

export default function MissionNetwork({
  missions,
  onSelectMission,
}: MissionNetworkProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group missions by destination/category
  const byCategory = missions.reduce(
    (acc, mission) => {
      const category = mission.destination || 'Other';

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(mission);
      return acc;
    },
    {} as Record<string, Mission[]>
  );

  const selectedMissions = selectedCategory
    ? byCategory[selectedCategory] ?? []
    : missions;

  const years = missions
    .map((mission) => mission.year)
    .filter((year): year is number => typeof year === 'number');

  const minYear = years.length ? Math.min(...years) : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <Network className="text-[#6366f1]" size={32} />

          <h2 className="text-4xl font-light tracking-wide text-white">
            Mission Network
          </h2>
        </div>

        <p className="text-white/60">
          Explore relationships across India&apos;s space missions
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded px-4 py-2 text-sm transition-all ${
            selectedCategory === null
              ? 'border border-[#6366f1] bg-[#6366f1]/20 text-[#6366f1]'
              : 'border border-white/10 bg-black/20 text-white/60 hover:border-white/30'
          }`}
        >
          All Missions
        </button>

        {Object.keys(byCategory).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded px-4 py-2 text-sm transition-all ${
              selectedCategory === category
                ? 'border border-[#6366f1] bg-[#6366f1]/20 text-[#6366f1]'
                : 'border border-white/10 bg-black/20 text-white/60 hover:border-white/30'
            }`}
          >
            {category} ({byCategory[category].length})
          </button>
        ))}
      </motion.div>

      {/* Mission Network */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border border-white/10 bg-black/40 p-8"
      >
        <div className="space-y-4">
          <div className="text-sm text-white/50">
            Displaying {selectedMissions.length} mission
            {selectedMissions.length !== 1 ? 's' : ''}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selectedMissions.map((mission, index) => (
              <motion.button
                key={mission.id}
                onClick={() => onSelectMission(mission.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-lg border border-white/10 bg-black/40 p-4 text-left transition-all hover:border-[#6366f1]/50 hover:bg-[#6366f1]/5"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 font-semibold text-white transition-colors group-hover:text-[#6366f1]">
                        {mission.name}
                      </h3>

                      <p className="mb-2 text-xs text-white/50">
                        {mission.destination}
                      </p>
                    </div>

                    <ChevronRight
                      className="flex-shrink-0 text-white/20 transition-colors group-hover:text-[#6366f1]"
                      size={16}
                    />
                  </div>

                  <div className="space-y-1 text-xs text-white/60">
                    {mission.year && (
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-mono">{mission.year}</span>
                      </div>
                    )}

                    {mission.launcher && (
                      <div className="flex justify-between gap-4">
                        <span>Launcher:</span>
                        <span className="text-right">
                          {mission.launcher}
                        </span>
                      </div>
                    )}

                    {mission.status && (
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span>{mission.status}</span>
                      </div>
                    )}

                    {mission.summary && (
                      <p className="line-clamp-2 pt-2">
                        {mission.summary}
                      </p>
                    )}
                  </div>

                  {/* Mission Tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {mission.destination && (
                      <span className="rounded bg-white/5 px-2 py-1 text-xs text-white/50">
                        {mission.destination}
                      </span>
                    )}

                    {mission.status && (
                      <span className="rounded bg-white/5 px-2 py-1 text-xs text-white/50">
                        {mission.status}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}

            {selectedMissions.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-white/30">
                No missions found in this category.
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <StatCard
          label="Total Missions"
          value={missions.length}
        />

        <StatCard
          label="Destinations"
          value={Object.keys(byCategory).length}
        />

        <StatCard
          label="Year Range"
          value={years.length ? `${minYear} - 2026` : '—'}
        />

        <StatCard
          label="Average Missions/Year"
          value={
            years.length
              ? Math.round(
                  missions.length / (2026 - minYear + 1)
                )
              : 0
          }
        />
      </motion.div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-white/10 bg-black/20 p-4 text-center"
    >
      <p className="mb-2 text-xs uppercase tracking-[0.1em] text-white/50">
        {label}
      </p>

      <p className="text-2xl font-light text-white">
        {value}
      </p>
    </motion.div>
  );
}