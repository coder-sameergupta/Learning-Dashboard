"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: number;
}

export function ProgressBar({ value, color = "#3b82f6", height = 4 }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div
      ref={ref}
      className="w-full rounded-full overflow-hidden"
      style={{
        height: `${height}px`,
        background: "var(--bg-subtle)",
      }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          boxShadow: `0 0 8px ${color}60`,
        }}
        initial={{ width: "0%" }}
        animate={inView ? { width: `${value}%` } : { width: "0%" }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
      />
    </div>
  );
}
