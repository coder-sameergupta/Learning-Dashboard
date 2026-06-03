"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { HeroTile } from "./hero-tile";
import { CourseCard } from "./course-card";
import { ActivityTile } from "./activity-tile";
import type { Course, UserProfile } from "@/types/course";

interface BentoGridProps {
  courses: Course[];
  user: UserProfile;
  fetchError?: string;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
} as const;

export function BentoGrid({ courses, user, fetchError }: BentoGridProps) {
  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl mx-auto"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.section id="section-hero" variants={item} className="mb-4 scroll-mt-6">
        <HeroTile name={user.name} streak={user.streak} />
      </motion.section>

      <section id="section-courses" className="mb-4 scroll-mt-6">
        <motion.div variants={item} className="flex items-center justify-between mb-3">
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-dim)", fontFamily: "Syne, sans-serif" }}
          >
            Active Courses
          </h2>
          {courses.length > 0 && (
            <span
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-dim)",
              }}
            >
              {courses.length} enrolled
            </span>
          )}
        </motion.div>

        {fetchError && (
          <motion.div
            variants={item}
            className="flex items-center gap-3 p-4 rounded-xl mb-3"
            style={{
              background: "rgba(239,68,68,0.07)",
              border: "1px solid rgba(239,68,68,0.18)",
              color: "#f87171",
            }}
          >
            <AlertCircle size={15} className="shrink-0" />
            <p className="text-sm">{fetchError}</p>
          </motion.div>
        )}

        {courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, i) => (
              <motion.div key={course.id} variants={item} className="flex">
                <CourseCard course={course} index={i} />
              </motion.div>
            ))}
          </div>
        )}

        {courses.length === 0 && !fetchError && (
          <motion.div
            variants={item}
            className="flex items-center justify-center py-14 rounded-2xl"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-dim)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              No courses yet — start exploring!
            </p>
          </motion.div>
        )}
      </section>

      <motion.section id="section-activity" variants={item} className="scroll-mt-6">
        <ActivityTile />
      </motion.section>
    </motion.div>
  );
}