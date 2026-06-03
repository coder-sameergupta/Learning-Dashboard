import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { BentoGrid } from "@/components/dashboard/bento-grid";
import { DashboardSkeletons } from "@/components/dashboard/skeletons";
import type { Course } from "@/types/course";

// Static for this prototype; in prod this would come from auth session
const USER = { name: "Alex", streak: 14 };

async function CourseData() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    // Render gracefully — don't crash the whole page
    return (
      <BentoGrid
        courses={[]}
        user={USER}
        fetchError="Could not load courses. Check your Supabase connection."
      />
    );
  }

  return <BentoGrid courses={(data as Course[]) ?? []} user={USER} />;
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={<DashboardSkeletons />}>
          <CourseData />
        </Suspense>
      </main>
    </div>
  );
}
