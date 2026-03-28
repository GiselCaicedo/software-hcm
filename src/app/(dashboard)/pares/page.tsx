"use client";
import { useState } from "react";
import { MOCK_PARES } from "@/lib/mock-data/pdi";
import { getUserById, MOCK_USERS } from "@/lib/mock-data/users";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, X, Sparkles, Users, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIA_LABELS: Record<string, string> = {
  par: "Par",
  subordinado: "Subordinado",
  cliente_interno: "Cliente interno",
};

const CATEGORIA_COLORS: Record<string, string> = {
  par: "bg-blue-100 text-blue-700",
  subordinado: "bg-purple-100 text-purple-700",
  cliente_interno: "bg-amber-100 text-amber-700",
};

export default function ParesPage() {
  const { activeRole, currentUser } = useAuthStore();
  const seleccion = MOCK_PARES[0];
  const evaluado = getUserById(seleccion.evaluadoId);
  const [aprobados, setAprobados] = useState<string[]>(seleccion.paresAprobados);

  const toggle = (uid: string) => {
    setAprobados((a) => a.includes(uid) ? a.filter((x) => x !== uid) : [...a, uid]);
  };

  const handleApprove = () => {
    if (aprobados.length < 3) {
      toast.error("Se requieren mínimo 3 pares para garantizar anonimato");
      return;
    }
    toast.success("Lista de pares aprobada. Se enviarán las invitaciones.");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Selección de Pares 360°</h1>
        <p className="text-sm text-gray-500 mt-1">
          El algoritmo sugiere evaluadores basados en interacción laboral y estructura organizacional
        </p>
      </div>

      {/* Evaluado */}
      {evaluado && (
        <Card className="border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <img src={evaluado.avatar} alt={evaluado.nombre} className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm text-gray-900">{evaluado.nombre}</p>
              <p className="text-xs text-gray-500">{evaluado.cargo} · {evaluado.departamento}</p>
            </div>
            <Badge className={cn(
              "ml-auto text-xs",
              seleccion.estadoAprobacion === "aprobado" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            )}>
              {seleccion.estadoAprobacion === "aprobado" ? "Aprobado" : "Pendiente TH"}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Info anonimato */}
      <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 flex gap-2 text-sm text-blue-800">
        <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
        <span>Los resultados de los pares se muestran de forma <strong>agregada y anónima</strong>. Se requieren mínimo 3 pares por categoría para proteger la identidad.</span>
      </div>

      {/* Sugerencias IA */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <h2 className="font-semibold text-gray-800 text-sm">Sugerencias del algoritmo IA</h2>
          <Badge className="bg-purple-100 text-purple-700 text-xs">{seleccion.sugerenciasIA.length} candidatos</Badge>
        </div>

        {seleccion.sugerenciasIA.map((sug) => {
          const user = getUserById(sug.usuarioId);
          const isSelected = aprobados.includes(sug.usuarioId);
          if (!user) return null;
          return (
            <div
              key={sug.usuarioId}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border transition-all",
                isSelected ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-white hover:border-gray-200"
              )}
            >
              <img src={user.avatar} alt={user.nombre} className="h-9 w-9 rounded-full shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm text-gray-800">{user.nombre}</p>
                  <Badge className={cn("text-xs", CATEGORIA_COLORS[sug.categoria])}>
                    {CATEGORIA_LABELS[sug.categoria]}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 truncate">{user.cargo} · {user.departamento}</p>
                <p className="text-xs text-gray-400 mt-1">{sug.justificacion}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {/* Score */}
                <div className="text-center">
                  <div className="relative h-9 w-9">
                    <svg className="h-9 w-9 -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="3"
                        strokeDasharray={`${(sug.score / 100) * 88} 88`} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-600">
                      {sug.score}
                    </span>
                  </div>
                </div>
                {activeRole === "th" || activeRole === "admin" ? (
                  <button
                    onClick={() => toggle(sug.usuarioId)}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                      isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 hover:bg-blue-100"
                    )}
                  >
                    {isSelected ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </button>
                ) : isSelected ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {(activeRole === "th" || activeRole === "admin") && (
        <div className="flex items-center justify-between pb-8">
          <p className="text-sm text-gray-500">
            {aprobados.length} pares seleccionados · mínimo 3 requerido
          </p>
          <Button onClick={handleApprove} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <CheckCircle2 className="h-4 w-4" />
            Aprobar y enviar invitaciones
          </Button>
        </div>
      )}
    </div>
  );
}
