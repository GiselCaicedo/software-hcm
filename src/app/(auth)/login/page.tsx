"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { MOCK_USERS } from "@/lib/mock-data/users";
import { Role } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrador",
  th: "Talento Humano",
  lider: "Líder",
  evaluado: "Evaluado",
};

const ROLE_COLORS: Record<Role, string> = {
  admin: "bg-purple-100 text-purple-700 border-purple-200",
  th: "bg-blue-100 text-blue-700 border-blue-200",
  lider: "bg-amber-100 text-amber-700 border-amber-200",
  evaluado: "bg-green-100 text-green-700 border-green-200",
};

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    if (!selectedUser) {
      toast.error("Selecciona un usuario");
      return;
    }
    login(selectedUser);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">INMOV</h1>
          <p className="text-blue-200 text-lg font-medium mb-4">Sistema de Evaluación de Desempeño</p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Gestiona evaluaciones 90°, 180° y 360°, competencias por nivel jerárquico,
            firmas digitales con validez legal y planes de desarrollo con IA.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {["Evaluaciones con IA generativa", "Firmas digitales Ley 527/1999", "9-Box Grid y Analytics", "Compliance Decreto 1373"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-blue-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden justify-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
          </div>

          <Card className="shadow-2xl border-0 bg-white">
            <CardContent className="p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Acceder al sistema</h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Selecciona un usuario demo para continuar
                </p>
              </div>

              {/* Lista de usuarios */}
              <div className="space-y-2 mb-5 max-h-72 overflow-y-auto pr-1">
                {MOCK_USERS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUser(u.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                      selectedUser === u.id
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <img src={u.avatar} alt={u.nombre} className="h-9 w-9 rounded-full bg-gray-100 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{u.nombre}</p>
                      <p className="text-xs text-gray-500 truncate">{u.cargo} · {u.departamento}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {u.roles.map((r) => (
                        <span key={r} className={cn("text-xs px-1.5 py-0.5 rounded border font-medium", ROLE_COLORS[r])}>
                          {ROLE_LABELS[r]}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleLogin}
                disabled={!selectedUser}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Ingresar
              </Button>

              <p className="text-xs text-center text-gray-400 mt-4">
                Sistema de demostración · INMOV 2026
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
