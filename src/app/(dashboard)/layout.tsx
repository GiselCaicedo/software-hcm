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
      {/* Background — blobs difuminados abajo-derecha como puntos de color */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blob principal — naranja/melocotón, abajo a la derecha */}
        <div className={cn("absolute bottom-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full blur-[130px]", theme.blobs.topRight)} />
        {/* Blob secundario — morado, más abajo y más al centro-derecha */}
        <div className={cn("absolute bottom-[-40px] right-[20%] w-[300px] h-[300px] rounded-full blur-[110px]", theme.blobs.topLeft)} />
        {/* Blob terciario — amarillo suave, esquina inferior derecha profunda */}
        <div className={cn("absolute bottom-[-60px] right-[5%] w-[260px] h-[260px] rounded-full blur-[100px]", theme.blobs.bottom)} />
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
            "flex-1 ml-20 min-h-0 flex flex-col transition-[margin] duration-300 max-md:ml-0 max-md:mb-16",
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
