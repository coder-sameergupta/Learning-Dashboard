"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { BookOpen } from "lucide-react";
import { ProgressBar } from "./progress-bar";
import type { Course } from "@/types/course";

const ACCENTS = [
  { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", glow: "rgba(59,130,246,0.15)" },
  { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", glow: "rgba(139,92,246,0.15)" },
  { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", glow: "rgba(6,182,212,0.15)" },
  { color: "#10b981", bg: "rgba(16,185,129,0.1)", glow: "rgba(16,185,129,0.15)" },
];

export function CourseCard({ course, index }: { course: Course; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const Icon =
    (LucideIcons as unknown as Record<string, React.ElementType>)[course.icon_name] ?? BookOpen;

  return (
    <motion.article
      className="relative overflow-hidden rounded-2xl p-5 flex flex-col gap-4 cursor-default w-full"
      style={{
        background: "linear-gradient(145deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)",
        border: "1px solid var(--border-dim)",
      }}
      whileHover={{
        scale: 1.018,
        borderColor: `${accent.color}50`,
        boxShadow: `0 0 28px ${accent.glow}, 0 8px 32px rgba(0,0,0,0.5)`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top right, ${accent.glow} 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="p-2.5 rounded-xl" style={{ background: accent.bg }}>
          <Icon size={20} style={{ color: accent.color }} />
        </div>
        <span className="text-xs font-bold tabular-nums mt-1" style={{ color: accent.color }}>
          {course.progress}%
        </span>
      </div>

      <div className="relative z-10 flex-1">
        <h3
          className="text-sm font-semibold leading-snug"
          style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
        >
          {course.title}
        </h3>
      </div>

      <div className="relative z-10 space-y-2">
        <ProgressBar value={course.progress} color={accent.color} height={5} />
        <div className="flex items-center justify-between">
          <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
            {course.progress < 100 ? "In progress" : "Completed ✓"}
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
            {course.progress}/100
          </p>
        </div>
      </div>
    </motion.article>
  );
}