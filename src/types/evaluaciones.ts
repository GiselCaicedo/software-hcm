export type TipoEvaluacion = '90' | '180' | '360'

export type EstadoCiclo = 'borrador' | 'activo' | 'en_cierre' | 'cerrado'

export type EstadoEvaluacion =
  | 'borrador'
  | 'en_progreso'
  | 'consolidado'
  | 'firmado_lider'
  | 'cerrado'

export type RolParticipante = 'colaborador' | 'lider' | 'par' | 'cliente_externo'

// ── Ciclo de evaluación ────────────────────────────────────────────────────

export interface CicloEvaluacion {
  id: string
  nombre: string
  tipo: TipoEvaluacion
  estado: EstadoCiclo
  fechaInicio: string
  fechaLimite: string      // límite para completar evaluaciones
  fechaCierre: string      // fecha de cierre administrativo del ciclo
  poblacion: {
    niveles: ('operativo' | 'tactico' | 'estrategico')[]
    areas: string[]        // ['todas'] o lista de áreas específicas
  }
  pesoObjetivos: number    // default 60
  pesoCompetencias: number // default 40
  pesoLider: number        // % del líder dentro del bloque competencias (default 70)
  pesoPar: number          // % del par dentro del bloque competencias (default 30)
  totalEvaluaciones: number
  completadas: number      // colaborador + líder completaron
  firmadas: number         // estado = cerrado
}

// ── Participante ──────────────────────────────────────────────────────────

export interface Participante {
  id: string
  nombre: string
  cargo: string
  rol: RolParticipante
  completado: boolean
  fechaCompletado?: string
}

// ── Competencia ────────────────────────────────────────────────────────────

export interface CompetenciaEval {
  id: string
  nombre: string
  tipo: 'organizacional' | 'por_nivel' | 'tecnica'
  nivelEsperado: 1 | 2 | 3 | 4 | 5
  calificaciones: {
    lider?: number
    par?: number
    // El colaborador NO califica competencias — solo objetivos
  }
  observacion?: string
}

// ── Objetivo ───────────────────────────────────────────────────────────────

export interface ObjetivoEval {
  id: string
  descripcion: string
  peso: number              // suma total debe ser 100
  metaCuantitativa?: string
  calificacionColaborador?: number  // autocalificación 1-5
  calificacionLider?: number        // calificación oficial 1-5
  observacion?: string
}

// ── Evaluación individual ─────────────────────────────────────────────────

export interface EvaluacionDetalle {
  id: string
  cicloId: string
  cicloNombre: string
  colaborador: Participante
  lider: Participante
  par?: Participante            // solo 180° y 360°
  clienteExterno?: Participante // solo 360°
  tipo: TipoEvaluacion
  estado: EstadoEvaluacion
  fechaInicio: string
  fechaLimite: string
  objetivos: ObjetivoEval[]
  competencias: CompetenciaEval[]
  pesoObjetivos: number
  pesoCompetencias: number
  pesoLiderEnCompetencias: number
  pesoParEnCompetencias: number
  puntajeFinal?: number
  // Flujo de firma secuencial: líder firma primero → colaborador cierra
  observacionesLider?: string
  firmadoLider: boolean
  observacionesColaborador?: string
  firmadoColaborador: boolean
  checkboxLider?: boolean       // "Declaro que revisé y discutí los resultados"
  fechaCierre?: string
}

// ── Helpers de visibilidad (derivados, no estados) ────────────────────────

/** El par aún no completó y está asignado — badge "Pendiente par" en UI */
export function esPendientePar(ev: EvaluacionDetalle): boolean {
  return ev.estado === 'en_progreso' && ev.par !== undefined && !ev.par.completado
}

/** Etiqueta de badge para la tabla de ciclo (Nivel 2) */
export function badgeEstadoEval(ev: EvaluacionDetalle): string {
  if (esPendientePar(ev)) return 'Pendiente par'
  const labels: Record<EstadoEvaluacion, string> = {
    borrador:      'Borrador',
    en_progreso:   'En progreso',
    consolidado:   'Consolidado',
    firmado_lider: 'Firmado líder',
    cerrado:       'Cerrado',
  }
  return labels[ev.estado]
}
