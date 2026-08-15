'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Launcher } from '@/lib/data/types';

interface LauncherDetailProps {
  launcher: Launcher;
  onClose: () => void;
}

interface ExpandableSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const formatValue = (value: any, unit: string = ''): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'number') {
    return `${value.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  }
  return String(value);
};

export default function LauncherDetail({ launcher, onClose }: LauncherDetailProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['overview', 'specifications'])
  );

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const sections: ExpandableSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4 text-sm text-white/70 leading-relaxed">
          {launcher.description && <p>{launcher.description}</p>}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-xs uppercase text-white/50 mb-2">Program Status</p>
              <p className="text-white">{launcher.status}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-white/50 mb-2">Era</p>
              <p className="text-white">{launcher.era}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-white/50 mb-2">Organization</p>
              <p className="text-white">{launcher.organization || 'ISRO'}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-white/50 mb-2">Role</p>
              <p className="text-white text-xs">{launcher.role}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'specifications',
      title: 'Technical Specifications',
      content: (
        <div className="space-y-6">
          {/* Physical Properties */}
          <div>
            <h4 className="text-xs uppercase text-white/50 mb-3 tracking-wider">Physical Properties</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-black/40 border border-white/10 p-3">
                <p className="text-xs text-white/50 mb-1">Stages</p>
                <p className="text-lg font-mono text-white">{formatValue(launcher.stages)}</p>
              </div>
              <div className="bg-black/40 border border-white/10 p-3">
                <p className="text-xs text-white/50 mb-1">Height</p>
                <p className="text-lg font-mono text-white">{formatValue(launcher.height, 'm')}</p>
              </div>
              <div className="bg-black/40 border border-white/10 p-3">
                <p className="text-xs text-white/50 mb-1">Diameter</p>
                <p className="text-lg font-mono text-white">{formatValue(launcher.diameter, 'm')}</p>
              </div>
            </div>
          </div>

          {/* Payload Capability */}
          <div>
            <h4 className="text-xs uppercase text-white/50 mb-3 tracking-wider">Payload Capacity</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-black/40 border border-white/10 p-3">
                <p className="text-xs text-white/50 mb-1">To LEO</p>
                <p className="text-lg font-mono text-white">{formatValue(launcher.payload_to_leo, 'kg')}</p>
              </div>
              <div className="bg-black/40 border border-white/10 p-3">
                <p className="text-xs text-white/50 mb-1">To GTO</p>
                <p className="text-lg font-mono text-white">{formatValue(launcher.payload_to_gto, 'kg')}</p>
              </div>
              <div className="bg-black/40 border border-white/10 p-3">
                <p className="text-xs text-white/50 mb-1">Thrust (SL)</p>
                <p className="text-lg font-mono text-white">{formatValue(launcher.thrust_sl, 'kN')}</p>
              </div>
            </div>
          </div>

          {/* Propulsion */}
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs uppercase text-white/50 mb-3 tracking-wider">Propulsion System</h4>
            <div className="space-y-2 text-sm text-white/70">
              <div>
                <span className="text-white/50">Propellant:</span>
                <span className="text-white ml-2">{launcher.propellant || 'N/A'}</span>
              </div>
              {launcher.engines && launcher.engines.length > 0 && (
                <div>
                  <span className="text-white/50 block mb-1">Engines:</span>
                  <div className="ml-2 space-y-1">
                    {launcher.engines.map((engine, i) => (
                      <div key={i} className="text-white text-sm">• {engine}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'history',
      title: 'Flight History & Performance',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-black/40 border border-white/10 p-3">
              <p className="text-xs text-white/50 mb-1">Total Launches</p>
              <p className="text-xl font-mono text-white">{formatValue(launcher.total_launches)}</p>
            </div>
            <div className="bg-black/40 border border-white/10 p-3">
              <p className="text-xs text-white/50 mb-1">Successful</p>
              <p className="text-xl font-mono text-white">{formatValue(launcher.successful_launches)}</p>
            </div>
            <div className="bg-black/40 border border-white/10 p-3">
              <p className="text-xs text-white/50 mb-1">Failed</p>
              <p className="text-xl font-mono text-white">{formatValue(launcher.failed_launches)}</p>
            </div>
            <div className="bg-black/40 border border-white/10 p-3">
              <p className="text-xs text-white/50 mb-1">Success Rate</p>
              <p className="text-xl font-mono text-white">
                {launcher.success_rate ? `${launcher.success_rate.toFixed(1)}%` : 'N/A'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Maiden Flight</p>
              <p className="text-sm text-white">{launcher.maiden_flight_date || launcher.firstFlight || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">First Success</p>
              <p className="text-sm text-white">{launcher.first_success_date || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-white/50 mb-2 tracking-wider">Last Flight</p>
              <p className="text-sm text-white">{launcher.last_flight || 'N/A'}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'legacy',
      title: 'Legacy & Impact',
      content: (
        <div className="space-y-4 text-sm text-white/70 leading-relaxed">
          {launcher.legacy && (
            <p className="text-white">{launcher.legacy}</p>
          )}
          {launcher.note && (
            <div className="bg-black/40 border border-white/10 p-4 text-sm">
              <p className="text-white/80">{launcher.note}</p>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl bg-[#04060a] border border-white/10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#04060a] border-b border-white/10 px-6 md:px-8 py-6 md:py-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-2">{launcher.name}</h1>
              <p className="text-[#e4a25b] text-sm mono tracking-wider">{launcher.role}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 text-white/50 hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 md:px-8 py-6 md:py-8 space-y-4">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                className="border border-white/10 bg-black/40 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-white/[0.02] transition-colors text-left"
                >
                  <h2 className="text-lg md:text-xl font-light text-white">{section.title}</h2>
                  {expandedSections.has(section.id) ? (
                    <ChevronUp className="text-white/50 shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-white/50 shrink-0" size={20} />
                  )}
                </button>

                {expandedSections.has(section.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 md:px-6 pb-4 md:pb-6 pt-0 border-t border-white/10"
                  >
                    {section.content}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-6 md:px-8 py-4 bg-black/40">
            <p className="text-xs text-white/30 mono tracking-wider">
              DAROYA Archives • India's Space Programme Documentation
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
