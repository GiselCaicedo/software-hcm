"use client";
import { use } from "react";
import { MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { getUserById } from "@/lib/mock-data/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Paperclip } from "lucide-react";

export default function ObjetivoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Buscar el objetivo dentro de todos los ciclos y participantes
  let obj = null;
  let evaluadoUser = null;
  for (const ciclo of MOCK_EVALUACIONES) {
    for (const participante of ciclo.participantes) {
      const found = participante.objetivos.find((o) => o.id === id);
      if (found) {
        obj = found;
        evaluadoUser = getUserById(participante.usuarioId);
        break;
      }
    }
    if (obj) break;
  }

  if (!obj) return <div className="p-8 text-center text-gray-400">Objetivo no encontrado</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <ButtonLink href="/objetivos" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{obj.funcion}</h1>
          <p className="text-sm text-gray-500">Objetivo del cargo · Peso {obj.peso}%</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Objetivo SMART</p>
            <p className="text-sm text-gray-800">{obj.objetivoSmart}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Cómo se mide</p>
              <p className="text-sm font-medium text-gray-800">{obj.como}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Frecuencia</p>
              <p className="text-sm font-medium text-gray-800">{obj.cuando}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-gray-400 mb-1">Fórmula de medición</p>
            <p className="text-sm font-medium text-gray-800 font-mono bg-gray-50 rounded p-2">{obj.formulaMedicion}</p>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-gray-400 mb-1">Para qué</p>
            <p className="text-sm text-gray-800">{obj.paraQue}</p>
          </div>
          {evaluadoUser && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <img src={evaluadoUser.avatar} className="h-8 w-8 rounded-full" alt={evaluadoUser.nombre} />
                <div>
                  <p className="text-xs text-gray-400">Evaluado</p>
                  <p className="text-sm font-medium text-gray-800">{evaluadoUser.nombre}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Calificaciones */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Autocalificación</CardTitle></CardHeader>
          <CardContent>
            {obj.autocalificacion ? (
              <>
                <p className="text-3xl font-bold text-blue-600">{obj.autocalificacion}/5</p>
                <p className="text-xs text-gray-500 mt-2">{obj.observacionEvaluado}</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">Pendiente</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Calificación Líder</CardTitle></CardHeader>
          <CardContent>
            {obj.calificacionLider ? (
              <>
                <p className="text-3xl font-bold text-amber-600">{obj.calificacionLider}/5</p>
                <p className="text-xs text-gray-500 mt-2">{obj.observacionLider}</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">Pendiente</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Evidencias */}
      {obj.evidencias.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Evidencias adjuntas</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              {obj.evidencias.map((ev) => (
                <div key={ev} className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                  <Paperclip className="h-3.5 w-3.5" />
                  {ev}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
