"use client";
import { useAuthStore } from "@/stores/authStore";
import { MOCK_KPIS, MOCK_AVANCE_POR_AREA } from "@/lib/mock-data/analytics";
import { MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { WORKFLOW_LABELS, getStatusColor } from "@/lib/utils/workflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { WorkflowStepper } from "@/components/evaluaciones/WorkflowStepper";
import Link from "next/link";
import {
  ClipboardList, TrendingUp, Users, CheckCircle2,
  Clock, AlertTriangle, PenLine, BarChart2,
} from "lucide-react";

export default function DashboardPage() {
  const { currentUser, activeRole } = useAuthStore();

  const activeEval = MOCK_EVALUACIONES.find((e) => e.estado !== "cerrada");
  const myResults = activeEval?.participantes.find((r) => r.usuarioId === currentUser?.id);
  const myEvalUrl = activeEval && currentUser ? `/evaluaciones/${activeEval.id}/participantes/${currentUser.id}` : "/evaluaciones";

  const greetingName = currentUser?.nombre.split(" ")[0] ?? "Usuario";

  const ROLE_GREETINGS: Record<string, string> = {
    th: "Gestiona el ciclo de evaluación activo y supervisa el avance del equipo.",
    lider: "Tienes evaluaciones pendientes de calificar en tu equipo.",
    evaluado: "Revisa tu autocalificación y el estado de tu evaluación.",
    admin: "Panel de administración del sistema de evaluación de desempeño.",
  };

  const kpiCards = [
    {
      label: "Total evaluados",
      value: MOCK_KPIS.totalEvaluados,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      show: ["th", "admin", "lider"],
    },
    {
      label: "Evaluaciones completadas",
      value: `${MOCK_KPIS.completados}/${MOCK_KPIS.totalEvaluados}`,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      show: ["th", "admin", "lider"],
    },
    {
      label: "En proceso",
      value: MOCK_KPIS.enProceso,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      show: ["th", "admin", "lider"],
    },
    {
      label: "Firmas pendientes",
      value: MOCK_KPIS.firmasPendientes,
      icon: PenLine,
      color: "text-red-600",
      bg: "bg-red-50",
      show: ["th", "admin", "lider", "evaluado"],
    },
    {
      label: "PDI generados",
      value: MOCK_KPIS.pdiGenerados,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
      show: ["th", "admin"],
    },
    {
      label: "Calificación promedio",
      value: MOCK_KPIS.cumplimientoPromedio.toFixed(1),
      icon: BarChart2,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      show: ["th", "admin", "lider"],
    },
  ];

  const visibleKpis = kpiCards.filter((k) => activeRole && k.show.includes(activeRole));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Hola, {greetingName} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {activeRole ? ROLE_GREETINGS[activeRole] : ""}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleKpis.map((kpi) => (
          <Card key={kpi.label} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-500">{kpi.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ciclo activo */}
        {activeEval && (
          <Card className="lg:col-span-2 border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Ciclo Activo</CardTitle>
                <Badge className={getStatusColor(activeEval.estado)}>
                  {WORKFLOW_LABELS[activeEval.estado]}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{activeEval.nombre}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <WorkflowStepper currentState={activeEval.estado} />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Avance general</span>
                <span className="font-semibold text-gray-800">{MOCK_KPIS.porcentajeAvance}%</span>
              </div>
              <Progress value={MOCK_KPIS.porcentajeAvance} className="h-2" />
              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-gray-400">
                  {activeEval.participantes.length} participantes · Cierre: {new Date(activeEval.fechaFin).toLocaleDateString("es-CO")}
                </p>
                <ButtonLink href={`/evaluaciones/${activeEval.id}`} variant="outline" size="sm" className="text-xs">Ver detalle</ButtonLink>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Avance por área */}
        {(activeRole === "th" || activeRole === "admin") && (
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Avance por Área</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_AVANCE_POR_AREA.map((area) => (
                <div key={area.area} className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="font-medium">{area.area}</span>
                    <span className="text-gray-400">{area.completados}/{area.total}</span>
                  </div>
                  <Progress value={(area.completados / area.total) * 100} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Mi evaluación (evaluado) */}
        {activeRole === "evaluado" && activeEval && myResults && (
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Mi Evaluación</CardTitle>
              <p className="text-xs text-gray-500">{activeEval.nombre}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Estado</span>
                <Badge className={getStatusColor(activeEval.estado)}>
                  {WORKFLOW_LABELS[activeEval.estado]}
                </Badge>
              </div>
              {myResults.puntajeObjetivos && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Puntaje Objetivos</span>
                  <span className="font-semibold">{myResults.puntajeObjetivos}/5</span>
                </div>
              )}
              <ButtonLink href={myEvalUrl} size="sm" className="w-full mt-2">Ir a mi evaluación</ButtonLink>
            </CardContent>
          </Card>
        )}

        {/* Evaluaciones recientes */}
        <Card className={`border shadow-sm ${activeRole !== "evaluado" ? "" : "lg:col-span-2"}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Evaluaciones Recientes</CardTitle>
              <ButtonLink href="/evaluaciones" variant="ghost" size="sm" className="text-xs text-blue-600">Ver todas</ButtonLink>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {MOCK_EVALUACIONES.slice(0, 3).map((ev) => (
              <Link
                key={ev.id}
                href={activeRole === "evaluado" && currentUser && ev.participantes.some((item) => item.usuarioId === currentUser.id)
                  ? `/evaluaciones/${ev.id}/participantes/${currentUser.id}`
                  : `/evaluaciones/${ev.id}`}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <ClipboardList className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{ev.nombre}</p>
                  <p className="text-xs text-gray-400">{ev.participantes.length} participantes · {ev.tipo}°</p>
                </div>
                <Badge className={`text-xs shrink-0 ${getStatusColor(ev.estado)}`}>
                  {WORKFLOW_LABELS[ev.estado]}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
