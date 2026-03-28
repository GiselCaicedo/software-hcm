"use client";
import { use } from "react";
import { redirect } from "next/navigation";

// Esta ruta redirige al formulario unificado
export default function CalificacionLiderRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  redirect(`/evaluaciones/${id}/formulario`);
}
