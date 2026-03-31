import type { EvaluacionDetalle, ObjetivoEval, CompetenciaEval } from '@/types/evaluaciones'

/** Promedio ponderado de objetivos usando calificación del líder */
export function calcularPuntajeObjetivos(objetivos: ObjetivoEval[]): number | null {
  const conCalif = objetivos.filter((o) => o.calificacionLider != null)
  if (conCalif.length === 0) return null
  const pesoTotal = conCalif.reduce((acc, o) => acc + o.peso, 0)
  if (pesoTotal === 0) return null
  const suma = conCalif.reduce((acc, o) => acc + (o.calificacionLider! * o.peso), 0)
  return suma / pesoTotal
}

/** Promedio simple de calificaciones del líder en competencias */
export function calcularPuntajeCompetenciasLider(competencias: CompetenciaEval[]): number | null {
  const vals = competencias.map((c) => c.calificaciones.lider).filter((v): v is number => v != null)
  if (vals.length === 0) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

/** Promedio simple de calificaciones del par en competencias */
export function calcularPuntajeCompetenciasPar(competencias: CompetenciaEval[]): number | null {
  const vals = competencias.map((c) => c.calificaciones.par).filter((v): v is number => v != null)
  if (vals.length === 0) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

/**
 * Puntaje de competencias combinado.
 * En 90° no hay par → solo se usa la calificación del líder directamente.
 */
export function calcularPuntajeCompetencias(
  competencias: CompetenciaEval[],
  tipo: '90' | '180' | '360',
  pesoLider: number,
  pesoPar: number
): number | null {
  const lider = calcularPuntajeCompetenciasLider(competencias)
  if (lider == null) return null
  if (tipo === '90') return lider
  const par = calcularPuntajeCompetenciasPar(competencias)
  if (par == null) return lider // par aún no completó → usar solo líder provisionalmente
  return (lider * pesoLider / 100) + (par * pesoPar / 100)
}

/** Puntaje final en escala 1–5, redondeado a 2 decimales */
export function calcularPuntajeFinal(ev: EvaluacionDetalle): number | null {
  const pObj = calcularPuntajeObjetivos(ev.objetivos)
  const pComp = calcularPuntajeCompetencias(
    ev.competencias, ev.tipo,
    ev.pesoLiderEnCompetencias, ev.pesoParEnCompetencias
  )
  if (pObj == null || pComp == null) return null
  const raw = (pObj * ev.pesoObjetivos / 100) + (pComp * ev.pesoCompetencias / 100)
  return Math.round(raw * 100) / 100
}

/** Porcentaje de participantes que han completado */
export function calcularProgresoParticipantes(ev: EvaluacionDetalle): number {
  const participantes = [ev.colaborador, ev.lider, ev.par, ev.clienteExterno].filter(Boolean)
  const completados = participantes.filter((p) => p!.completado).length
  return Math.round((completados / participantes.length) * 100)
}

/** Etiqueta descriptiva para cada nivel 1-5 */
export const NIVEL_LABELS: Record<number, string> = {
  1: 'No demostrado',
  2: 'En desarrollo',
  3: 'Competente',
  4: 'Avanzado',
  5: 'Experto',
}

/** Color de la barra de progreso de participantes */
export function colorProgreso(pct: number): string {
  if (pct >= 80) return '#1D9E75'
  if (pct >= 40) return '#F59E0B'
  return '#EF4444'
}
