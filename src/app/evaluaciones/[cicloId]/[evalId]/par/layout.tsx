// Layout limpio para la vista del par — sin sidebar ni navbar del dashboard.
// El par puede ser externo o sin acceso completo al sistema.
export default function ParLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0EB" }}>
      {/* Header con logo centrado — spec Nivel 3b */}
      <header className="w-full flex items-center justify-center py-4 border-b border-black/5 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* Logo text fallback si no hay imagen */}
          <div className="w-7 h-7 rounded-lg bg-[#1C1C1E] flex items-center justify-center">
            <span className="text-white text-[10px] font-black">IN</span>
          </div>
          <span className="text-sm font-bold text-[#1A1A1A] tracking-tight">INMOV</span>
        </div>
      </header>
      {children}
    </div>
  );
}
