'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { spacecraft } from '@/data/spacecraft';
import { missions } from '@/data/missions';
import { launchers } from '@/data/launchers';

export type SearchSelection = { kind: 'spacecraft' | 'mission' | 'launcher'; id: string };

interface GlobalSearchProps {
  onSelect: (selection: SearchSelection) => void;
  onClose: () => void;
}

export default function GlobalSearch({ onSelect, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  
  const results = {
    spacecraft: spacecraft.filter(s => `${s.name} ${s.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    missions: missions.filter(m => m.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    launchers: launchers.filter(l => l.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl mx-4">
        <div className="bg-black/90 border border-white/10 rounded-lg overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <SearchIcon size={20} className="text-white/40" />
            <input autoFocus type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none" />
            <button onClick={onClose} className="p-1 text-white/40 hover:text-white"><X size={20} /></button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {query && (
              <>
                {results.spacecraft.map(s => (
                  <button key={s.id} onClick={() => onSelect({ kind: 'spacecraft', id: s.id })} className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5">
                    <p className="text-white font-semibold">{s.name}</p>
                    <p className="text-xs text-white/50">{s.category}</p>
                  </button>
                ))}
                {results.missions.map(m => (
                  <button key={m.id} onClick={() => onSelect({ kind: 'mission', id: m.id })} className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5">
                    <p className="text-white font-semibold">{m.name}</p>
                    <p className="text-xs text-white/50">Mission</p>
                  </button>
                ))}
                {results.launchers.map(l => (
                  <button key={l.id} onClick={() => onSelect({ kind: 'launcher', id: l.id })} className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5">
                    <p className="text-white font-semibold">{l.name}</p>
                    <p className="text-xs text-white/50">Launch Vehicle</p>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
