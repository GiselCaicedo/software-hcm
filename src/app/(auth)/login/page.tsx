"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@inmov.com");
  const [password, setPassword] = useState("admin");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) router.push("/dashboard");
    else setError("Credenciales incorrectas");
  };

  return (
    <div className="min-h-screen bg-[#F0EFE9] flex">
      {/* Left — decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #FF6A1A 0%, #FF4500 35%, #C03000 65%, #6B0080 100%)" }} />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-white font-black text-xs">IN</span>
            </div>
            <span className="text-white font-bold tracking-widest text-sm">INMOV</span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-white text-6xl font-black uppercase leading-none tracking-tight mb-4">
              TRANSFORMA<br />EL TALENTO<br />DE TU<br />EQUIPO
            </h1>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              Plataforma de evaluación de desempeño que impulsa el crecimiento organizacional.
            </p>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1C1C1E] flex items-center justify-center">
              <span className="text-white font-black text-xs">IN</span>
            </div>
            <span className="font-bold tracking-widest text-sm text-[#1A1A1A]">INMOV</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">Iniciar Sesión</h2>
            <p className="text-sm text-[#6B6B6B]">Accede a tu plataforma de gestión del talento</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1.5 uppercase tracking-wide">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hola@empresa.com"
                className="w-full px-4 py-3 bg-white border border-[#E8E7E2] rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#1C1C1E] focus:ring-2 focus:ring-black/5 transition-all shadow-card"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1.5 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-[#E8E7E2] rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#1C1C1E] focus:ring-2 focus:ring-black/5 transition-all shadow-card pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-[#6B6B6B]">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-brand hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
                {error}
              </div>
            )}

            <button type="submit"
              className="w-full py-3 bg-[#1C1C1E] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-card-md">
              Iniciar Sesión
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E8E7E2]" />
              <span className="text-xs text-[#A0A0A0]">o continúa con</span>
              <div className="flex-1 h-px bg-[#E8E7E2]" />
            </div>

            <button type="button"
              className="w-full py-3 bg-white border border-[#E8E7E2] rounded-xl text-sm text-[#1A1A1A] font-medium hover:bg-[#F7F6F2] transition-colors shadow-card">
              SSO Empresarial
            </button>
          </form>

          <p className="text-center text-xs text-[#A0A0A0] mt-6">
            ¿No tienes cuenta?{" "}
            <span className="text-[#1A1A1A] font-medium cursor-pointer hover:underline">
              Contacta a tu administrador
            </span>
          </p>

          {/* Demo hint */}
          <div className="mt-6 p-3.5 bg-white border border-[#E8E7E2] rounded-xl shadow-card">
            <p className="text-xs font-semibold text-[#6B6B6B] mb-1">Acceso demo:</p>
            <p className="text-xs text-[#A0A0A0]">admin@inmov.com / admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
