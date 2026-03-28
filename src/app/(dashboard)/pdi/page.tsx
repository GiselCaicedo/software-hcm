"use client";
import { MOCK_PDI } from "@/lib/mock-data/pdi";
import { getUserById } from "@/lib/mock-data/users";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { TrendingUp, CheckCircle2, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ESTADO_COLORS: Record<string, string> = {
  borrador: "bg-gray-100 text-gray-600",
  en_revision: "bg-amber-100 text-amber-700",
  aprobado: "bg-green-100 text-green-700",
};

export default function PDIPage() {
  const { currentUser, activeRole } = useAuthStore();
  const pdis = activeRole === "evaluado"
    ? MOCK_PDI.filter((p) => p.evaluadoId === currentUser?.id)
    : MOCK_PDI;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Planes de Desarrollo Individual</h1>
        <p className="text-sm text-gray-500 mt-1">PDI generados con IA · Requieren revisión y aprobación</p>
      </div>

      {pdis.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>Aún no tienes planes de desarrollo. Se generan al cerrar una evaluación.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pdis.map((pdi) => {
            const evaluado = getUserById(pdi.evaluadoId);
            const accionesCompletadas = pdi.planAccion.filter((a) => a.estado === "completada").length;
            return (
              <Card key={pdi.id} className="border shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    {evaluado && (
                      <img src={evaluado.avatar} alt={evaluado.nombre} className="h-10 w-10 rounded-full shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900">{evaluado?.nombre}</p>
                        <Badge className={cn("text-xs", ESTADO_COLORS[pdi.estado])}>
                          {pdi.estado === "borrador" ? "Borrador" : pdi.estado === "en_revision" ? "En revisión" : "Aprobado"}
                        </Badge>
                        {pdi.feedbackIA && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs gap-1">
                            <Star className="h-3 w-3" /> IA generado
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{evaluado?.cargo} · {evaluado?.departamento}</p>
                    </div>
                  </div>

                  {/* Fortalezas y mejoras */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg bg-green-50 p-3">
                      <p className="text-xs font-semibold text-green-700 mb-1.5">Fortalezas ({pdi.areasFortaleza.length})</p>
                      <ul className="space-y-1">
                        {pdi.areasFortaleza.slice(0, 2).map((f, i) => (
                          <li key={i} className="text-xs text-green-700 flex gap-1">
                            <span className="shrink-0">✓</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3">
                      <p className="text-xs font-semibold text-amber-700 mb-1.5">Áreas de mejora ({pdi.areasMejora.length})</p>
                      <ul className="space-y-1">
                        {pdi.areasMejora.slice(0, 2).map((m, i) => (
                          <li key={i} className="text-xs text-amber-700 flex gap-1">
                            <span className="shrink-0">→</span>{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Plan de acción</span>
                      <span>{accionesCompletadas}/{pdi.planAccion.length} completadas</span>
                    </div>
                    <Progress value={(accionesCompletadas / pdi.planAccion.length) * 100} className="h-1.5" />
                  </div>

                  <div className="flex justify-end">
                    <ButtonLink href={`/pdi/${pdi.id}`} variant="outline" size="sm" className="text-xs">Ver PDI completo</ButtonLink>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
