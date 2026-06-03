export function DashboardSkeletons() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl mx-auto space-y-4">
      <Bone className="h-44 rounded-2xl" />
      <Bone className="h-3 w-28 rounded-full" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-5 space-y-4"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-dim)" }}
          >
            <div className="flex justify-between">
              <Bone className="w-10 h-10 rounded-xl" />
              <Bone className="w-8 h-4 rounded-full" />
            </div>
            <Bone className="h-4 w-3/4 rounded-lg" />
            <Bone className="h-3 w-1/2 rounded-lg" />
            <Bone className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>

      <Bone className="h-52 rounded-2xl" />
    </div>
  );
}

function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse ${className ?? ""}`}
      style={{ background: "var(--bg-elevated)" }}
    />
  );
}