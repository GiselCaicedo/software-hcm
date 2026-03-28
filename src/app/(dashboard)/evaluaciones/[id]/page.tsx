"use client";

import { use } from "react";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkflowStepper } from "@/components/evaluaciones/WorkflowStepper";
import { getEvaluacionParticipante, MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { getUserById } from "@/lib/mock-data/users";
import { canAdvance, getNextState, getStatusColor, WORKFLOW_LABELS } from "@/lib/utils/workflow";
import { useAuthStore } from "@/stores/authStore";

const PERIODO_LABELS = {
  anual: "Anual",
  semestral: "Semestral",
  trimestral: "Trimestral",
};

export default function EvaluacionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { activeRole, currentUser } = useAuthStore();
  const ciclo = MOCK_EVALUACIONES.find((item) => item.id === id);

  if (!ciclo) return <div className="p-8 text-center text-gray-400">Evaluación no encontrada</div>;

  const nextState = getNextState(ciclo.estado);
  const canGoNext = activeRole ? canAdvance(ciclo.estado, activeRole) : false;
  const participantesVisibles = ciclo.participantes.filter((participante) => {
    if (!currentUser || !activeRole) return true;
    if (activeRole === "evaluado") return participante.usuarioId === currentUser.id;
    if (activeRole === "lider") return getUserById(participante.usuarioId)?.liderId === currentUser.id;
    return true;
  });

  const getPrimaryActionUrl = () => {
    if (!currentUser) return null;
    if (activeRole === "evaluado") {
      const ownEvaluation = getEvaluacionParticipante(ciclo.id, currentUser.id);
      if (!ownEvaluation) return null;
      return `/evaluaciones/${ciclo.id}/participantes/${currentUser.id}`;
    }
    if (activeRole === "lider") {
      const firstReport = ciclo.participantes.find((item) => getUserById(item.usuarioId)?.liderId === currentUser.id);
      if (!firstReport) return null;
      return `/evaluaciones/${ciclo.id}/participantes/${firstReport.usuarioId}`;
    }
    const firstParticipant = ciclo.participantes[0];
    return firstParticipant ? `/evaluaciones/${ciclo.id}/participantes/${firstParticipant.usuarioId}` : null;
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <ButtonLink href="/evaluaciones" variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
        </ButtonLink>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">{ciclo.nombre}</h1>
            <Badge variant="outline" className="text-xs">
              {PERIODO_LABELS[ciclo.periodo]}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Ciclo {ciclo.tipo}° · {ciclo.anio} · {participantesVisibles.length} evaluaciones individuales</p>
        </div>
        <Badge className={getStatusColor(ciclo.estado)}>{WORKFLOW_LABELS[ciclo.estado]}</Badge>
      </div>

      {ciclo.estado !== "cerrada" && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600">Flujo del ciclo</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkflowStepper currentState={ciclo.estado} />
            {canGoNext && getPrimaryActionUrl() && (
              <div className="mt-4 flex justify-end">
                <ButtonLink href={getPrimaryActionUrl()!} className="gap-2">
                  Continuar en evaluación individual
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            )}
            {!canGoNext && nextState && (
              <p className="mt-4 text-xs text-gray-400">Siguiente estado esperado: {WORKFLOW_LABELS[nextState]}.</p>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-600">Evaluaciones por empleado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {participantesVisibles.map((participante) => {
              const user = getUserById(participante.usuarioId);
              if (!user) return null;

              return (
                <div key={participante.usuarioId} className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={user.avatar} alt={user.nombre} className="h-8 w-8 rounded-full" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{user.nombre}</p>
                      <p className="text-xs text-gray-400">{user.cargo} · {user.departamento}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {participante.puntajeObjetivos != null && (
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">{participante.puntajeObjetivos.toFixed(1)}</p>
                        <p className="text-gray-400">Obj.</p>
                      </div>
                    )}
                    {participante.puntajeCompetencias != null && (
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">{participante.puntajeCompetencias.toFixed(1)}</p>
                        <p className="text-gray-400">Comp.</p>
                      </div>
                    )}
                    {participante.puntajeFinal != null && (
                      <div className="text-center">
                        <p className="font-bold text-blue-600">{participante.puntajeFinal.toFixed(1)}</p>
                        <p className="text-gray-400">Final</p>
                      </div>
                    )}
                    {participante.firmadoLider && participante.firmadoColaborador ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-400" />
                    )}
                    <ButtonLink href={`/evaluaciones/${ciclo.id}/participantes/${participante.usuarioId}`} variant="outline" size="sm" className="text-xs">
                      Abrir
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardContent className="grid grid-cols-1 gap-4 p-4 text-center md:grid-cols-4">
          <div>
            <p className="text-xs text-gray-400">Inicio</p>
            <p className="text-sm font-semibold text-gray-800">{new Date(ciclo.fechaInicio).toLocaleDateString("es-CO")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Cierre</p>
            <p className="text-sm font-semibold text-gray-800">{new Date(ciclo.fechaFin).toLocaleDateString("es-CO")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Período</p>
            <p className="text-sm font-semibold text-gray-800">{PERIODO_LABELS[ciclo.periodo]}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tipo</p>
            <p className="text-sm font-semibold text-gray-800">Evaluación {ciclo.tipo}°</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
