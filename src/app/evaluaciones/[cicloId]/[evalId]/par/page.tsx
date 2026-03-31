"use client";
import { use } from "react";
import { getEvaluacion } from "@/mock/evaluaciones";
import { VistaDelPar } from "@/components/evaluaciones/VistaDelPar";

export default function VistaParPage({
  params,
}: {
  params: Promise<{ cicloId: string; evalId: string }>;
}) {
  const { cicloId, evalId } = use(params);
  const evaluacion = getEvaluacion(cicloId, evalId);

  if (!evaluacion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#6B6B6B]">Evaluación no encontrada.</p>
      </div>
    );
  }

  const handleEnviar = (calificaciones: Record<string, number>) => {
    console.log("Calificaciones del par enviadas:", calificaciones);
  };

  return <VistaDelPar evaluacion={evaluacion} onEnviar={handleEnviar} />;
}
