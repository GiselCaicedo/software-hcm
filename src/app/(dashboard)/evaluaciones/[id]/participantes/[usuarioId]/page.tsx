"use client";

import { use } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkflowStepper } from "@/components/evaluaciones/WorkflowStepper";
import { getEvaluacionParticipante, MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { getUserById } from "@/lib/mock-data/users";
import { getStatusColor, WORKFLOW_LABELS } from "@/lib/utils/workflow";
import { useAuthStore } from "@/stores/authStore";

export default function EvaluacionParticipantePage({
  params,
}: {
  params: Promise<{ id: string; usuarioId: string }>;
}) {
  const { id, usuarioId } = use(params);
  const { activeRole, currentUser } = useAuthStore();
  const ciclo = MOCK_EVALUACIONES.find((item) => item.id === id);
  const participante = getEvaluacionParticipante(id, usuarioId);
  const user = getUserById(usuarioId);
  const lider = user?.liderId ? getUserById(user.liderId) : null;

  if (!ciclo || !participante || !user) {
    return <div className="p-8 text-center text-gray-400">Evaluación no encontrada</div>;
  }

  const hasAccess =
    !currentUser || !activeRole
      ? true
      : activeRole === "evaluado"
        ? currentUser.id === usuarioId
        : activeRole === "lider"
          ? user.liderId === currentUser.id
          : true;

  if (!hasAccess) {
    return <div className="p-8 text-center text-gray-400">No tienes acceso a esta evaluación.</div>;
  }

  const formUrl = `/evaluaciones/${id}/participantes/${usuarioId}/formulario`;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <ButtonLink href={`/evaluaciones/${id}`} variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
        </ButtonLink>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{user.nombre}</h1>
          <p className="text-sm text-gray-500">{ciclo.nombre} · {user.cargo}</p>
        </div>
        <Badge className={getStatusColor(ciclo.estado)}>{WORKFLOW_LABELS[ciclo.estado]}</Badge>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-600">Estado de la evaluación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <WorkflowStepper currentState={ciclo.estado} />
          <div className="flex justify-end">
            <ButtonLink href={formUrl} className="gap-2">
              Abrir formulario
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardContent className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Empleado</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{user.nombre}</p>
            <p className="text-xs text-gray-500">{user.cargo} · {user.departamento}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Jefe inmediato</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{lider?.nombre ?? "—"}</p>
            <p className="text-xs text-gray-500">{lider?.cargo ?? "Sin asignar"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Objetivos</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{participante.objetivos.length}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Firmas</p>
            <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900">
              {participante.firmadoLider && participante.firmadoColaborador ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Completas
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 text-amber-500" />
                  Pendientes
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border shadow-sm">
          <CardContent className="p-4 text-center">
            <ClipboardList className="mx-auto h-5 w-5 text-blue-600" />
            <p className="mt-2 text-xs text-gray-400">Objetivos</p>
            <p className="text-lg font-semibold text-gray-900">
              {participante.puntajeObjetivos != null ? participante.puntajeObjetivos.toFixed(1) : "—"}
            </p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4 text-center">
            <ClipboardList className="mx-auto h-5 w-5 text-violet-600" />
            <p className="mt-2 text-xs text-gray-400">Competencias</p>
            <p className="text-lg font-semibold text-gray-900">
              {participante.puntajeCompetencias != null ? participante.puntajeCompetencias.toFixed(1) : "—"}
            </p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4 text-center">
            <ClipboardList className="mx-auto h-5 w-5 text-emerald-600" />
            <p className="mt-2 text-xs text-gray-400">Final</p>
            <p className="text-lg font-semibold text-gray-900">
              {participante.puntajeFinal != null ? participante.puntajeFinal.toFixed(1) : "—"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
