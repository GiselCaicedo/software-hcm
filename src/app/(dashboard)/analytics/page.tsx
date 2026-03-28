"use client";
import {
  MOCK_KPIS, MOCK_DISTRIBUCION_CALIFICACIONES,
  MOCK_COMPETENCIAS_RADAR, MOCK_AVANCE_POR_AREA
} from "@/lib/mock-data/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import { Users, CheckCircle2, Clock, TrendingUp, Grid3X3, FileDown } from "lucide-react";

export default function AnalyticsPage() {
  const kpis = [
    { label: "Total evaluados", value: MOCK_KPIS.totalEvaluados, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completados", value: MOCK_KPIS.completados, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "En proceso", value: MOCK_KPIS.enProceso, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Calif. promedio", value: MOCK_KPIS.cumplimientoPromedio.toFixed(1), icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics de Desempeño</h1>
          <p className="text-sm text-gray-500 mt-1">Ciclo 2025 · Tiempo real</p>
        </div>
        <div className="flex gap-2">
          <ButtonLink href="/analytics/nine-box" variant="outline" size="sm" className="gap-2"><Grid3X3 className="h-4 w-4" />9-Box Grid</ButtonLink>
          <ButtonLink href="/analytics/reportes" variant="outline" size="sm" className="gap-2"><FileDown className="h-4 w-4" />Reportes</ButtonLink>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución calificaciones */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Distribución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MOCK_DISTRIBUCION_CALIFICACIONES} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="rango" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="cantidad" radius={[4, 4, 0, 0]}>
                  {MOCK_DISTRIBUCION_CALIFICACIONES.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar competencias */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Competencias — Promedio vs Esperado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={MOCK_COMPETENCIAS_RADAR}>
                <PolarGrid />
                <PolarAngleAxis dataKey="competencia" tick={{ fontSize: 10 }} />
                <Radar name="Promedio" dataKey="promedio" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                <Radar name="Esperado" dataKey="esperado" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.1} strokeDasharray="4 4" />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Avance por área */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Avance por Área</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MOCK_AVANCE_POR_AREA} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" domain={[0, 15]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="area" tick={{ fontSize: 11 }} width={80} />
                <Tooltip />
                <Bar dataKey="completados" name="Completados" fill="#22c55e" radius={[0, 4, 4, 0]} />
                <Bar dataKey="total" name="Total" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick links */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Acciones rápidas</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Ver 9-Box Grid", href: "/analytics/nine-box", desc: "Desempeño vs. Potencial del equipo", icon: Grid3X3 },
              { label: "Exportar reportes", href: "/analytics/reportes", desc: "PDF individuales y grupales con firma", icon: FileDown },
              { label: "Cumplimiento Decreto 1373", href: "/analytics/cumplimiento", desc: "Workflow de bajo desempeño", icon: CheckCircle2 },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <item.icon className="h-4.5 w-4.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
