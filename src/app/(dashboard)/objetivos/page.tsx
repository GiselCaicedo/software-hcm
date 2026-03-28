"use client";
import { MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Target, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ObjetivoEvaluado } from "@/types";

const ESTADO_CONFIG = {
  completado:  { label: "Completado",  icon: CheckCircle2, color: "text-green-600",  bg: "bg-green-50",  badge: "bg-green-100 text-green-700" },
  en_progreso: { label: "En progreso", icon: Clock,         color: "text-blue-600",   bg: "bg-blue-50",   badge: "bg-blue-100 text-blue-700" },
  pendiente:   { label: "Pendiente",   icon: AlertCircle,  color: "text-amber-600",  bg: "bg-amber-50",  badge: "bg-amber-100 text-amber-700" },
  cancelado:   { label: "Cancelado",   icon: AlertCircle,  color: "text-gray-400",   bg: "bg-gray-50",   badge: "bg-gray-100 text-gray-500" },
};

export default function ObjetivosPage() {
  const { currentUser, activeRole } = useAuthStore();

  // Ciclo activo (no cerrado) más reciente
  const cicloActivo = MOCK_EVALUACIONES.find((e) => e.estado !== "cerrada")
    ?? MOCK_EVALUACIONES[0];

  // Objetivos del usuario actual dentro del ciclo, o todos si es TH/lider
  let objetivos: (ObjetivoEvaluado & { usuarioId: string; cicloNombre: string })[] = [];

  if (cicloActivo) {
    const participantes =
      activeRole === "evaluado"
        ? cicloActivo.participantes.filter((p) => p.usuarioId === currentUser?.id)
        : cicloActivo.participantes;

    for (const p of participantes) {
      for (const obj of p.objetivos) {
        objetivos.push({ ...obj, usuarioId: p.usuarioId, cicloNombre: cicloActivo.nombre });
      }
    }
  }

  const completados = objetivos.filter((o) => o.estado === "completado").length;
  const promedioAuto =
    objetivos.filter((o) => o.autocalificacion).reduce((acc, o) => acc + (o.autocalificacion ?? 0), 0) /
    (objetivos.filter((o) => o.autocalificacion).length || 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Objetivos del cargo</h1>
          <p className="text-sm text-gray-500 mt-1">
            {cicloActivo?.nombre ?? "Sin ciclo activo"} · {objetivos.length} objetivos
          </p>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{completados}/{objetivos.length}</p>
            <p className="text-xs text-gray-500">Completados</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{promedioAuto.toFixed(1)}/5</p>
            <p className="text-xs text-gray-500">Prom. autocalif.</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {objetivos.reduce((a, o) => a + o.peso, 0)}%
            </p>
            <p className="text-xs text-gray-500">Peso total</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {objetivos.map((obj) => {
          const conf = ESTADO_CONFIG[obj.estado];
          return (
            <Card key={obj.id} className="border shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", conf.bg)}>
                    <Target className={cn("h-4 w-4", conf.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm text-gray-900 truncate">{obj.funcion}</p>
                      <Badge className={cn("text-xs shrink-0", conf.badge)}>{conf.label}</Badge>
                      <Badge variant="outline" className="text-xs shrink-0">{obj.peso}%</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{obj.objetivoSmart}</p>
                    {(obj.autocalificacion || obj.calificacionLider) && (
                      <div className="flex gap-4 text-xs">
                        {obj.autocalificacion && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400">Auto:</span>
                            <span className="font-semibold text-blue-600">{obj.autocalificacion}/5</span>
                          </div>
                        )}
                        {obj.calificacionLider && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400">Líder:</span>
                            <span className="font-semibold text-amber-600">{obj.calificacionLider}/5</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {obj.estado === "completado" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    <ButtonLink
                      href={`/objetivos/${obj.id}`}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-600"
                    >
                      Ver
                    </ButtonLink>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {objetivos.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No hay objetivos asignados en el ciclo activo.
          </div>
        )}
      </div>
    </div>
  );
}
