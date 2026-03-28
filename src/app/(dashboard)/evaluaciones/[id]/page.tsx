"use client";
import { use } from "react";
import { MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { getUserById } from "@/lib/mock-data/users";
import { useAuthStore } from "@/stores/authStore";
import { WORKFLOW_LABELS, getStatusColor, canAdvance, getNextState } from "@/lib/utils/workflow";
import { WorkflowStepper } from "@/components/evaluaciones/WorkflowStepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";
import { canAccess } from "@/lib/utils/permissions";

export default function EvaluacionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { activeRole, currentUser } = useAuthStore();
  const ev = MOCK_EVALUACIONES.find((e) => e.id === id);

  if (!ev) return <div className="p-8 text-center text-gray-400">Evaluación no encontrada</div>;

  const nextState = getNextState(ev.estado);
  const canGoNext = activeRole ? canAdvance(ev.estado, activeRole) : false;

  const getActionUrl = () => {
    if (ev.estado === "autocalificacion" || ev.estado === "calificacion_lider")
      return `/evaluaciones/${id}/formulario`;
    if (ev.estado === "revision_th") return `/evaluaciones/${id}/revision-th`;
    return null;
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ButtonLink href="/evaluaciones" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{ev.nombre}</h1>
          <p className="text-sm text-gray-500">Evaluación {ev.tipo}° · {ev.anio}</p>
        </div>
        <Badge className={getStatusColor(ev.estado)}>{WORKFLOW_LABELS[ev.estado]}</Badge>
      </div>

      {/* Workflow */}
      {ev.estado !== "cerrada" && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600">Flujo de evaluación</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkflowStepper currentState={ev.estado} />
            {canGoNext && getActionUrl() && (
              <div className="mt-4 flex justify-end">
                <ButtonLink href={getActionUrl()!} className="gap-2">
                    Continuar — {WORKFLOW_LABELS[ev.estado]}
                    <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Participantes */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-600">
            Participantes ({ev.participantes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ev.participantes.map((result) => {
              const user = getUserById(result.usuarioId);
              if (!user) return null;
              return (
                <div key={result.usuarioId} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <img src={user.avatar} alt={user.nombre} className="h-8 w-8 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{user.nombre}</p>
                    <p className="text-xs text-gray-400">{user.cargo} · {user.departamento}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {result?.puntajeObjetivos && (
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">{result.puntajeObjetivos.toFixed(1)}</p>
                        <p className="text-gray-400">Obj.</p>
                      </div>
                    )}
                    {result?.puntajeCompetencias && (
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">{result.puntajeCompetencias.toFixed(1)}</p>
                        <p className="text-gray-400">Comp.</p>
                      </div>
                    )}
                    {result?.puntajeFinal && (
                      <div className="text-center">
                        <p className="font-bold text-blue-600">{result.puntajeFinal.toFixed(1)}</p>
                        <p className="text-gray-400">Final</p>
                      </div>
                    )}
                    {result?.firmadoLider && result?.firmadoColaborador ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Info card */}
      <Card className="border shadow-sm">
        <CardContent className="p-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400">Inicio</p>
            <p className="text-sm font-semibold text-gray-800">{new Date(ev.fechaInicio).toLocaleDateString("es-CO")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Cierre</p>
            <p className="text-sm font-semibold text-gray-800">{new Date(ev.fechaFin).toLocaleDateString("es-CO")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tipo</p>
            <p className="text-sm font-semibold text-gray-800">Evaluación {ev.tipo}°</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
