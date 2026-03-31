"use client";
import { use } from "react";
import { DetalleEvaluacion } from "@/components/evaluaciones/DetalleEvaluacion";
import { RolDebugBadge } from "@/components/evaluaciones/RolDebugBadge";
import { useRolActual } from "@/hooks/useRolActual";
import { getEvaluacion } from "@/mock/evaluaciones";

export default function EvaluacionIndividualPage({
  params,
}: {
  params: Promise<{ cicloId: string; evalId: string }>;
}) {
  const { cicloId, evalId } = use(params);
  const { esLider, esColaborador, esAdmin } = useRolActual();

  const evaluacion = getEvaluacion(cicloId, evalId);

  if (!evaluacion) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#6B6B6B] text-sm">Evaluación no encontrada.</p>
      </div>
    );
  }

  return (
    <>
      <DetalleEvaluacion
        evaluacion={evaluacion}
        esLider={esLider}
        esColaborador={esColaborador}
        esAdmin={esAdmin}
      />
      <RolDebugBadge />
    </>
  );
}
