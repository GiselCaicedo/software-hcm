"use client";
import { useState } from "react";
import { MOCK_DECRETO_1373 } from "@/lib/mock-data/analytics";
import { getUserById } from "@/lib/mock-data/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock, FileText, Send } from "lucide-react";
import { toast } from "sonner";

const PASOS_DECRETO = [
  { id: "notificacion", label: "Notificación bajo desempeño", dias: 0, descripcion: "TH notifica al empleado el resultado por escrito. Registro de entrega con timestamp." },
  { id: "descargos", label: "Período de descargos (8 días)", dias: 8, descripcion: "El empleado tiene 8 días hábiles para presentar sus descargos por escrito." },
  { id: "respuesta", label: "Respuesta del empleador", dias: 8, descripcion: "La empresa analiza los descargos y emite respuesta formal." },
  { id: "correccion", label: "Período de corrección", dias: 30, descripcion: "Plan de mejoramiento con seguimiento mensual. PDI con objetivos específicos." },
  { id: "preaviso", label: "Preaviso 15 días", dias: 15, descripcion: "Si no hay mejora, preaviso de terminación de contrato con 15 días de anticipación." },
];

export default function CumplimientoPage() {
  const [pasoActivo, setPasoActivo] = useState<string>("notificacion");

  const caso = MOCK_DECRETO_1373[0];
  const empleado = getUserById(caso.empleadoId);

  const pasoIndex = PASOS_DECRETO.findIndex((p) => p.id === caso.paso);

  const handleAvanzar = () => {
    toast.success("Paso registrado con timestamp y prueba de entrega");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <ButtonLink href="/analytics" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Cumplimiento — Decreto 1373/1966</h1>
          <p className="text-sm text-gray-500">Workflow de bajo desempeño con validez legal colombiana</p>
        </div>
      </div>

      {/* Info legal */}
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex gap-2 text-sm text-amber-800">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>
          El Decreto 1373 de 1966 exige que para la terminación de contrato por bajo desempeño,
          el empleador debe notificar, dar oportunidad de descargos y un período de corrección.
          Cada paso requiere <strong>prueba de entrega documentada</strong>.
        </span>
      </div>

      {/* Caso activo */}
      {empleado && (
        <Card className="border-red-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <img src={empleado.avatar} alt={empleado.nombre} className="h-12 w-12 rounded-full shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{empleado.nombre}</p>
                <Badge className="bg-red-100 text-red-700 text-xs">Bajo desempeño</Badge>
              </div>
              <p className="text-xs text-gray-500">{empleado.cargo} · {empleado.departamento}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>Calificación final: <strong className="text-red-600">{caso.puntaje}/5</strong></span>
                <span>Notificación: {new Date(caso.fechaNotificacion).toLocaleDateString("es-CO")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Decreto */}
      <Card>
        <CardHeader><CardTitle className="text-base">Flujo Decreto 1373</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {PASOS_DECRETO.map((paso, idx) => {
            const isDone = idx < pasoIndex;
            const isCurrent = idx === pasoIndex;
            const isPending = idx > pasoIndex;
            return (
              <div
                key={paso.id}
                className={`flex gap-3 p-3 rounded-lg border ${
                  isCurrent ? "border-amber-300 bg-amber-50" :
                  isDone ? "border-green-200 bg-green-50" :
                  "border-gray-100 bg-gray-50"
                }`}
              >
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isDone ? "bg-green-600 text-white" :
                  isCurrent ? "bg-amber-500 text-white" :
                  "bg-gray-200 text-gray-500"
                }`}>
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">{paso.label}</p>
                    {paso.dias > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />{paso.dias} días
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{paso.descripcion}</p>
                  {isCurrent && (
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => toast.info("Abriendo formulario de evidencia...")}>
                        <FileText className="h-3.5 w-3.5" />
                        Adjuntar evidencia
                      </Button>
                      <Button size="sm" className="text-xs gap-1 bg-amber-600 hover:bg-amber-700" onClick={handleAvanzar}>
                        <Send className="h-3.5 w-3.5" />
                        Registrar y avanzar
                      </Button>
                    </div>
                  )}
                  {isDone && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Completado con prueba de entrega · {new Date(caso.fechaDescargos).toLocaleDateString("es-CO")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
