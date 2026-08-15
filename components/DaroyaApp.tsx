"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Search as SearchIcon,
  Rocket,
} from "lucide-react";

import SpaceScene from "@/components/cosmos/SpaceScene";
import GlobalSearch, {
  type SearchSelection,
} from "@/components/explorer/Search";
import DetailPanel from "@/components/explorer/DetailPanel";
import PeopleExplorer from "@/components/people/PeopleExplorer";
import IndiaMap from "@/components/map/IndiaMap";
import FutureHorizon from "@/components/future/FutureHorizon";

import { spacecraft } from "@/data/spacecraft";
import { missions } from "@/data/missions";
import { launches } from "@/data/launches";
import { launchers } from "@/data/launchers";
import { timeline } from "@/data/timeline";

import {
  getDetailFacts,
  datasetStats,
  type EntityKind,
} from "@/lib/data/loader";

import type { RelatedEntity } from "@/lib/data/relationships";
import { trajectoryForDestination } from "@/lib/orbit/trajectories";

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

const NAV_LINKS = [
  ["timeline", "Timeline"],
  ["archive", "Archive"],
  ["launchers", "Launchers"],
  ["missions", "Missions"],
  ["people", "People"],
  ["india", "India"],
  ["future", "2047"],
] as const;

export default function DaroyaApp() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] =
    useState<(typeof filters)[number]>("All");

  const [detailRef, setDetailRef] = useState<{
    kind: EntityKind;
    id: string;
  } | null>(null);

  const [activeYear, setActiveYear] = useState(2026);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* -----------------------------
     ARCHIVE FILTERING
  ----------------------------- */

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return spacecraft.filter((spacecraftItem) => {
      const matchesFilter =
        filter === "All" ||
        spacecraftItem.category === filter;

      const searchableText = [
        spacecraftItem.name,
        spacecraftItem.category,
        spacecraftItem.launcher,
        spacecraftItem.orbit,
        spacecraftItem.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery ||
        searchableText.includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  /* -----------------------------
     TIMELINE
  ----------------------------- */

  const highlightedTimeline = useMemo(() => {
    if (!timeline.length) {
      return null;
    }

    return timeline.reduce((closest, event) =>
      Math.abs(event.year - activeYear) <
      Math.abs(closest.year - activeYear)
        ? event
        : closest
    );
  }, [activeYear]);

  const yearLaunches = useMemo(
    () =>
      launches
        .filter(
          (launch) =>
            Math.abs(launch.year - activeYear) <= 1
        )
        .slice(0, 4),
    [activeYear]
  );

  /* -----------------------------
     DATA STATS
  ----------------------------- */

  const stats = useMemo(() => datasetStats(), []);

  const detailFacts = detailRef
    ? getDetailFacts(detailRef.kind, detailRef.id)
    : null;

  /* -----------------------------
     TRAJECTORY
  ----------------------------- */

  const activeTrajectory = useMemo(() => {
    if (detailRef?.kind !== "mission") {
      return null;
    }

    const mission = missions.find(
      (item) => item.id === detailRef.id
    );

    return mission
      ? trajectoryForDestination(mission.destination)
      : null;
  }, [detailRef]);

  /* -----------------------------
     REDUCED MOTION
  ----------------------------- */

  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  /* -----------------------------
     DETAIL HANDLERS
  ----------------------------- */

  const openDetail = useCallback(
    (
      kind: EntityKind | RelatedEntity["kind"],
      id: string
    ) => {
      setDetailRef({
        kind: kind as EntityKind,
        id,
      });
    },
    []
  );

  const closeDetail = useCallback(() => {
    setDetailRef(null);
  }, []);

  const handleSearchSelect = useCallback(
    (selection: SearchSelection) => {
      setSearchOpen(false);
      openDetail(selection.kind, selection.id);
    },
    [openDetail]
  );

  return (
    <main className="bg-[#04060a] text-[#f4f0e8]">
      {/* ================================
          HEADER
      ================================= */}

      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-5 md:px-8">
        <a
          href="#top"
          className="mono text-[11px] tracking-[0.38em] text-white/75"
        >
          DAROYA
        </a>

        <div className="hidden items-center gap-6 text-[9px] uppercase tracking-[0.25em] text-white/30 md:flex">
          {NAV_LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="transition hover:text-white/80"
            >
              {label}
            </a>
          ))}

          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search the archive"
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/40 transition hover:border-[#e4a25b]/50 hover:text-[#e4a25b]"
          >
            <SearchIcon size={11} />

            <span className="mono text-[8px]">
              ⌘K
            </span>
          </button>
        </div>

        <button
          className="panel rounded-full px-4 py-2 text-[9px] uppercase tracking-[0.22em] text-white/60 md:hidden"
          onClick={() => setMenu((value) => !value)}
        >
          {menu ? "Close" : "Menu"}
        </button>
      </header>

      {/* ================================
          MOBILE MENU
      ================================= */}

      <AnimatePresence>
        {menu && (
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
            className="fixed inset-x-3 top-16 z-[65] panel p-5 md:hidden"
          >
            <div className="grid gap-4 text-xs uppercase tracking-[0.18em] text-white/60">
              {NAV_LINKS.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenu(false)}
                >
                  {label}
                </a>
              ))}

              <button
                onClick={() => {
                  setMenu(false);
                  setSearchOpen(true);
                }}
                className="text-left"
              >
                Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================
          HERO
      ================================= */}

      <section
        id="top"
        className="relative h-[100svh] min-h-[760px] overflow-hidden bg-[#04060a]"
      >
        <motion.div
          className="absolute inset-0"
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 2.4,
            ease: "easeOut",
          }}
        >
          <SpaceScene
            selectedId={
              detailRef?.kind === "spacecraft"
                ? detailRef.id
                : null
            }
            onSelect={(spacecraftItem) =>
              openDetail(
                "spacecraft",
                spacecraftItem.id
              )
            }
            activeYear={activeYear}
            trajectory={activeTrajectory}
            reducedMotion={reducedMotion}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,transparent_18%,rgba(4,6,10,.16)_46%,#04060a_90%)]" />

        <div className="grain" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
            }}
            className="mono text-[9px] tracking-[0.48em] text-white/38"
          >
            INDIA · 1947 — 2026
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.6,
              delay: 0.22,
            }}
            className="serif mt-5 text-[clamp(5rem,15vw,12rem)] leading-none tracking-[-.075em]"
          >
            DAROYA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.2,
              duration: 1,
            }}
            className="mt-7 text-[10px] uppercase tracking-[0.42em] text-white/42"
          >
            A journey beyond the horizon
          </motion.p>

          <motion.a
            href="#intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.9,
            }}
            className="mt-14 flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-white/32 transition hover:text-white/65"
          >
            Explore
            <ArrowDown size={12} />
          </motion.a>
        </div>
      </section>

      {/* ================================
          INTRO
      ================================= */}

      <section
        id="intro"
        className="relative mx-auto max-w-7xl px-6 py-28 md:py-44"
      >
        <div className="grid gap-16 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mono text-[9px] tracking-[0.35em] text-[#e4a25b]">
              THE IDEA
            </div>

            <h2 className="serif mt-6 max-w-4xl text-5xl leading-[1.02] md:text-8xl">
              Not a list of missions.
              <br />
              <span className="text-white/38">
                A record of becoming.
              </span>
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-xl text-sm leading-8 text-white/50 md:text-base">
              DAROYA is a quiet atlas of India&apos;s
              journey into space: institutions becoming
              capability, launches becoming
              infrastructure, and instruments becoming a
              way of seeing Earth, the Moon, Mars and the
              Sun.
            </p>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/32">
              The archive is built from the historical
              record, while the visual layer turns that
              record into a place you can explore.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-px border border-white/10 bg-white/10 md:grid-cols-4">
          {[
            ["80", "years in view"],
            [String(stats.launchCount), "launch missions*"],
            [
              String(stats.spacecraftCount),
              "featured spacecraft",
            ],
            ["2047", "next horizon"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="bg-[#04060a] p-7 md:p-9"
            >
              <div className="serif text-5xl md:text-6xl">
                {number}
              </div>

              <div className="mono mt-3 text-[8px] uppercase tracking-[.28em] text-white/28">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mono mt-4 text-[8px] text-white/20">
          * {stats.launchCount} showcase launch
          missions in the DAROYA record (
          {stats.successfulLaunches} success,{" "}
          {stats.unsuccessfulLaunches} unsuccessful) —
          not the complete ISRO index.
        </div>
      </section>

      {/* ================================
          TIMELINE
      ================================= */}

      <section
        id="timeline"
        className="border-y border-white/10 bg-[#05070c]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mono text-[9px] tracking-[0.35em] text-[#e4a25b]">
                THE JOURNEY
              </div>

              <h2 className="serif mt-5 text-5xl md:text-7xl">
                1947 → 2026
              </h2>
            </div>

            <div className="max-w-sm text-sm leading-7 text-white/35">
              Drag the year. The cosmos and the archive
              shift with it.
            </div>
          </div>

          <div className="mt-14">
            <input
              aria-label="Timeline year"
              type="range"
              min="1947"
              max="2026"
              value={activeYear}
              onChange={(event) =>
                setActiveYear(
                  Number(event.target.value)
                )
              }
              className="w-full accent-[#e4a25b]"
            />

            <div className="mono mt-3 flex justify-between text-[8px] tracking-[.2em] text-white/20">
              <span>1947</span>
              <span>1969</span>
              <span>1980</span>
              <span>2008</span>
              <span>2023</span>
              <span>2026</span>
            </div>
          </div>

          {highlightedTimeline && (
            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-[1.2fr_.8fr]">
              <div className="bg-[#05070c] p-7 md:p-10">
                <div className="mono text-[9px] tracking-[.2em] text-[#e4a25b]">
                  {highlightedTimeline.year} ·{" "}
                  {highlightedTimeline.label}
                </div>

                <h3 className="serif mt-3 text-4xl md:text-5xl">
                  {highlightedTimeline.title}
                </h3>

                <p className="mt-6 max-w-2xl text-sm leading-8 text-white/48">
                  {highlightedTimeline.text}
                </p>
              </div>

              <div className="bg-[#07090f] p-7 md:p-10">
                <div className="mono text-[8px] uppercase tracking-[.25em] text-white/25">
                  Nearby launches
                </div>

                <div className="mt-5 divide-y divide-white/10">
                  {yearLaunches.length ? (
                    yearLaunches.map((launch) => (
                      <button
                        key={launch.id}
                        onClick={() =>
                          openDetail(
                            "launch",
                            launch.id
                          )
                        }
                        className="block w-full py-4 text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-sm text-white/75">
                            {launch.vehicle}
                          </div>

                          <div
                            className={`mono text-[7px] tracking-[.15em] ${
                              launch.outcome ===
                              "Unsuccessful"
                                ? "text-red-300/60"
                                : "text-white/25"
                            }`}
                          >
                            {launch.outcome.toUpperCase()}
                          </div>
                        </div>

                        <div className="mt-1 text-xs text-white/28">
                          {launch.date} ·{" "}
                          {launch.payload}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-6 text-sm text-white/25">
                      No major showcase launch in this
                      window.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 overflow-x-auto pb-4">
            <div className="flex min-w-max gap-8">
              {timeline.map((event, index) => (
                <button
                  key={`${event.year}-${index}`}
                  onClick={() =>
                    setActiveYear(event.year)
                  }
                  className={`group w-44 text-left ${
                    Math.abs(
                      event.year - activeYear
                    ) < 3
                      ? "opacity-100"
                      : "opacity-35"
                  } transition`}
                >
                  <div className="mono text-[9px] text-[#e4a25b]">
                    {event.year}
                  </div>

                  <div className="mt-3 h-px bg-white/15 group-hover:bg-white/35" />

                  <div className="mt-3 text-sm text-white/72">
                    {event.title}
                  </div>

                  <div className="mt-1 text-[10px] text-white/25">
                    {event.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          ARCHIVE
      ================================= */}

      <section
        id="archive"
        className="mx-auto max-w-7xl px-6 py-28 md:py-40"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono text-[9px] tracking-[0.35em] text-[#e4a25b]">
              THE ARCHIVE
            </div>

            <h2 className="serif mt-5 text-5xl md:text-7xl">
              The machines.
            </h2>
          </div>

          <div className="panel flex w-full items-center gap-3 rounded-none px-4 py-3 md:w-80">
            <SearchIcon
              size={15}
              className="text-white/25"
            />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search the archive…"
              className="w-full bg-transparent text-xs outline-none placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full border px-3 py-2 text-[8px] uppercase tracking-[.16em] transition ${
                filter === item
                  ? "border-[#e4a25b]/60 bg-[#e4a25b]/10 text-[#e4a25b]"
                  : "border-white/10 text-white/35 hover:text-white/60"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {filtered.map((spacecraftItem) => (
            <button
              key={spacecraftItem.id}
              onClick={() =>
                openDetail(
                  "spacecraft",
                  spacecraftItem.id
                )
              }
              className="group bg-[#04060a] p-6 text-left transition hover:bg-[#080b12] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mono text-[8px] tracking-[.22em] text-[#e4a25b]">
                    {spacecraftItem.year} ·{" "}
                    {spacecraftItem.category}
                  </div>

                  <h3 className="serif mt-2 text-2xl md:text-3xl">
                    {spacecraftItem.name}
                  </h3>
                </div>

                <ArrowUpRight
                  size={15}
                  className="text-white/20 transition group-hover:text-white/60"
                />
              </div>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
                {spacecraftItem.note}
              </p>

              <div className="mono mt-6 grid grid-cols-2 gap-4 text-[8px] uppercase tracking-[.16em] text-white/22">
                <span>{spacecraftItem.launcher}</span>
                <span>{spacecraftItem.status}</span>
              </div>
            </button>
          ))}

          {!filtered.length && (
            <div className="col-span-full py-16 text-center text-sm text-white/30">
              No spacecraft match your current search
              and filter.
            </div>
          )}
        </div>

        <div className="mono mt-4 text-[8px] text-white/20">
          {filtered.length} records shown from the
          DAROYA showcase archive.
        </div>
      </section>

      {/* ================================
          LAUNCHERS
      ================================= */}

      <section
        id="launchers"
        className="border-y border-white/10 bg-[#05070c]"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-14 md:grid-cols-[.85fr_1.15fr]">
            <div>
              <div className="mono text-[9px] tracking-[0.35em] text-[#e4a25b]">
                LAUNCH VEHICLES
              </div>

              <h2 className="serif mt-5 text-5xl md:text-7xl">
                The ascent.
              </h2>

              <p className="mt-7 max-w-md text-sm leading-8 text-white/38">
                From sounding rockets to PSLV, GSLV,
                LVM3 and SSLV: the launcher story is the
                story of increasing reach, reliability and
                ambition.
              </p>
            </div>

            <div className="space-y-px border-y border-white/10">
              {launchers.map((launcher, index) => (
                <button
                  key={launcher.id}
                  onClick={() =>
                    openDetail(
                      "launcher",
                      launcher.id
                    )
                  }
                  className="grid w-full grid-cols-[80px_1fr_auto] gap-4 py-6 text-left transition hover:bg-white/[.03]"
                >
                  <div className="mono text-[8px] tracking-[.14em] text-white/22">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div>
                    <div className="text-lg text-white/78">
                      {launcher.name}
                    </div>

                    <div className="mt-1 text-xs text-white/25">
                      {launcher.role}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="mono text-[8px] tracking-[.15em] text-[#e4a25b]">
                      {launcher.firstFlight}
                    </div>

                    <div className="mt-1 text-[8px] text-white/25">
                      {launcher.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          MISSIONS
      ================================= */}

      <section
        id="missions"
        className="mx-auto max-w-7xl px-6 py-28 md:py-40"
      >
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="mono text-[9px] tracking-[0.35em] text-[#e4a25b]">
              MISSION ATLAS
            </div>

            <h2 className="serif mt-5 text-5xl md:text-7xl">
              Beyond Earth.
            </h2>
          </div>

          <Rocket
            className="hidden text-white/15 md:block"
            size={44}
          />
        </div>

        <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2">
          {missions.map((mission) => (
            <button
              key={mission.id}
              onClick={() =>
                openDetail("mission", mission.id)
              }
              className="bg-[#04060a] p-8 text-left transition hover:bg-[#080b12] md:p-10"
            >
              <div className="mono text-[8px] tracking-[.24em] text-[#e4a25b]">
                {mission.year} ·{" "}
                {mission.destination}
              </div>

              <h3 className="serif mt-3 text-3xl md:text-4xl">
                {mission.name}
              </h3>

              <p className="mt-5 text-sm leading-8 text-white/38">
                {mission.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-5 text-[8px] uppercase tracking-[.18em] text-white/22">
                <span>{mission.launcher}</span>
                <span>{mission.status}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ================================
          PEOPLE
      ================================= */}

      <section
        id="people"
        className="border-y border-white/10 bg-[#05070c]"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div>
            <div className="mono text-[9px] tracking-[0.35em] text-[#e4a25b]">
              THE PEOPLE
            </div>

            <h2 className="serif mt-5 text-5xl md:text-7xl">
              Who built it.
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-white/38">
              A small, verified set of the people whose
              decisions and engineering shaped this
              record — pioneers, programme leaders,
              scientists and engineers.
            </p>
          </div>

          <div className="mt-12">
            <PeopleExplorer
              onSelect={(id) =>
                openDetail("person", id)
              }
            />
          </div>
        </div>
      </section>

      {/* ================================
          INDIA
      ================================= */}

      <section
        id="india"
        className="mx-auto max-w-7xl px-6 py-28 md:py-40"
      >
        <div>
          <div className="mono text-[9px] tracking-[.35em] text-[#e4a25b]">
            INDIA / SPACE
          </div>

          <h2 className="serif mt-5 text-5xl md:text-7xl">
            Built across the country.
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-8 text-white/38">
            DAROYA keeps the cosmic view connected to
            the physical network beneath it: launch
            ranges, propulsion centres, satellite
            centres, mission operations and
            applications.
          </p>
        </div>

        <div className="mt-14">
          <IndiaMap
            onSelect={(id) =>
              openDetail("centre", id)
            }
          />
        </div>
      </section>

      {/* ================================
          FUTURE
      ================================= */}

      <section
        id="future"
        className="relative overflow-hidden px-6 py-32 md:py-44"
      >
        <div className="absolute inset-0 opacity-30">
          <SpaceScene
            interactive={false}
            activeYear={2026}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,6,10,.08),#04060a_78%)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mono text-[9px] tracking-[.45em] text-white/32">
            THE NEXT HORIZON
          </div>

          <h2 className="serif mt-8 text-6xl leading-[.95] md:text-[9rem]">
            2047.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-sm leading-8 text-white/42 md:text-base">
            A hundred years after independence, the map
            will be different. Every programme below is
            labeled by how firm its status actually is —
            DAROYA never presents an announced aspiration
            as completed.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-16 max-w-5xl text-left">
          <FutureHorizon
            onSelect={(id) =>
              openDetail("future", id)
            }
          />
        </div>

        <div className="relative z-10 mx-auto mt-16 max-w-5xl text-center">
          <div className="inline-flex items-center gap-3 border border-white/10 px-5 py-3 text-[8px] uppercase tracking-[.25em] text-white/35">
            The horizon is not the end
            <ChevronRight size={13} />
          </div>
        </div>
      </section>

      {/* ================================
          FOOTER
      ================================= */}

      <footer className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="serif text-2xl">
              DAROYA
            </div>

            <div className="mono mt-2 text-[8px] tracking-[.24em] text-white/20">
              A JOURNEY BEYOND THE HORIZON
            </div>
          </div>

          <div className="max-w-md text-[9px] leading-5 text-white/18">
            Built as an interactive historical
            visualization. Core factual references are
            drawn from ISRO&apos;s public mission,
            spacecraft, launcher and timeline pages.
            This build intentionally distinguishes
            archival visualization from live orbital
            telemetry.
          </div>
        </div>
      </footer>

      {/* ================================
          SEARCH
      ================================= */}

      {searchOpen && (
        <GlobalSearch
          onClose={() => setSearchOpen(false)}
          onSelect={handleSearchSelect}
        />
      )}

      {/* ================================
          DETAIL PANEL
      ================================= */}

      {detailRef && (
        <DetailPanel
          kind={detailRef.kind}
          id={detailRef.id}
          onClose={closeDetail}
        />
      )}
    </main>
  );
}