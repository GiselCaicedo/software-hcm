"use client";
import { NivelCiclos } from "@/components/evaluaciones/NivelCiclos";
import { RolDebugBadge } from "@/components/evaluaciones/RolDebugBadge";
import { useRolActual } from "@/hooks/useRolActual";

export default function EvaluacionesPage() {
  const { esLider, esColaborador, esAdmin } = useRolActual();

  return (
    <>
      <NivelCiclos esAdmin={esAdmin} esLider={esLider} esColaborador={esColaborador} />
      <RolDebugBadge />
    </>
  );
}
