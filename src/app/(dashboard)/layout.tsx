"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { CalendarPanel } from "@/components/layout/CalendarPanel";
import { cn } from "@/lib/utils";
import { ACTIVE_DASHBOARD_THEME, DASHBOARD_THEMES } from "@/lib/dashboard-theme";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const calendarOpen = useUIStore((s) => s.calendarOpen);
  const router = useRouter();
  const theme = DASHBOARD_THEMES[ACTIVE_DASHBOARD_THEME] ?? DASHBOARD_THEMES.loginWarm;

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: theme.rootBg }}>
      {/* Background theme accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: theme.overlayGradient }} />
        <div className={cn("absolute -top-32 -left-16 w-[420px] h-[420px] rounded-full blur-[110px]", theme.blobs.topLeft)} />
        <div className={cn("absolute top-1/4 right-[-120px] w-[320px] h-[320px] rounded-full blur-[120px]", theme.blobs.topRight)} />
        <div className={cn("absolute bottom-[-120px] left-1/3 w-[360px] h-[360px] rounded-full blur-[120px]", theme.blobs.bottom)} />
      </div>

      {/* TopBar — ancho completo */}
      <div className="relative z-40 w-full">
        <TopBar />
      </div>

      {/* Body */}
      <div className="flex flex-1 relative z-10">
        <Sidebar />
        <main
          className={cn(
            "flex-1 ml-20 min-h-0 flex flex-col transition-[margin] duration-300",
            calendarOpen ? "mr-[340px]" : "mr-0"
          )}
        >
          {children}
        </main>
      </div>

      {/* Panel flotante calendario — fixed sobre todo */}
      <CalendarPanel />
    </div>
  );
}
