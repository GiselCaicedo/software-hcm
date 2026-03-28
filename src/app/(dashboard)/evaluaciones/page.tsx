"use client";

import { useMemo, useState } from "react";
import { Plus, Calendar, ClipboardList, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getEvaluacionesIndividualesPorRol } from "@/lib/mock-data/evaluaciones";
import { getUserById } from "@/lib/mock-data/users";
import { getStatusColor, WORKFLOW_LABELS } from "@/lib/utils/workflow";
import { canAccess } from "@/lib/utils/permissions";
import { useAuthStore } from "@/stores/authStore";
import { EstadoEvaluacion, PeriodoEvaluacion } from "@/types";

const TIPO_LABELS: Record<string, string> = {
  "90": "90°",
  "180": "180°",
  "360": "360°",
};

const PERIODO_LABELS: Record<PeriodoEvaluacion, string> = {
  anual: "Anual",
  semestral: "Semestral",
  trimestral: "Trimestral",
};

type EstadoFiltro = "todos" | EstadoEvaluacion;
type PeriodoFiltro = "todos" | PeriodoEvaluacion;

export default function EvaluacionesPage() {
  const { activeRole, currentUser } = useAuthStore();
  const [estado, setEstado] = useState<EstadoFiltro>("todos");
  const [periodo, setPeriodo] = useState<PeriodoFiltro>("todos");

  const evaluaciones = useMemo(() => {
    const base = getEvaluacionesIndividualesPorRol(currentUser?.id, activeRole);
    return base.filter((item) => {
      if (estado !== "todos" && item.cicloEstado !== estado) return false;
      if (periodo !== "todos" && item.cicloPeriodo !== periodo) return false;
      return true;
    });
  }, [activeRole, currentUser?.id, estado, periodo]);

  const grupos = useMemo(() => {
    const grouped = new Map<string, typeof evaluaciones>();
    for (const evaluacion of evaluaciones) {
      const key = evaluacion.cicloId;
      const current = grouped.get(key) ?? [];
      current.push(evaluacion);
      grouped.set(key, current);
    }
    return Array.from(grouped.entries()).map(([cicloId, items]) => ({
      cicloId,
      cicloNombre: items[0]?.cicloNombre ?? "",
      cicloPeriodo: items[0]?.cicloPeriodo ?? "anual",
      cicloTipo: items[0]?.cicloTipo ?? "180",
      cicloEstado: items[0]?.cicloEstado ?? "configuracion",
      fechaFin: items[0]?.fechaFin ?? "",
      items,
    }));
  }, [evaluaciones]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluaciones</h1>
          <p className="text-sm text-gray-500 mt-1">Cada registro corresponde a la evaluación de un empleado dentro de un ciclo.</p>
        </div>
        {canAccess("evaluaciones.configuracion", activeRole) && (
          <ButtonLink href="/evaluaciones/configuracion" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo ciclo
          </ButtonLink>
        )}
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="h-4 w-4" />
            Filtros
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Select value={periodo} onValueChange={(value) => value && setPeriodo(value as PeriodoFiltro)}>
              <SelectTrigger className="w-full md:w-44">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los períodos</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
              </SelectContent>
            </Select>
            <Select value={estado} onValueChange={(value) => value && setEstado(value as EstadoFiltro)}>
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="configuracion">Configuración</SelectItem>
                <SelectItem value="autocalificacion">Autocalificación</SelectItem>
                <SelectItem value="calificacion_lider">Calificación líder</SelectItem>
                <SelectItem value="pares">Evaluación 360°</SelectItem>
                <SelectItem value="revision_th">Revisión TH</SelectItem>
                <SelectItem value="cerrada">Cerrada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {grupos.map((grupo) => (
          <Card key={grupo.cicloId} className="border shadow-sm">
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-900">{grupo.cicloNombre}</h2>
                    <Badge variant="outline" className="text-xs">
                      {PERIODO_LABELS[grupo.cicloPeriodo]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Eval. {TIPO_LABELS[grupo.cicloTipo]}
                    </Badge>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    Cierre {new Date(grupo.fechaFin).toLocaleDateString("es-CO")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(grupo.cicloEstado)}>{WORKFLOW_LABELS[grupo.cicloEstado]}</Badge>
                  <ButtonLink href={`/evaluaciones/${grupo.cicloId}`} variant="outline" size="sm" className="text-xs">
                    Ver ciclo
                  </ButtonLink>
                </div>
              </div>

              <div className="space-y-2">
                {grupo.items.map((item) => {
                  const user = getUserById(item.usuarioId);
                  if (!user) return null;

                  return (
                    <div key={`${item.cicloId}-${item.usuarioId}`} className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <ClipboardList className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
                          <p className="text-xs text-gray-500 truncate">{user.cargo} · {user.departamento}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 md:justify-end">
                        <div className="flex items-center gap-3 text-xs">
                          {item.participante.puntajeObjetivos != null && (
                            <div className="text-center">
                              <p className="font-semibold text-gray-800">{item.participante.puntajeObjetivos.toFixed(1)}</p>
                              <p className="text-gray-400">Obj.</p>
                            </div>
                          )}
                          {item.participante.puntajeCompetencias != null && (
                            <div className="text-center">
                              <p className="font-semibold text-gray-800">{item.participante.puntajeCompetencias.toFixed(1)}</p>
                              <p className="text-gray-400">Comp.</p>
                            </div>
                          )}
                          {item.participante.puntajeFinal != null && (
                            <div className="text-center">
                              <p className="font-bold text-blue-600">{item.participante.puntajeFinal.toFixed(1)}</p>
                              <p className="text-gray-400">Final</p>
                            </div>
                          )}
                        </div>
                        <ButtonLink
                          href={`/evaluaciones/${item.cicloId}/participantes/${item.usuarioId}`}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          Ver evaluación
                        </ButtonLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {grupos.length === 0 && (
          <Card className="border border-dashed shadow-none">
            <CardContent className="p-8 text-center text-sm text-gray-500">
              No hay evaluaciones que coincidan con los filtros actuales.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
