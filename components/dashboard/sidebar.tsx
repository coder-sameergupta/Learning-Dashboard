"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", anchor: "section-hero" },
  { id: "courses", icon: BookOpen, label: "My Courses", anchor: "section-courses" },
  { id: "progress", icon: BarChart2, label: "Progress", anchor: "section-activity" },
  { id: "achievements", icon: Trophy, label: "Achievements", anchor: "section-activity" },
];

const BOTTOM_ITEMS = [
  { id: "notifications", icon: Bell, label: "Notifications", anchor: null },
  { id: "settings", icon: Settings, label: "Settings", anchor: null },
];

function scrollTo(anchor: string | null) {
  if (!anchor) return;
  document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Sidebar() {
  const [active, setActive] = useState("dashboard");

  function handleNav(id: string, anchor: string | null) {
    setActive(id);
    scrollTo(anchor);
  }

  return (
    <>
      <nav
        className="sidebar hidden md:flex flex-col shrink-0 h-full py-5"
        style={{
          borderRight: "1px solid var(--border-dim)",
          background: "var(--bg-surface)",
        }}
      >
        <div className="px-[18px] mb-8 flex items-center gap-3 overflow-hidden">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
          >
            <GraduationCap size={18} className="text-white" />
          </div>
          <span
            className="sidebar-label text-base font-bold tracking-tight whitespace-nowrap"
            style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
          >
            Luminary
          </span>
        </div>

        <div className="flex-1 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={() => handleNav(item.id, item.anchor)}
            />
          ))}
        </div>

        <div className="px-2 space-y-0.5 pb-2">
          {BOTTOM_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={() => handleNav(item.id, item.anchor)}
            />
          ))}
          <NavItem
            item={{ id: "logout", icon: LogOut, label: "Log out", anchor: null }}
            isActive={false}
            onClick={() => { }}
            muted
          />
        </div>
      </nav>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-1"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-dim)",
          height: "60px",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <MobileNavItem
            key={item.id}
            item={item}
            isActive={active === item.id}
            onClick={() => handleNav(item.id, item.anchor)}
          />
        ))}
      </nav>
    </>
  );
}

function NavItem({
  item,
  isActive,
  onClick,
  muted = false,
}: {
  item: { id: string; icon: React.ElementType; label: string; anchor: string | null };
  isActive: boolean;
  onClick: () => void;
  muted?: boolean;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      title={item.label}
      className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors overflow-hidden"
      style={{
        color: muted
          ? "var(--text-dim)"
          : isActive
            ? "var(--text-primary)"
            : "var(--text-secondary)",
      }}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-pill"
          className="absolute inset-0 rounded-xl"
          style={{ background: "var(--bg-subtle)" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10 shrink-0">
        <Icon size={18} />
      </span>
      <span className="sidebar-label relative z-10 truncate">
        {item.label}
      </span>
    </button>
  );
}

function MobileNavItem({
  item,
  isActive,
  onClick,
}: {
  item: { id: string; icon: React.ElementType; label: string };
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-xl"
      style={{ color: isActive ? "#3b82f6" : "var(--text-secondary)" }}
    >
      {isActive && (
        <motion.div
          layoutId="mobile-pill"
          className="absolute inset-0 rounded-xl"
          style={{ background: "var(--bg-subtle)" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10"><Icon size={20} /></span>
      <span className="relative z-10 text-[10px] font-medium leading-none">{item.label}</span>
    </button>
  );
}