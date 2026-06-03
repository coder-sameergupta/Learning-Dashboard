"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const SEED = [0, 0, 1, 0, 2, 3, 1, 0, 0, 2, 4, 3, 1, 0, 0, 1, 2, 3, 4, 2, 1, 0, 0, 3, 4, 3, 2, 1, 0, 1, 2, 0, 3, 4, 2, 1, 0, 0, 1, 3, 2, 4, 1, 0, 2, 3, 1, 0, 0, 2, 3, 4, 1, 0, 1, 2, 0, 3, 2, 1, 4, 0, 0, 1, 2, 3, 0, 1, 4, 2, 0, 0, 1, 3, 2, 1, 0, 0, 2, 1, 3, 4, 1, 0];

const LEVELS = [
  "var(--bg-subtle)",
  "rgba(59,130,246,0.2)",
  "rgba(59,130,246,0.4)",
  "rgba(59,130,246,0.65)",
  "#3b82f6",
];

const DAYS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

export function ActivityTile() {
  const weeks = Array.from({ length: 12 }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => SEED[(wi * 7 + di) % SEED.length])
  );

  const totalSessions = SEED.reduce((a, b) => a + b, 0);

  return (
    <article
      className="relative overflow-hidden rounded-2xl p-5 md:p-6"
      style={{
        background: "linear-gradient(145deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)",
        border: "1px solid var(--border-dim)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(6,182,212,0.1) 0%, transparent 60%)" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Activity size={16} style={{ color: "#06b6d4" }} />
            <h2
              className="text-sm font-semibold"
              style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
            >
              Learning Activity
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs hidden sm:block" style={{ color: "var(--text-secondary)" }}>
              {totalSessions} sessions · 12 weeks
            </span>
            <span className="text-xs sm:hidden" style={{ color: "var(--text-secondary)" }}>
              12 weeks
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col justify-around pb-0.5" style={{ gap: "2px" }}>
            {DAYS.map((d, i) => (
              <span
                key={i}
                className="text-[9px] leading-none"
                style={{
                  color: "var(--text-dim)",
                  height: "clamp(10px, 2vw, 14px)",
                  lineHeight: "clamp(10px, 2vw, 14px)",
                }}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px] flex-1 overflow-hidden">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px] flex-1">
                {week.map((level, di) => (
                  <motion.div
                    key={di}
                    className="rounded-[3px] w-full"
                    style={{
                      background: LEVELS[level],
                      aspectRatio: "1",
                      maxWidth: "18px",
                      maxHeight: "18px",
                      minHeight: "10px",
                    }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (wi * 7 + di) * 0.006,
                      type: "spring",
                      stiffness: 400,
                      damping: 22,
                    }}
                    whileHover={{ scale: 1.35 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-4">
          <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>Less</span>
          {LEVELS.map((bg, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: bg }} />
          ))}
          <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>More</span>
        </div>
      </div>
    </article>
  );
}