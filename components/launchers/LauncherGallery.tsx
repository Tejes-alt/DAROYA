'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import type { Launcher } from '@/lib/data/types';

interface LauncherGalleryProps {
  launchers: Launcher[];
  onSelect: (launcherId: string) => void;
}

const formatNumber = (n: number | null | undefined): string => {
  if (n === null || n === undefined) return 'N/A';
  return n.toLocaleString();
};

const formatPercentage = (p: number | null | undefined): string => {
  if (p === null || p === undefined) return 'N/A';
  return `${p.toFixed(1)}%`;
};

export default function LauncherGallery({ launchers, onSelect }: LauncherGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? launchers.find((l) => l.id === selectedId) : null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <Rocket className="text-[#e4a25b]" size={28} />
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white">
            Launch Vehicles
          </h2>
        </div>
        <p className="text-white/50 text-sm md:text-base">
          India's indigenous rocket family from sounding rockets to LVM3—each system a milestone in mastering spaceflight
        </p>
      </motion.div>

      {/* Detailed View */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 border border-white/10"
        >
          <div className="p-6 md:p-8">
            {/* Hero Section */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-light text-white mb-2">{selected.name}</h3>
                <p className="text-[#e4a25b] text-sm mono tracking-wider">{selected.role}</p>
              </div>

              {selected.description && (
                <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-4xl">
                  {selected.description}
                </p>
              )}
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="bg-black/40 border border-white/10 p-4">
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Stages</p>
                <p className="text-2xl font-light text-white">
                  {selected.stages || 'N/A'}
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 p-4">
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Height</p>
                <p className="text-lg font-light text-white font-mono">
                  {selected.height ? `${selected.height} m` : 'N/A'}
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 p-4">
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Payload (LEO)</p>
                <p className="text-lg font-light text-white font-mono">
                  {selected.payload_to_leo ? `${formatNumber(selected.payload_to_leo)} kg` : 'N/A'}
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 p-4">
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Payload (GTO)</p>
                <p className="text-lg font-light text-white font-mono">
                  {selected.payload_to_gto ? `${formatNumber(selected.payload_to_gto)} kg` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Flight History */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-white/10">
              <div>
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Total Launches</p>
                <p className="text-xl font-light text-white">
                  {formatNumber(selected.total_launches)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Successful</p>
                <p className="text-xl font-light text-white">
                  {formatNumber(selected.successful_launches)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Failed</p>
                <p className="text-xl font-light text-white">
                  {formatNumber(selected.failed_launches)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Success Rate</p>
                <p className="text-xl font-light text-white">
                  {formatPercentage(selected.success_rate)}
                </p>
              </div>
            </div>

            {/* Development Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10">
              <div>
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Maiden Flight</p>
                <p className="text-base font-light text-white">
                  {selected.maiden_flight_date || selected.firstFlight || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">First Success</p>
                <p className="text-base font-light text-white">
                  {selected.first_success_date || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Last Flight</p>
                <p className="text-base font-light text-white">
                  {selected.last_flight || 'N/A'}
                </p>
              </div>
            </div>

            {/* Propulsion Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">Propulsion</h4>
                <div className="space-y-2 text-sm text-white/70">
                  <p><span className="text-white">Propellant:</span> {selected.propellant || 'N/A'}</p>
                  <p><span className="text-white">Thrust (SL):</span> {selected.thrust_sl ? `${selected.thrust_sl.toLocaleString()} kN` : 'N/A'}</p>
                  {selected.engines && selected.engines.length > 0 && (
                    <div>
                      <p className="text-white">Engines:</p>
                      <ul className="ml-4 mt-1 space-y-1">
                        {selected.engines.map((e, i) => (
                          <li key={i} className="text-white/60">• {e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">Legacy</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  {selected.legacy || selected.note || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Launcher Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 gap-px bg-white/10 border border-white/10 md:grid-cols-2"
      >
        {launchers.map((launcher) => (
          <motion.button
            key={launcher.id}
            onClick={() => setSelectedId(launcher.id)}
            className={`text-left p-6 md:p-8 transition-colors ${
              selected?.id === launcher.id
                ? 'bg-[#e4a25b]/15 border-b border-r border-[#e4a25b]/30'
                : 'bg-[#04060a] hover:bg-[#05070c] border-b border-r border-white/10'
            }`}
            whileHover={{ scale: 0.995 }}
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-lg md:text-xl font-light text-white group-hover:text-[#e4a25b] transition-colors mb-1">
                  {launcher.name}
                </h4>
                <p className="text-xs md:text-sm text-white/50">{launcher.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <p className="text-white/50 uppercase tracking-wider">Stages</p>
                  <p className="text-white font-mono mt-1">{launcher.stages || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/50 uppercase tracking-wider">Height</p>
                  <p className="text-white font-mono mt-1">{launcher.height ? `${launcher.height} m` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/50 uppercase tracking-wider">LEO</p>
                  <p className="text-white font-mono mt-1">{launcher.payload_to_leo ? `${formatNumber(launcher.payload_to_leo)} kg` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/50 uppercase tracking-wider">Launches</p>
                  <p className="text-white font-mono mt-1">{formatNumber(launcher.total_launches)}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs text-white/40">
                  <span className="text-[#e4a25b]">{launcher.status}</span> · {launcher.era}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
