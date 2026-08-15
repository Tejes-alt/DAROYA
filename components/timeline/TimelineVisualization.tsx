'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Launch } from '@/lib/data/types';

interface TimelineVisualizationProps {
  activeYear: number;
  onYearChange: (year: number) => void;
  launches: Launch[];
}

const TIMELINE_START = 1975;
const TIMELINE_END = 2026;

export default function TimelineVisualization({
  activeYear,
  onYearChange,
  launches,
}: TimelineVisualizationProps) {
  const years = Array.from(
    { length: TIMELINE_END - TIMELINE_START + 1 },
    (_, i) => TIMELINE_START + i
  );

  const getYearStats = (year: number) => {
    const yearLaunches = launches.filter((l) => l.year === year);
    return {
      launches: yearLaunches.length,
      successful: yearLaunches.filter((l) => l.outcome === "Success").length,
    };
  };

  const handleYearClick = (year: number) => {
    onYearChange(year);
  };

  const handlePrevious = () => {
    onYearChange(Math.max(TIMELINE_START, activeYear - 1));
  };

  const handleNext = () => {
    onYearChange(Math.min(TIMELINE_END, activeYear + 1));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-4xl font-light tracking-wide text-white">
          Timeline
        </h2>
        <p className="text-white/60">
          Scrub through India's space journey: {TIMELINE_START} – {TIMELINE_END}
        </p>
      </motion.div>

      {/* Year Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-black/40 border border-white/10 rounded-lg p-8"
      >
        <div className="space-y-4">
          {/* Current Year Display */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Active Year</p>
              <p className="text-6xl font-light text-[#e4a25b]">{activeYear}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/60">
                {getYearStats(activeYear).launches} launches
              </p>
              <p className="text-sm text-white/60">
                {getYearStats(activeYear).successful} successful
              </p>
            </div>
          </div>

          {/* Interactive Timeline Slider */}
          <div className="space-y-3 mt-8">
            <input
              type="range"
              min={TIMELINE_START}
              max={TIMELINE_END}
              value={activeYear}
              onChange={(e) => handleYearClick(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e4a25b] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#e4a25b] [&::-moz-range-thumb]:border-0"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">{TIMELINE_START}</span>
              <span className="text-xs text-white/40">{TIMELINE_END}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={handlePrevious}
              disabled={activeYear === TIMELINE_START}
              className="p-2 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeYear === TIMELINE_END}
              className="p-2 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Timeline Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-sm uppercase tracking-[0.2em] text-white/50">
          Historical Markers
        </h3>

        <div className="space-y-2">
          <TimelineMarker
            year={1975}
            title="Aryabhata"
            description="India's first satellite"
            active={activeYear === 1975}
            onClick={() => handleYearClick(1975)}
          />
          <TimelineMarker
            year={1980}
            title="Rohini RS-1"
            description="First Indian launch success"
            active={activeYear === 1980}
            onClick={() => handleYearClick(1980)}
          />
          <TimelineMarker
            year={1994}
            title="PSLV-D1"
            description="First PSLV launch"
            active={activeYear === 1994}
            onClick={() => handleYearClick(1994)}
          />
          <TimelineMarker
            year={2008}
            title="Chandrayaan-1"
            description="First lunar mission"
            active={activeYear === 2008}
            onClick={() => handleYearClick(2008)}
          />
          <TimelineMarker
            year={2013}
            title="Mangalyaan"
            description="Mars Orbiter Mission"
            active={activeYear === 2013}
            onClick={() => handleYearClick(2013)}
          />
          <TimelineMarker
            year={2023}
            title="Chandrayaan-3"
            description="Successful lunar landing"
            active={activeYear === 2023}
            onClick={() => handleYearClick(2023)}
          />
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatCard
          label="Total Years"
          value={TIMELINE_END - TIMELINE_START + 1}
        />
        <StatCard
          label="Cumulative Launches"
          value={launches.length}
        />
        <StatCard
          label="Peak Launch Year"
          value={Math.max(...Array.from(
            { length: TIMELINE_END - TIMELINE_START + 1 },
            (_, i) => TIMELINE_START + i
          ), ...launches.map((l) => l.year))}
        />
        <StatCard
          label="Success Rate"
          value={launches.length > 0 ? `${Math.round(
            (launches.filter((l) => l.outcome === "Success").length / launches.length) * 100
          )}%` : "Data unavailable"}
        />
      </motion.div>
    </div>
  );
}

function TimelineMarker({
  year,
  title,
  description,
  active,
  onClick,
}: {
  year: number;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        active
          ? 'bg-[#e4a25b]/10 border-[#e4a25b]'
          : 'bg-black/20 border-white/10 hover:border-white/30'
      }`}
      whileHover={{ x: 8 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`font-semibold ${active ? 'text-[#e4a25b]' : 'text-white'}`}>
            {title}
          </p>
          <p className="text-sm text-white/60">{description}</p>
        </div>
        <p className="text-xs text-white/40 font-mono">{year}</p>
      </div>
    </motion.button>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 border border-white/10 rounded-lg p-4 text-center"
    >
      <p className="text-xs uppercase tracking-[0.1em] text-white/50 mb-2">{label}</p>
      <p className="text-2xl font-light text-white">{value}</p>
    </motion.div>
  );
}
