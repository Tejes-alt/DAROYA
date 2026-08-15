"use client";

import { motion } from "framer-motion";
import {
  X,
  Rocket,
  Satellite,
  Globe2,
  Orbit,
  Calendar,
  Activity,
  ArrowUpRight,
  Layers3,
  Gauge,
  CircleDot,
} from "lucide-react";

import { spacecraft } from "@/data/spacecraft";
import { missions } from "@/data/missions";
import { launchers } from "@/data/launchers";

interface DetailPanelProps {
  kind: string;
  id: string;
  onClose: () => void;
}

type Entity = any;

export default function DetailPanel({
  kind,
  id,
  onClose,
}: DetailPanelProps) {
  let entity: Entity = null;

  if (kind === "spacecraft") {
    entity = spacecraft.find((s) => s.id === id);
  } else if (kind === "mission") {
    entity = missions.find((m) => m.id === id);
  } else if (kind === "launcher") {
    entity = launchers.find((l) => l.id === id);
  }

  if (!entity) return null;

  const isMission = kind === "mission";
  const isSpacecraft = kind === "spacecraft";
  const isLauncher = kind === "launcher";

  const title = entity.name ?? "Unknown";

  const typeLabel = isMission
    ? entity.type ?? entity.destination ?? "Mission"
    : isSpacecraft
      ? entity.category ?? "Spacecraft"
      : entity.role ?? "Launch Vehicle";

  const description =
    entity.summary ??
    entity.description ??
    entity.note ??
    "No additional information is available for this record.";

  const status = entity.status ?? "Unknown";

  const accent =
    status === "Operational"
      ? "text-emerald-300"
      : status === "Ended" ||
          status === "Retired" ||
          status === "Mission complete"
        ? "text-white/55"
        : "text-[#e4a25b]";

  return (
    <>
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default bg-black/45 backdrop-blur-[2px]"
      />

      {/* Panel */}
      <motion.aside
        initial={{ opacity: 0, x: 520 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 520 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 32,
          mass: 0.8,
        }}
        className="
          fixed right-0 top-0 bottom-0 z-50
          flex w-full max-w-[500px] flex-col
          overflow-hidden
          border-l border-white/[0.09]
          bg-[#050607]/[0.97]
          shadow-[-30px_0_100px_rgba(0,0,0,0.55)]
        "
      >
        {/* Top bar */}
        <div className="relative shrink-0 border-b border-white/[0.08]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e4a25b]/50 to-transparent" />

          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
                {isMission ? (
                  <Rocket size={14} className="text-[#e4a25b]" />
                ) : isSpacecraft ? (
                  <Satellite size={14} className="text-[#e4a25b]" />
                ) : (
                  <Rocket size={14} className="text-[#e4a25b]" />
                )}
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/35">
                {kind} dossier
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full border border-white/10
                text-white/45 transition
                hover:border-white/20
                hover:bg-white/[0.05]
                hover:text-white
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Hero */}
          <section className="relative overflow-hidden px-6 pb-8 pt-8">
            {/* Decorative orbital rings */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/[0.035]" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#e4a25b]/[0.06]" />

            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#e4a25b]">
                  {typeLabel}
                </span>

                <span className="h-px w-8 bg-white/10" />

                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.2em] ${accent}`}
                >
                  {status}
                </span>
              </div>

              <h1 className="max-w-[400px] text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white">
                {title}
              </h1>

              <div className="mt-5 flex items-center gap-3 text-white/35">
                <span className="h-px w-10 bg-white/10" />

                <span className="font-mono text-[8px] uppercase tracking-[0.25em]">
                  Indian Space Programme
                </span>
              </div>
            </div>
          </section>

          {/* Primary facts */}
          <section className="px-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08]">
              <Fact
                icon={<Calendar size={13} />}
                label="Year"
                value={entity.year ?? "—"}
              />

              {isMission && (
                <Fact
                  icon={<Globe2 size={13} />}
                  label="Destination"
                  value={entity.destination ?? entity.type ?? "—"}
                />
              )}

              {isSpacecraft && (
                <Fact
                  icon={<Orbit size={13} />}
                  label="Orbit"
                  value={entity.orbit ?? "—"}
                />
              )}

              {isLauncher && (
                <Fact
                  icon={<Layers3 size={13} />}
                  label="Stages"
                  value={entity.stages ?? "—"}
                />
              )}

              <Fact
                icon={<Rocket size={13} />}
                label="Launcher"
                value={
                  isLauncher
                    ? entity.organization ?? "ISRO"
                    : entity.launcher ?? "—"
                }
              />

              <Fact
                icon={<Activity size={13} />}
                label="Status"
                value={status}
              />
            </div>
          </section>

          {/* Mission / spacecraft / launcher profile */}
          <section className="px-6 pt-8">
            <SectionHeading
              label={
                isMission
                  ? "Mission Profile"
                  : isSpacecraft
                    ? "Spacecraft Profile"
                    : "Vehicle Profile"
              }
            />

            <p className="mt-4 text-[13px] leading-7 text-white/55">
              {description}
            </p>
          </section>

          {/* Mission-specific */}
          {isMission && (
            <>
              <section className="px-6 pt-8">
                <SectionHeading label="Mission Parameters" />

                <div className="mt-4 space-y-0 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  <Parameter
                    label="Destination"
                    value={entity.destination ?? entity.type ?? "—"}
                  />

                  <Parameter
                    label="Launch Vehicle"
                    value={entity.launcher ?? "—"}
                  />

                  <Parameter
                    label="Mission Year"
                    value={entity.year ?? "—"}
                  />

                  <Parameter label="Status" value={status} />
                </div>
              </section>

              {/* Visual mission marker */}
              <section className="px-6 pt-8">
                <SectionHeading label="Mission Record" />

                <div className="mt-4 rounded-lg border border-white/[0.07] bg-white/[0.018] p-5">
                  <div className="flex gap-4">
                    <div className="relative flex w-4 justify-center">
                      <div className="absolute top-3 bottom-[-20px] w-px bg-gradient-to-b from-[#e4a25b]/60 to-transparent" />
                      <div className="relative z-10 mt-1 h-2 w-2 rounded-full bg-[#e4a25b] shadow-[0_0_12px_rgba(228,162,91,0.55)]" />
                    </div>

                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#e4a25b]">
                        {entity.year ?? "—"}
                      </p>

                      <p className="mt-2 text-sm text-white/75">
                        {title}
                      </p>

                      <p className="mt-2 text-[11px] leading-5 text-white/35">
                        Recorded in the DAROYA mission archive.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Spacecraft-specific */}
          {isSpacecraft && (
            <section className="px-6 pt-8">
              <SectionHeading label="Spacecraft Parameters" />

              <div className="mt-4 space-y-0 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                <Parameter
                  label="Category"
                  value={entity.category ?? "—"}
                />

                <Parameter
                  label="Orbit"
                  value={entity.orbit ?? "—"}
                />

                <Parameter
                  label="Launch Vehicle"
                  value={entity.launcher ?? "—"}
                />

                <Parameter label="Operational Status" value={status} />
              </div>
            </section>
          )}

          {/* Launcher-specific */}
          {isLauncher && (
            <section className="px-6 pt-8">
              <SectionHeading label="Vehicle Specifications" />

              <div className="mt-4 grid grid-cols-2 gap-2">
                <SpecCard
                  icon={<Layers3 size={14} />}
                  label="Stages"
                  value={entity.stages}
                />

                <SpecCard
                  icon={<Gauge size={14} />}
                  label="LEO Payload"
                  value={
                    entity.payload_to_leo != null
                      ? `${entity.payload_to_leo} kg`
                      : "—"
                  }
                />

                <SpecCard
                  icon={<Rocket size={14} />}
                  label="Total Launches"
                  value={entity.total_launches ?? "—"}
                />

                <SpecCard
                  icon={<CircleDot size={14} />}
                  label="Success Rate"
                  value={
                    entity.success_rate != null
                      ? `${entity.success_rate}%`
                      : "—"
                  }
                />
              </div>

              <div className="mt-5 space-y-0 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                <Parameter
                  label="First Flight"
                  value={entity.firstFlight ?? entity.maiden_flight_date ?? "—"}
                />

                <Parameter
                  label="Organization"
                  value={entity.organization ?? "—"}
                />

                <Parameter
                  label="Propellant"
                  value={entity.propellant ?? "—"}
                />
              </div>
            </section>
          )}

          {/* Source */}
          {entity.source?.url && (
            <section className="px-6 pb-8 pt-10">
              <a
                href={entity.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center justify-between
                  rounded-lg border border-white/[0.08]
                  bg-white/[0.018] px-4 py-4
                  transition
                  hover:border-[#e4a25b]/30
                  hover:bg-[#e4a25b]/[0.04]
                "
              >
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/30">
                    Archive Source
                  </p>

                  <p className="mt-2 text-xs text-white/60">
                    {entity.source.title ?? "Open source reference"}
                  </p>
                </div>

                <ArrowUpRight
                  size={15}
                  className="text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e4a25b]"
                />
              </a>
            </section>
          )}

          {/* Footer */}
          <div className="border-t border-white/[0.06] px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
                DAROYA ARCHIVE
              </span>

              <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/15">
                {entity.id}
              </span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

/* -------------------------------------------------
   Small reusable UI pieces
-------------------------------------------------- */

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/35">
        {label}
      </span>

      <span className="h-px flex-1 bg-white/[0.07]" />
    </div>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-[#07090b] px-4 py-4">
      <div className="flex items-center gap-2 text-white/25">
        {icon}

        <span className="font-mono text-[8px] uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>

      <p className="mt-3 break-words text-sm text-white/80">{value}</p>
    </div>
  );
}

function Parameter({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-xs text-white/65">
        {value}
      </span>
    </div>
  );
}

function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.018] p-4">
      <div className="text-[#e4a25b]/60">{icon}</div>

      <p className="mt-4 font-mono text-[7px] uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>

      <p className="mt-1 text-sm text-white/75">{value ?? "—"}</p>
    </div>
  );
}