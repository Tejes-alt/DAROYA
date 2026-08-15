"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HeroSequenceProps {
  onComplete: () => void;
}

type Phase =
  | "stars"
  | "earth"
  | "orbits"
  | "spacecraft"
  | "title"
  | "complete";

const PHASE_DURATION: Record<Phase, number> = {
  stars: 1600,
  earth: 1600,
  orbits: 1600,
  spacecraft: 1800,
  title: 3500,
  complete: 0,
};

export default function HeroSequence({
  onComplete,
}: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>("stars");

  /*
   * Complete the introduction
   */
  const finish = () => {
    if (completedRef.current) return;

    completedRef.current = true;
    setPhase("complete");
    onComplete();
  };

  /*
   * Phase controller
   */
  useEffect(() => {
    if (phase === "complete") return;

    const nextPhase: Record<Phase, Phase> = {
      stars: "earth",
      earth: "orbits",
      orbits: "spacecraft",
      spacecraft: "title",
      title: "complete",
      complete: "complete",
    };

    const timer = window.setTimeout(() => {
      const next = nextPhase[phase];

      if (next === "complete") {
        finish();
      } else {
        setPhase(next);
      }
    }, PHASE_DURATION[phase]);

    return () => window.clearTimeout(timer);
  }, [phase]);

  /*
   * Canvas animation
   */
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;
    let mounted = true;

    /*
     * Canvas sizing
     */
    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    /*
     * Star field
     */
    const stars = Array.from(
      { length: 260 },
      () => ({
        x: Math.random(),
        y: Math.random(),
        size:
          Math.random() * 1.5 + 0.2,
        opacity:
          Math.random() * 0.55 + 0.2,
        twinkle:
          Math.random() * Math.PI * 2,
      })
    );

    /*
     * Animation
     */
    const animate = (now: number) => {
      if (!mounted) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * Background
       */
      ctx.fillStyle = "#04060a";
      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * Stars
       */
      for (const star of stars) {
        const twinkle =
          star.opacity +
          Math.sin(
            now * 0.001 +
              star.twinkle
          ) *
            0.08;

        ctx.fillStyle = `rgba(
          244,
          240,
          232,
          ${Math.max(0.08, twinkle)}
        )`;

        ctx.fillRect(
          star.x * width,
          star.y * height,
          star.size,
          star.size
        );
      }

      /*
       * Main composition
       */
      const cx = width * 0.62;
      const cy = height * 0.5;

      /*
       * Earth
       */
      if (phase !== "stars") {
        drawEarth(
          ctx,
          cx,
          cy,
          Math.min(
            width,
            height
          ) * 0.065,
          phase === "earth"
            ? 0.9
            : 1
        );
      }

      /*
       * Orbital paths
       */
      if (
        phase === "orbits" ||
        phase === "spacecraft" ||
        phase === "title"
      ) {
        drawOrbit(
          ctx,
          cx,
          cy,
          120,
          0.28,
          "#e4a25b"
        );

        drawOrbit(
          ctx,
          cx,
          cy,
          175,
          0.4,
          "#6d78ff"
        );

        drawOrbit(
          ctx,
          cx,
          cy,
          230,
          0.24,
          "#d8d2c7"
        );
      }

      /*
       * Spacecraft
       */
      if (
        phase === "spacecraft" ||
        phase === "title"
      ) {
        drawSpacecraft(
          ctx,
          cx,
          cy,
          now
        );
      }

      /*
       * Observatory scan line
       */
      if (phase !== "stars") {
        const scan =
          (Math.sin(
            now * 0.0004
          ) +
            1) *
          0.5;

        ctx.strokeStyle = `rgba(
          228,
          162,
          91,
          ${0.025 + scan * 0.035}
        )`;

        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(
          0,
          height * 0.5
        );
        ctx.lineTo(
          width,
          height * 0.5
        );
        ctx.stroke();
      }

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () => {
      mounted = false;

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
      }}
      className="absolute inset-0 z-[100] flex h-full w-full items-center justify-center overflow-hidden bg-[#04060a]"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,.5)_100%)]" />

      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_50%,rgba(70,100,160,.08),transparent_35%)]" />

      {/* Main content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center">
        {/* Title */}
        {(phase === "title" ||
          phase === "complete") && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="space-y-7"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 1,
              }}
              className="text-[9px] uppercase tracking-[0.5em] text-[#e4a25b]/70"
            >
              INDIA · SPACE · HORIZON
            </motion.div>

            <h1 className="text-6xl font-light tracking-[0.18em] text-white md:text-8xl">
              DAROYA
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 1,
              }}
              className="text-lg font-light tracking-[0.12em] text-white/55 md:text-2xl"
            >
              A journey beyond the
              horizon.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1,
                duration: 1,
              }}
              className="pt-3 text-[9px] uppercase tracking-[0.35em] text-white/30"
            >
              1947 — 2026
            </motion.div>
          </motion.div>
        )}

        {/* Initialization indicator */}
        {(phase === "stars" ||
          phase === "earth" ||
          phase === "orbits" ||
          phase === "spacecraft") && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="absolute bottom-16 flex flex-col items-center gap-4"
          >
            <div className="flex items-end gap-1">
              {[0, 1, 2, 3].map(
                (i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: [
                        8,
                        24,
                        8,
                      ],
                      opacity: [
                        0.25,
                        1,
                        0.25,
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.1,
                      delay:
                        i * 0.12,
                      ease: "easeInOut",
                    }}
                    className="block w-[2px] bg-[#e4a25b]"
                  />
                )
              )}
            </div>

            <motion.span
              key={phase}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-[9px] uppercase tracking-[0.28em] text-white/35"
            >
              {phase === "stars" &&
                "Establishing star field"}

              {phase === "earth" &&
                "Locating Earth"}

              {phase === "orbits" &&
                "Mapping orbital space"}

              {phase ===
                "spacecraft" &&
                "Tracking spacecraft"}
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Skip */}
      {phase !== "complete" && (
        <motion.button
          type="button"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
          onClick={finish}
          className="absolute bottom-6 right-6 z-20 rounded border border-white/15 bg-black/20 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white/45 backdrop-blur transition hover:border-[#e4a25b]/50 hover:text-[#e4a25b]"
        >
          Skip introduction
        </motion.button>
      )}
    </motion.div>
  );
}

/*
 * Earth
 */
function drawEarth(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  opacity: number
) {
  const gradient =
    ctx.createRadialGradient(
      x - radius * 0.35,
      y - radius * 0.35,
      radius * 0.1,
      x,
      y,
      radius
    );

  gradient.addColorStop(
    0,
    `rgba(150,190,225,${
      0.9 * opacity
    })`
  );

  gradient.addColorStop(
    0.65,
    `rgba(55,110,170,${
      0.7 * opacity
    })`
  );

  gradient.addColorStop(
    1,
    `rgba(15,35,80,${
      0.35 * opacity
    })`
  );

  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  );
  ctx.fill();

  /*
   * Atmosphere
   */
  ctx.strokeStyle = `rgba(
    150,
    190,
    225,
    ${0.35 * opacity}
  )`;

  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius + 7,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  /*
   * Inner atmospheric glow
   */
  ctx.strokeStyle = `rgba(
    120,
    170,
    220,
    ${0.12 * opacity}
  )`;

  ctx.lineWidth = 4;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius + 3,
    0,
    Math.PI * 2
  );

  ctx.stroke();
}

/*
 * Orbital path
 */
function drawOrbit(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  tilt: number,
  color: string
) {
  ctx.save();

  ctx.translate(x, y);

  ctx.rotate(tilt);

  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = 1;

  ctx.setLineDash([
    4,
    8,
  ]);

  ctx.beginPath();

  ctx.ellipse(
    0,
    0,
    radius,
    radius * 0.34,
    0,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  ctx.setLineDash([]);

  ctx.restore();
}

/*
 * Spacecraft
 */
function drawSpacecraft(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  time: number
) {
  const objects = [
    {
      name: "CHANDRAYAAN",
      radius: 120,
      angle: 0.4,
    },
    {
      name: "ASTROSAT",
      radius: 175,
      angle: 2.1,
    },
    {
      name: "ADITYA-L1",
      radius: 230,
      angle: 4.5,
    },
  ];

  objects.forEach(
    (object) => {
      const angle =
        object.angle +
        time * 0.00015;

      const px =
        x +
        Math.cos(angle) *
          object.radius;

      const py =
        y +
        Math.sin(angle) *
          object.radius *
          0.34;

      /*
       * Glow
       */
      const glow =
        ctx.createRadialGradient(
          px,
          py,
          0,
          px,
          py,
          15
        );

      glow.addColorStop(
        0,
        "rgba(228,162,91,.35)"
      );

      glow.addColorStop(
        1,
        "rgba(228,162,91,0)"
      );

      ctx.fillStyle = glow;

      ctx.beginPath();

      ctx.arc(
        px,
        py,
        15,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /*
       * Spacecraft point
       */
      ctx.fillStyle =
        "#e4a25b";

      ctx.beginPath();

      ctx.arc(
        px,
        py,
        3,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /*
       * Tracking ring
       */
      ctx.strokeStyle =
        "rgba(228,162,91,.28)";

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.arc(
        px,
        py,
        8,
        0,
        Math.PI * 2
      );

      ctx.stroke();

      /*
       * Label
       */
      ctx.fillStyle =
        "rgba(244,240,232,.5)";

      ctx.font =
        "9px monospace";

      ctx.textAlign = "center";

      ctx.fillText(
        object.name,
        px,
        py + 18
      );
    }
  );
}