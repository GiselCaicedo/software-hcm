"use client";
import { use } from "react";
import { DetalleCiclo } from "@/components/evaluaciones/DetalleCiclo";
import { RolDebugBadge } from "@/components/evaluaciones/RolDebugBadge";
import { useRolActual } from "@/hooks/useRolActual";
import { getCiclo, getEvaluacionesDeCiclo } from "@/mock/evaluaciones";

export default function DetalleCicloPage({ params }: { params: Promise<{ cicloId: string }> }) {
  const { cicloId } = use(params);
  const { esAdmin, esLider } = useRolActual();

  const ciclo = getCiclo(cicloId);
  const evaluaciones = getEvaluacionesDeCiclo(cicloId);

  if (!ciclo) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#6B6B6B]">Ciclo no encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <DetalleCiclo
        ciclo={ciclo}
        evaluaciones={evaluaciones}
        esAdmin={esAdmin}
        esLider={esLider}
      />
      <RolDebugBadge />
    </>
  );
}
