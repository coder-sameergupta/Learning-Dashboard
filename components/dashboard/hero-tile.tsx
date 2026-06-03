"use client";

import { motion } from "framer-motion";
import { Flame, Zap, BookOpen } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
}

export function HeroTile({ name, streak }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <article
      className="relative overflow-hidden rounded-2xl p-6 md:p-8"
      style={{
        background: "linear-gradient(135deg, #0d1829 0%, #0f1f3a 50%, #130d2a 100%)",
        border: "1px solid var(--border-dim)",
      }}
    >
      <div className="noise-bg absolute inset-0 rounded-2xl pointer-events-none" />

      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 65%)" }}
      />
      <div
        className="absolute -bottom-10 left-10 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
            {greeting}
          </p>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
          >
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {name}
            </span>
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Keep up the momentum — you&apos;re on a roll.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip icon={<Zap size={13} />} label="3 tasks due" color="#3b82f6" />
            <Chip icon={<BookOpen size={13} />} label="4 courses active" color="#8b5cf6" />
          </div>
        </div>

        <div
          className="flex flex-row sm:flex-col items-center gap-3 sm:gap-1 px-5 py-4 sm:px-6 sm:py-4 rounded-2xl self-start"
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.22)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <Flame size={26} style={{ color: "#f59e0b" }} />
          </motion.div>
          <div className="flex flex-col items-center">
            <span
              className="text-3xl font-bold leading-none"
              style={{ fontFamily: "Syne, sans-serif", color: "#f59e0b" }}
            >
              {streak}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest mt-0.5"
              style={{ color: "rgba(245,158,11,0.6)" }}
            >
              day streak
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Chip({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
      style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}
    >
      {icon}
      {label}
    </div>
  );
}