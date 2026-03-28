"use client";
import { MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { getUserById } from "@/lib/mock-data/users";
import { WORKFLOW_LABELS, getStatusColor } from "@/lib/utils/workflow";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { WorkflowStepper } from "@/components/evaluaciones/WorkflowStepper";
import Link from "next/link";
import { Plus, ClipboardList, Calendar, Users } from "lucide-react";
import { canAccess } from "@/lib/utils/permissions";

const TIPO_LABELS: Record<string, string> = {
  "90": "90°",
  "180": "180°",
  "360": "360°",
};

export default function EvaluacionesPage() {
  const { activeRole, currentUser } = useAuthStore();

  const evaluaciones = MOCK_EVALUACIONES.filter((e) => {
    if (activeRole === "evaluado") return e.participantes.some((p) => p.usuarioId === currentUser?.id);
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluaciones</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona los ciclos de evaluación de desempeño</p>
        </div>
        {canAccess("evaluaciones.configuracion", activeRole) && (
          <ButtonLink href="/evaluaciones/configuracion" className="gap-2"><Plus className="h-4 w-4" />
              Nuevo ciclo</ButtonLink>
        )}
      </div>

      <div className="space-y-4">
        {evaluaciones.map((ev) => (
          <Card key={ev.id} className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{ev.nombre}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {ev.participantes.length} participantes
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(ev.fechaFin).toLocaleDateString("es-CO")}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Eval. {TIPO_LABELS[ev.tipo]}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(ev.estado)}>
                  {WORKFLOW_LABELS[ev.estado]}
                </Badge>
              </div>

              {ev.estado !== "cerrada" && (
                <div className="mb-4">
                  <WorkflowStepper currentState={ev.estado} />
                </div>
              )}

              {/* Participantes */}
              {ev.estado === "cerrada" && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {ev.participantes.slice(0, 5).map((r) => {
                    const user = getUserById(r.usuarioId);
                    return user ? (
                      <div key={r.usuarioId} className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-full px-2.5 py-1">
                        <img src={user.avatar} alt={user.nombre} className="h-4 w-4 rounded-full" />
                        {user.nombre.split(" ")[0]}
                        {r.puntajeFinal && (
                          <span className="font-semibold text-blue-600">{r.puntajeFinal.toFixed(1)}</span>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <div className="flex justify-end gap-2">
                {ev.estado !== "cerrada" && canAccess("evaluaciones.configuracion", activeRole) && (
                  <ButtonLink href="/evaluaciones/configuracion" variant="outline" size="sm" className="text-xs">Configurar</ButtonLink>
                )}
                {(ev.estado === "autocalificacion" || ev.estado === "calificacion_lider") && (
                  <ButtonLink href={`/evaluaciones/${ev.id}/formulario`} variant="default" size="sm" className="text-xs gap-1.5">
                    Abrir formulario →
                  </ButtonLink>
                )}
                <ButtonLink href={`/evaluaciones/${ev.id}`} variant="outline" size="sm" className="text-xs">
                  {ev.estado !== "cerrada" ? "Ver detalle" : "Ver resultados"}
                </ButtonLink>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
