"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search as SearchIcon, Menu } from "lucide-react";

// Data
import { spacecraft } from "@/data/spacecraft";
import { missions } from "@/data/missions";
import { launches } from "@/data/launches";
import { launchers } from "@/data/launchers";
import { centres } from "@/data/centres";

// Components
import GlobalSearch, {
  type SearchSelection,
} from "@/components/explorer/Search";

import DetailPanel from "@/components/explorer/DetailPanel";
import TimelineVisualization from "@/components/timeline/TimelineVisualization";
import ArchiveInterface from "@/components/archive/ArchiveInterface";
import LauncherGallery from "@/components/launchers/LauncherGallery";
import MissionNetwork from "@/components/missions/MissionNetwork";
import IndiaMap from "@/components/map/IndiaMap";
import PeopleExplorer from "@/components/people/PeopleExplorer";
import FutureHorizon from "@/components/future/FutureHorizon";
import HeroSequence from "@/components/hero/HeroSequence";

/*
 * IMPORTANT
 *
 * Three.js is deliberately lazy-loaded.
 *
 * This prevents the entire React Three Fiber / Three.js stack
 * from being loaded while the DAROYA opening sequence is running.
 *
 * This is one of the biggest fixes for the long initial loading time.
 */
const SpaceScene = dynamic(
  () => import("@/components/cosmos/SpaceScene"),
  {
    ssr: false,
    loading: () => null,
  }
);

type ViewMode =
  | "hero"
  | "cosmos"
  | "timeline"
  | "archive"
  | "launchers"
  | "missions"
  | "india"
  | "people"
  | "future";

const VIEW_MODES: Record<
  ViewMode,
  {
    label: string;
    description: string;
  }
> = {
  hero: {
    label: "Observatory",
    description: "Enter DAROYA",
  },

  cosmos: {
    label: "Cosmos",
    description: "India's orbital ecosystem",
  },

  timeline: {
    label: "Timeline",
    description: "Chronological journey",
  },

  archive: {
    label: "Archive",
    description: "Sophisticated search",
  },

  launchers: {
    label: "Launchers",
    description: "Launch vehicles gallery",
  },

  missions: {
    label: "Missions",
    description: "Mission network",
  },

  india: {
    label: "India",
    description: "Space centers & infrastructure",
  },

  people: {
    label: "People",
    description: "Contributors & visionaries",
  },

  future: {
    label: "2047",
    description: "Future horizons",
  },
};

export default function DaroyaAppV2() {
  /* =========================================
     VIEW STATE

     IMPORTANT:
     Start with HERO, not COSMOS.

     This prevents Three.js from loading before
     the opening sequence has completed.
  ========================================= */

  const [viewMode, setViewMode] =
    useState<ViewMode>("hero");

  const [showMenu, setShowMenu] =
    useState(false);

  const [showSearch, setShowSearch] =
    useState(false);

  /* =========================================
     DETAIL STATE
  ========================================= */

  const [detailRef, setDetailRef] = useState<{
    kind: string;
    id: string;
  } | null>(null);

  /* =========================================
     TIMELINE STATE
  ========================================= */

  const [activeYear, setActiveYear] =
    useState(2026);

  /* =========================================
     ARCHIVE / COSMOS FILTER STATE
  ========================================= */

  const [filter, setFilter] =
    useState("All");

  /*
   * These are the actual spacecraft categories
   * used by the data model.
   */
  const filters = [
    "All",
    "Earth Observation",
    "Communication",
    "Navigation",
    "Science",
    "Lunar",
    "Planetary",
    "Solar",
    "Technology",
  ] as const;

  /* =========================================
     FILTERED SPACECRAFT
  ========================================= */

  const filtered = useMemo(() => {
    if (filter === "All") {
      return spacecraft;
    }

    return spacecraft.filter(
      (spacecraftItem) =>
        spacecraftItem.category === filter
    );
  }, [filter]);

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearchSelect =
    useCallback(
      (selection: SearchSelection) => {
        setShowSearch(false);

        setDetailRef({
          kind: selection.kind,
          id: selection.id,
        });
      },
      []
    );

  /* =========================================
     VIEW CHANGE
  ========================================= */

  const handleViewChange = (
    mode: ViewMode
  ) => {
    setViewMode(mode);
    setShowMenu(false);
  };

  /* =========================================
     DETAIL CLOSE
  ========================================= */

  const closeDetail =
    useCallback(() => {
      setDetailRef(null);
    }, []);

  /* =========================================
     TIMELINE LAUNCHES
  ========================================= */

  const yearLaunches = useMemo(
    () =>
      launches
        .filter(
          (launch) =>
            Math.abs(
              launch.year - activeYear
            ) <= 1
        )
        .slice(0, 4),
    [activeYear]
  );

  return (
    <main className="h-screen w-full overflow-hidden bg-[#04060a] text-[#f4f0e8]">
      {/* =====================================
          HERO SEQUENCE
      ====================================== */}

      <AnimatePresence mode="wait">
        {viewMode === "hero" && (
          <HeroSequence
            key="hero"
            onComplete={() =>
              setViewMode("cosmos")
            }
          />
        )}
      </AnimatePresence>

      {/* =====================================
          MAIN INTERFACE
      ====================================== */}

      <AnimatePresence mode="wait">
        {viewMode !== "hero" && (
          <motion.div
            key={viewMode}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative flex h-full w-full"
          >
            {/* =================================
                3D COSMOS

                IMPORTANT:
                SpaceScene is only mounted AFTER
                the hero has completed.

                It is also dynamically imported.
            ================================== */}

            <div className="absolute inset-0">
              <SpaceScene
                data={filtered}
                activeYear={activeYear}
              />
            </div>

            {/* =================================
                OVERLAY
            ================================== */}

            <div className="relative z-10 flex h-full w-full flex-col">
              {/* =================================
                  HEADER
              ================================== */}

              <header className="flex items-center justify-between border-b border-white/5 bg-black/20 px-6 py-5 backdrop-blur-sm">
                {/* Logo */}
                <motion.button
                  type="button"
                  onClick={() =>
                    setViewMode("hero")
                  }
                  className="mono text-[11px] tracking-[0.38em] text-white/75 transition-colors hover:text-white"
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  DAROYA
                </motion.button>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 text-[9px] uppercase tracking-[0.25em] lg:flex">
                  {Object.entries(
                    VIEW_MODES
                  )
                    .slice(1)
                    .map(
                      ([
                        mode,
                        { label },
                      ]) => (
                        <motion.button
                          key={mode}
                          type="button"
                          onClick={() =>
                            handleViewChange(
                              mode as ViewMode
                            )
                          }
                          className={`transition-colors ${
                            viewMode === mode
                              ? "text-[#e4a25b]"
                              : "text-white/30 hover:text-white/80"
                          }`}
                          whileHover={{
                            scale: 1.1,
                          }}
                        >
                          {label}
                        </motion.button>
                      )
                    )}
                </nav>

                <div className="flex items-center gap-2">
                  {/* Search */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      setShowSearch(true)
                    }
                    aria-label="Open search"
                    className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                  >
                    <SearchIcon size={20} />
                  </motion.button>

                  {/* Mobile Menu */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      setShowMenu(
                        (value) =>
                          !value
                      )
                    }
                    aria-label="Open menu"
                    className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                  >
                    <Menu size={20} />
                  </motion.button>
                </div>
              </header>

              {/* =================================
                  CONTENT
              ================================== */}

              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* =================================
                      COSMOS
                  ================================== */}

                  {viewMode ===
                    "cosmos" && (
                    <motion.div
                      key="cosmos"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 flex"
                    >
                      <div className="ml-auto flex h-full w-full flex-col overflow-hidden border-l border-white/5 bg-black/30 backdrop-blur-sm md:w-96">
                        <div className="flex-1 space-y-6 overflow-y-auto p-6">
                          {/* Filters */}
                          <div>
                            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
                              Filter by
                              Category
                            </h3>

                            <div className="space-y-2">
                              {filters.map(
                                (item) => (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                      setFilter(
                                        item
                                      )
                                    }
                                    className={`w-full rounded px-3 py-2 text-left text-sm transition-all ${
                                      filter ===
                                      item
                                        ? "bg-[#e4a25b]/20 text-[#e4a25b]"
                                        : "text-white/60 hover:bg-white/5 hover:text-white/80"
                                    }`}
                                  >
                                    {item}
                                  </button>
                                )
                              )}
                            </div>
                          </div>

                          {/* Filter status */}
                          <div className="border-t border-white/5 pt-5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                                Active
                                filter
                              </span>

                              <span className="text-xs text-[#e4a25b]">
                                {filter}
                              </span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                                Showing
                              </span>

                              <span className="font-mono text-sm text-white">
                                {
                                  filtered.length
                                }
                              </span>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div>
                            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
                              Program
                              Statistics
                            </h3>

                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/60">
                                  Spacecraft
                                </span>

                                <span className="font-mono text-white">
                                  {
                                    spacecraft.length
                                  }
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-white/60">
                                  Launches
                                </span>

                                <span className="font-mono text-white">
                                  {
                                    launches.length
                                  }
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-white/60">
                                  Missions
                                </span>

                                <span className="font-mono text-white">
                                  {
                                    missions.length
                                  }
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-white/60">
                                  Centres
                                </span>

                                <span className="font-mono text-white">
                                  {
                                    centres.length
                                  }
                                </span>
                              </div>

                              <div className="flex justify-between border-t border-white/5 pt-3">
                                <span className="text-white/60">
                                  Filtered
                                </span>

                                <span className="font-mono text-[#e4a25b]">
                                  {
                                    filtered.length
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* =================================
                      TIMELINE
                  ================================== */}

                  {viewMode ===
                    "timeline" && (
                    <motion.div
                      key="timeline"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 overflow-y-auto p-6"
                    >
                      <TimelineVisualization
                        activeYear={
                          activeYear
                        }
                        onYearChange={
                          setActiveYear
                        }
                        launches={
                          yearLaunches
                        }
                      />
                    </motion.div>
                  )}

                  {/* =================================
                      ARCHIVE
                  ================================== */}

                  {viewMode ===
                    "archive" && (
                    <motion.div
                      key="archive"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 overflow-y-auto p-6"
                    >
                      <ArchiveInterface
                        onSelect={
                          handleSearchSelect
                        }
                      />
                    </motion.div>
                  )}

                  {/* =================================
                      LAUNCHERS
                  ================================== */}

                  {viewMode ===
                    "launchers" && (
                    <motion.div
                      key="launchers"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 overflow-y-auto p-6"
                    >
                      <LauncherGallery
                        launchers={
                          launchers
                        }
                        onSelect={(
                          launcherId
                        ) =>
                          setDetailRef({
                            kind: "launcher",
                            id: launcherId,
                          })
                        }
                      />
                    </motion.div>
                  )}

                  {/* =================================
                      MISSIONS
                  ================================== */}

                  {viewMode ===
                    "missions" && (
                    <motion.div
                      key="missions"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 overflow-y-auto p-6"
                    >
                      <MissionNetwork
                        missions={
                          missions
                        }
                        onSelectMission={(
                          missionId
                        ) =>
                          setDetailRef({
                            kind: "mission",
                            id: missionId,
                          })
                        }
                      />
                    </motion.div>
                  )}

                  {/* =================================
                      INDIA
                  ================================== */}

                  {viewMode ===
                    "india" && (
                    <motion.div
                      key="india"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 overflow-y-auto p-6"
                    >
                      <IndiaMap />
                    </motion.div>
                  )}

                  {/* =================================
                      PEOPLE
                  ================================== */}

                  {viewMode ===
                    "people" && (
                    <motion.div
                      key="people"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 overflow-y-auto p-6"
                    >
                      <PeopleExplorer
                        onSelect={(id) =>
                          setDetailRef({
                            kind: "person",
                            id,
                          })
                        }
                      />
                    </motion.div>
                  )}

                  {/* =================================
                      FUTURE
                  ================================== */}

                  {viewMode ===
                    "future" && (
                    <motion.div
                      key="future"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="absolute inset-0 overflow-y-auto p-6"
                    >
                      <FutureHorizon
                        onSelect={(id) =>
                          setDetailRef({
                            kind: "future",
                            id,
                          })
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* =================================
                DETAIL PANEL
            ================================== */}

            <AnimatePresence>
              {detailRef && (
                <DetailPanel
                  kind={detailRef.kind}
                  id={detailRef.id}
                  onClose={closeDetail}
                />
              )}
            </AnimatePresence>

            {/* =================================
                GLOBAL SEARCH
            ================================== */}

            <AnimatePresence>
              {showSearch && (
                <GlobalSearch
                  onSelect={
                    handleSearchSelect
                  }
                  onClose={() =>
                    setShowSearch(false)
                  }
                />
              )}
            </AnimatePresence>

            {/* =================================
                MOBILE MENU
            ================================== */}

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="absolute right-6 top-16 z-50 overflow-hidden rounded-lg border border-white/10 bg-black/90 backdrop-blur-sm"
                >
                  {Object.entries(
                    VIEW_MODES
                  )
                    .slice(1)
                    .map(
                      ([
                        mode,
                        { label },
                      ]) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() =>
                            handleViewChange(
                              mode as ViewMode
                            )
                          }
                          className={`block w-full border-b border-white/5 px-4 py-3 text-left text-sm uppercase tracking-[0.1em] transition-colors ${
                            viewMode ===
                            mode
                              ? "bg-[#e4a25b]/20 text-[#e4a25b]"
                              : "text-white/60 hover:bg-white/5 hover:text-white/80"
                          }`}
                        >
                          {label}
                        </button>
                      )
                    )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}