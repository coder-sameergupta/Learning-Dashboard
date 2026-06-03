import { DashboardSkeletons } from "@/components/dashboard/skeletons";

export default function DashboardLoading() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Sidebar placeholder */}
      <div className="w-[72px] lg:w-60 shrink-0 border-r" style={{ borderColor: "var(--border-dim)" }} />
      <main className="flex-1 overflow-y-auto">
        <DashboardSkeletons />
      </main>
    </div>
  );
}
