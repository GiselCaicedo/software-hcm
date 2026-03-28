import { redirect } from "next/navigation";

export default async function ParticipanteFormularioRedirect({
  params,
}: {
  params: Promise<{ id: string; usuarioId: string }>;
}) {
  const { id, usuarioId } = await params;
  redirect(`/evaluaciones/${id}/formulario?usuarioId=${usuarioId}`);
}
