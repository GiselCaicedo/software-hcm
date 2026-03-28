"use client";
import { useState } from "react";
import { MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { getUserById, MOCK_USERS } from "@/lib/mock-data/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, FileDown, FileText, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ReportesPage() {
  const [tipoReporte, setTipoReporte] = useState("individual");
  const [evaluacionId, setEvaluacionId] = useState("e1");
  const [usuarioId, setUsuarioId] = useState("u4");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Reporte generado y descargado correctamente");
    }, 1800);
  };

  const evaluacionesHistoricas = MOCK_EVALUACIONES.filter((e) => e.estado === "cerrada");

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <ButtonLink href="/analytics" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Generador de Reportes</h1>
          <p className="text-sm text-gray-500">PDF con firma digital incluida</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Configurar reporte</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de reporte</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "individual", label: "Individual", icon: FileText, desc: "Por empleado con firma digital" },
                { value: "grupal", label: "Grupal por área", icon: Users, desc: "Comparativa de equipo" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTipoReporte(opt.value)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    tipoReporte === opt.value ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <opt.icon className="h-5 w-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Evaluación</Label>
            <Select value={evaluacionId} onValueChange={(v) => v && setEvaluacionId(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOCK_EVALUACIONES.map((e) => (
                  <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {tipoReporte === "individual" && (
            <div className="space-y-2">
              <Label>Empleado</Label>
              <Select value={usuarioId} onValueChange={(v) => v && setUsuarioId(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_USERS.filter((u) => u.roles.includes("evaluado")).map((u) => (
                    <SelectItem key={u.id} value={u.id}>{u.nombre} · {u.cargo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {tipoReporte === "grupal" && (
            <div className="space-y-2">
              <Label>Filtro de área</Label>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las áreas</SelectItem>
                  <SelectItem value="Operaciones">Operaciones</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Tecnología">Tecnología</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button onClick={handleExport} disabled={isExporting} className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
            {isExporting ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Generando PDF...</>
            ) : (
              <><FileDown className="h-4 w-4" />Exportar PDF con firma digital</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Reportes históricos */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Reportes generados recientemente</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {evaluacionesHistoricas.map((ev) => (
            <div key={ev.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
              <FileText className="h-4 w-4 text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{ev.nombre} — Grupal</p>
                <p className="text-xs text-gray-400">{ev.participantes.length} participantes</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-blue-600"
                onClick={() => toast.info("Descargando reporte...")}
              >
                <FileDown className="h-3.5 w-3.5 mr-1" />
                PDF
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
