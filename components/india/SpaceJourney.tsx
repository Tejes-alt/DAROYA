"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Milestone {
  year: number;
  title: string;
  subtitle: string;
  description: string;
category:
  | "Foundations"
  | "Building"
  | "Exploration"
  | "Launchers"
  | "Technology"
  | "Human"
  | "Future";  details?: string[];
}

const milestones: Milestone[] = [
  {
    year: 1947,
    title: "Independence",
    subtitle: "A nation begins",
    description: "India gains independence from British rule, marking the start of its journey as a sovereign nation.",
    category: "Foundations",
  },
  {
    year: 1962,
    title: "INCOSPAR",
    subtitle: "First space committee",
    description: "The Indian National Committee for Space Research is established, laying the foundation for organized space activities.",
    category: "Foundations",
    details: [
      "Established to coordinate space research",
      "Precursor to ISRO formation",
      "Enabled early space initiatives"
    ]
  },
  {
    year: 1963,
    title: "Rohini Sounding Rocket",
    subtitle: "First launch",
    description: "India's first sounding rocket launches from Thumba, reaching an altitude of 21 km. This inaugural rocket flight validates atmospheric research capabilities.",
    category: "Foundations",
    details: [
      "Launched from Thumba, Kerala",
      "Reached 21 km altitude",
      "Atmospheric research payload",
      "Foundation of Indian rocketry"
    ]
  },
  {
    year: 1969,
    title: "ISRO Founded",
    subtitle: "Birth of Indian space program",
    description: "The Indian Space Research Organisation is formally established, absorbing INCOSPAR and becoming the primary space agency.",
    category: "Foundations",
    details: [
      "Dr. Vikram Sarabhai leads initiative",
      "Replaces INCOSPAR",
      "Headquarters in Bangalore",
      "Integrated approach to space technology"
    ]
  },
  {
    year: 1975,
    title: "Aryabhata",
    subtitle: "India's first satellite",
    description: "India's first satellite, Aryabhata, is launched aboard a Soviet Intercosmos rocket. Named after the ancient mathematician-astronomer, it marks India's entry into the space age.",
    category: "Building",
    details: [
      "Soviet-provided launch vehicle (C-1 Intercosmos)",
      "Low Earth Orbit mission",
      "Science and technology demonstration",
      "52 kg spacecraft"
    ]
  },
  {
    year: 1979,
    title: "SLV-3 First Attempt",
    subtitle: "Indigenous launch vehicle",
    description: "India attempts its first indigenous satellite launch vehicle, SLV-3. While the mission is unsuccessful, it represents the beginning of India's pursuit of autonomous launch capability.",
    category: "Building",
    details: [
      "Four-stage solid-fueled rocket",
      "First indigenous launch attempt",
      "Built entirely with domestic resources",
      "Crash at ~120 km altitude"
    ]
  },
  {
    year: 1980,
    title: "Rohini RS-1 Success",
    subtitle: "First indigenous launch success",
    description: "SLV-3E2 successfully places Rohini RS-1 satellite in orbit. India becomes the sixth nation to independently launch a satellite, achieving a historic milestone in indigenous capability.",
    category: "Building",
    details: [
      "First successful indigenous launch",
      "40 kg satellite in Low Earth Orbit",
      "Achieved on 18 July 1980",
      "Validated SLV-3 technology"
    ]
  },
  {
    year: 1983,
    title: "ASLV Development",
    subtitle: "Advanced launch vehicle",
    description: "Development of the Augmented Satellite Launch Vehicle (ASLV) begins, increasing payload capacity and reliability over SLV-3.",
    category: "Launchers",
    details: [
      "First flight: 24 March 1987",
      "Increased payload capacity",
      "Four initial test flights",
      "Led to PSLV development"
    ]
  },
  {
    year: 1988,
    title: "IRS-1A Operational",
    subtitle: "Earth observation begins",
    description: "India's first operational remote-sensing satellite, IRS-1A, is launched. It begins providing Earth observation data for agricultural, geological, and environmental monitoring.",
    category: "Building",
    details: [
      "Launched via Soviet Vostok rocket",
      "Pan and multispectral imaging",
      "Operational for 8+ years",
      "Foundation of remote-sensing program"
    ]
  },
  {
    year: 1994,
    title: "PSLV-D1",
    subtitle: "Polar Satellite Launch Vehicle",
    description: "The first Polar Satellite Launch Vehicle (PSLV) launches, though unsuccessfully. PSLV would become India's primary launcher for decades to come.",
    category: "Launchers",
    details: [
      "First PSLV development flight",
      "Four-stage liquid/solid hybrid",
      "Payload: 820 kg Rohini satellite",
      "Launch: 20 September 1993 (D1), then D2 successful in 1994"
    ]
  },
  {
    year: 1997,
    title: "PSLV-C1 Success",
    subtitle: "PSLV achieves operational status",
    description: "PSLV-C1 successfully launches IRS-1D into polar orbit. This mission establishes PSLV as a reliable, versatile operational launch vehicle.",
    category: "Launchers",
    details: [
      "First operational PSLV mission",
      "Placed IRS-1D satellite",
      "Sun-synchronous orbit achieved",
      "900 kg payload capacity demonstrated"
    ]
  },
  {
    year: 2001,
    title: "GSLV-D1",
    subtitle: "Geosynchronous launch capability",
    description: "India's first Geosynchronous Satellite Launch Vehicle (GSLV) launches GSAT-1 communications satellite, expanding India's capability to deploy geostationary spacecraft.",
    category: "Launchers",
    details: [
      "Three-stage vehicle with cryogenic upper stage",
      "Indigenous cryogenic technology validated",
      "GSAT-1 communications mission",
      "Limited initial success rate"
    ]
  },
  {
    year: 2008,
    title: "Chandrayaan-1",
    subtitle: "India's first lunar mission",
    description: "Chandrayaan-1, India's first lunar mission, launches successfully. The orbiter maps the Moon and makes groundbreaking discoveries about lunar water, advancing planetary science.",
    category: "Exploration",
    details: [
      "Launched 22 October 2008",
      "Lunar polar orbit achieved",
      "Moon Impact Probe crashed on lunar surface",
      "Major water discovery contribution",
      "Two-year mission (extended)"
    ]
  },
  {
    year: 2013,
    title: "Mars Orbiter Mission",
    subtitle: "First interplanetary mission",
    description: "India's Mars Orbiter Mission (Mangalyaan) successfully reaches Mars orbit, making India the first nation to reach Mars on its maiden attempt and the fourth space agency overall.",
    category: "Exploration",
    details: [
      "Launched 5 November 2013",
      "Mars orbit insertion: 24 September 2014",
      "Cost-effective mission (~USD 74 million)",
      "First-time success to Mars",
      "Operational methane mapping orbiter"
    ]
  },
  {
    year: 2015,
    title: "AstroSat",
    subtitle: "Dedicated astronomy observatory",
    description: "AstroSat, India's first dedicated multi-wavelength space observatory, launches into Low Earth Orbit. It observes the universe in X-ray, UV, and optical wavelengths.",
    category: "Exploration",
    details: [
      "Launched 28 September 2015",
      "Multi-wavelength observation",
      "Independent astronomical asset",
      "Operational status continues",
      "Ultraviolet, X-ray, optical payloads"
    ]
  },
  {
    year: 2019,
    title: "Chandrayaan-2 Orbiter",
    subtitle: "Lunar science continues",
    description: "Chandrayaan-2 orbiter achieves lunar orbit, continuing high-resolution mapping and science observations. The lander attempts a soft landing; the orbiter mission continues successfully.",
    category: "Exploration",
    details: [
      "Launched 22 July 2019",
      "Orbiter + Lander + Rover architecture",
      "Lander soft-landing attempt unsuccessful",
      "Orbiter operational and productive",
      "High-resolution lunar mapping"
    ]
  },
  {
    year: 2023,
    title: "Chandrayaan-3 Landing",
    subtitle: "Successful lunar soft landing",
    description: "Chandrayaan-3 becomes India's first successful lunar soft landing mission. The lander and rover operate on the Moon, validating India's touchdown and surface exploration capabilities.",
    category: "Exploration",
    details: [
      "Launched 14 July 2023",
      "Soft landing: 23 August 2023",
      "South Polar region landing",
      "Rover successfully deployed",
      "Major international achievement"
    ]
  },
  {
    year: 2023,
    title: "Aditya-L1",
    subtitle: "Solar observatory",
    description: "India's first dedicated solar observatory, Aditya-L1, launches toward the Sun-Earth L1 point. It studies solar activities and corona dynamics in unprecedented detail.",
    category: "Exploration",
    details: [
      "Launched 2 September 2023",
      "Sun–Earth L1 insertion",
      "Electromagnetic payload focus",
      "Operational status",
      "Independent solar science asset"
    ]
  },
  {
    year: 2024,
    title: "XPoSat & NISAR",
    subtitle: "X-ray polarimetry and Earth science",
    description: "XPoSat launches for X-ray polarimetry astronomy; NISAR, a NASA-ISRO collaborative mission, launches for advanced Earth observation radar. India's payload and launch capabilities reach new heights.",
    category: "Exploration",
    details: [
      "XPoSat: 1 January 2024",
      "NISAR: 30 July 2025 (future)",
      "Joint USA-India mission",
      "Advanced Earth observation",
      "Scientific collaboration demonstrated"
    ]
  },
  {
    year: 2024,
    title: "SpaDeX Technology Demo",
    subtitle: "Rendezvous and docking",
    description: "The Space Docking Experiment (SpaDeX) demonstrates autonomous rendezvous and docking of two satellites in orbit, validating critical technologies for future space stations and in-orbit servicing.",
    category: "Technology",
    details: [
      "Launched 30 December 2024",
      "Two spacecraft in formation",
      "Autonomous rendezvous achieved",
      "Docking technology validated",
      "Gateway to space station capability"
    ]
  },
  {
    year: 2025,
    title: "Gaganyaan",
    subtitle: "Human spaceflight program in development",
    description: "India's human spaceflight program, Gaganyaan, progresses toward crewed orbital missions. Test flights and technology validation are underway to achieve human spaceflight.",
    category: "Human",
    details: [
      "Target: First crewed flight 2025–2026",
      "Human-rated LVM3 under development",
      "Three-person crew capacity planned",
      "Low Earth Orbit missions",
      "National human spaceflight capability"
    ]
  },
  {
    year: 2047,
    title: "Vision 2047",
    subtitle: "India's future in space",
    description: "By 2047, 100 years after independence, India envisions a comprehensive space infrastructure including space stations, lunar bases, Mars exploration, and advanced scientific missions.",
    category: "Future",
    details: [
      "Planned space station",
      "Lunar surface presence",
      "Mars exploration missions",
      "Deep-space science",
      "Global leadership in space"
    ]
  },
];

export default function SpaceJourney() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["Foundations", "Building", "Exploration", "Launchers", "Technology", "Human", "Future"] as const;
  
  const filtered = useMemo(() => {
    if (!selectedCategory) return milestones;
    return milestones.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <div className="mono text-[9px] tracking-[0.35em] text-[#e4a25b]">INDIA'S JOURNEY</div>
          <h2 className="serif mt-4 text-5xl md:text-7xl leading-tight">
            Toward the Horizon
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-white/50">
          From early sounding rockets to the Moon's surface: eighty years of India's evolution as a spacefaring nation. Every mission, every launch vehicle, every discovery has built toward an independent capability in space.
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
          className={`rounded-full border px-4 py-2 text-[8px] uppercase tracking-[.16em] transition ${
            selectedCategory === null
              ? "border-[#e4a25b]/60 bg-[#e4a25b]/10 text-[#e4a25b]"
              : "border-white/10 text-white/35 hover:text-white/60"
          }`}
        >
          All Eras
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full border px-4 py-2 text-[8px] uppercase tracking-[.16em] transition ${
              selectedCategory === cat
                ? "border-[#e4a25b]/60 bg-[#e4a25b]/10 text-[#e4a25b]"
                : "border-white/10 text-white/35 hover:text-white/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Timeline Visualization */}
      <div className="space-y-0">
        {filtered.map((milestone, idx) => (
          <motion.div
key={`${milestone.year}-${milestone.title}-${idx}`}            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="border-l-2 border-white/10 py-6 pl-8 transition hover:border-[#e4a25b]/40 hover:bg-white/[.02]"
          >
            <button
              onClick={() => setExpandedId(expandedId === idx ? null : idx)}
              className="w-full text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mono text-[9px] tracking-[.2em] text-[#e4a25b] mb-1">
                    {milestone.year}
                  </div>
                  <h3 className="serif text-2xl md:text-3xl mb-1">{milestone.title}</h3>
                  <p className="text-sm text-white/50 mb-3">{milestone.subtitle}</p>
                  <p className="text-sm leading-6 text-white/60 max-w-2xl">{milestone.description}</p>
                </div>
                <div className="mt-1 text-white/30 transition group-hover:text-[#e4a25b]">
                  {expandedId === idx ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === idx && milestone.details && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-2"
                >
                  {milestone.details.map((detail, i) => (
                    <div key={i} className="flex gap-3 text-sm text-white/45">
                      <span className="text-[#e4a25b]">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-4 mt-12"
      >
        {[
          ["1947", "Year of Independence"],
          [String(filtered.length), "Milestones Shown"],
          ["2047", "Vision Horizon"],
          ["Global Leader", "Goal"],
        ].map(([val, label]) => (
          <div key={label} className="bg-[#04060a] p-6 md:p-8">
            <div className="serif text-3xl md:text-4xl text-[#e4a25b]">{val}</div>
            <div className="mono mt-3 text-[8px] uppercase tracking-[.28em] text-white/28">{label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
