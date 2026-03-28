"use client";
import { use } from "react";
import { MOCK_COMPETENCIAS } from "@/lib/mock-data/competencias";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import Link from "next/link";
import { ArrowLeft, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TIPO_COLORS: Record<string, string> = {
  core: "bg-blue-100 text-blue-700",
  funcional: "bg-purple-100 text-purple-700",
  liderazgo: "bg-amber-100 text-amber-700",
};

const NIVEL_COLORS = ["", "bg-red-100 text-red-700", "bg-orange-100 text-orange-700", "bg-yellow-100 text-yellow-700", "bg-lime-100 text-lime-700", "bg-green-100 text-green-700"];

export default function CompetenciaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const comp = MOCK_COMPETENCIAS.find((c) => c.id === id);

  if (!comp) return <div className="p-8 text-center text-gray-400">Competencia no encontrada</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <ButtonLink href="/competencias" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">{comp.nombre}</h1>
            {comp.inmutable && <Lock className="h-4 w-4 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{comp.descripcion}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge className={TIPO_COLORS[comp.tipo]}>{comp.tipo}</Badge>
        {comp.nivelJerarquico.map((n) => (
          <Badge key={n} variant="outline" className="capitalize">{n}</Badge>
        ))}
        {comp.inmutable && <Badge className="bg-gray-100 text-gray-600">Inmutable</Badge>}
        <Badge variant="outline">Peso default: {comp.pesoPorDefecto}%</Badge>
      </div>

      {/* Indicadores por nivel */}
      <Card>
        <CardHeader><CardTitle className="text-base">Indicadores por nivel de proficiencia</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {comp.indicadores.map((ind) => (
            <div key={ind.nivel} className="flex gap-3 p-3 rounded-lg bg-gray-50">
              <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0", NIVEL_COLORS[ind.nivel])}>
                {ind.nivel}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: ind.nivel }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                  {Array.from({ length: 5 - ind.nivel }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-gray-200" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{ind.descripcion}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {!comp.inmutable && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Editar competencia</Button>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
            Desactivar
          </Button>
        </div>
      )}
    </div>
  );
}
