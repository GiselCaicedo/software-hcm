// ===== AUTH & ROLES =====
export type Role = "admin" | "th" | "lider" | "evaluado";

export interface User {
  id: string;
  nombre: string;
  email: string;
  roles: Role[];
  cargo: string;
  departamento: string;
  nivel: "operativo" | "tactico" | "estrategico";
  avatar: string;
  liderId?: string;
  fechaIngreso: string;
  companyId: string; // Corrección 6: multiempresa
  cedula?: string;
  tipoContrato?: string;
}

export interface Company {
  id: string;
  nombre: string;
  nit: string;
}

// ===== COMPETENCIAS =====
export type TipoCompetencia = "core" | "funcional" | "liderazgo";

// Corrección 1 y 2: comportamientos por competencia + nivel jerárquico
export interface ComportamientoObservable {
  id: string;
  descripcion: string;
  nivelJerarquico: "operativo" | "tactico" | "estrategico"; // Corrección 2: campo requerido
}

export interface IndicadorNivel {
  nivel: 1 | 2 | 3 | 4 | 5;
  descripcion: string;
}

export interface Competencia {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoCompetencia;
  nivelJerarquico: ("operativo" | "tactico" | "estrategico")[];
  comportamientos: ComportamientoObservable[]; // Corrección 2: comportamientos reales con nivel
  indicadores: IndicadorNivel[];
  pesoPorDefecto: number;
  inmutable: boolean; // Corporativas INMUTABLES
  activa: boolean;
  esExclusivaEstrategico: boolean; // Corrección 2: is_strategic_exclusive
}

export interface AsignacionCompetencia {
  competenciaId: string;
  peso: number; // % del 40% de competencias, debe sumar 100%
  proficienciaEsperada: 1 | 2 | 3 | 4 | 5;
}

// Calificación de un comportamiento individual
export interface CalificacionComportamiento {
  competenciaId: string;
  comportamientoId: string;
  calificacion: number; // 1.0 a 5.0, decimal permitido
}

// Calificación total de una competencia por participante
export interface CalificacionCompetencia {
  competenciaId: string;
  peso: number; // peso asignado por el líder
  calificacionesComportamientos: CalificacionComportamiento[];
  calificacionTotal: number; // promedio de comportamientos × peso
  necesidadesMejoramiento?: string;
  observaciones?: string;
}

// ===== PERFIL DE CARGO (JobProfile) =====
// Corrección 5: entidad fuente de verdad del sistema
export interface KpiCargo {
  id: string;
  funcion: string; // Qué: descripción de la tarea
  como: string; // Herramienta/método
  cuando: string; // Frecuencia
  paraQue: string; // Propósito
  objetivoSmart: string; // Objetivo SMART
  indicadorKpi: string; // KPI
  formulaMedicion: string; // Corrección 4: fórmula de medición (nueva vs 2024)
  pesoPct: number; // % ponderación
}

export interface RelacionOrganizacional {
  entidad: string;
  tipoRelacion: string;
}

export interface PerfilCargo {
  id: string;
  companyId: string; // Corrección 6
  nombreCargo: string;
  nivelJerarquico: "operativo" | "tactico" | "estrategico";
  nivelAcademico: string;
  aniosExperiencia: number;
  mision: string;
  kpis: KpiCargo[]; // Corrección 5: objetivos con estructura completa
  competencias: AsignacionCompetencia[];
  relacionesInternas: RelacionOrganizacional[];
  relacionesExternas: RelacionOrganizacional[];
  autonomiaDecisiones: string[];
  activo: boolean;
  version: number;
}

// ===== EVALUACIÓN POR PARTICIPANTE =====
// Un ObjetivoEvaluado es la instancia de un KPI del perfil de cargo
// copiada al momento de abrir el ciclo, con las calificaciones de ese ciclo.
// NO existe fuera de una EvaluacionParticipante.
export type EstadoObjetivo = "pendiente" | "en_progreso" | "completado" | "cancelado";

export interface ObjetivoEvaluado {
  id: string;
  kpiCargoId: string;           // referencia al KPI original del PerfilCargo
  funcion: string;
  como: string;
  cuando: string;
  paraQue: string;
  objetivoSmart: string;
  indicadorKpi: string;
  formulaMedicion: string;
  peso: number;                  // % copiado del perfil (suma 100 entre todos)
  estado: EstadoObjetivo;
  evidencias: string[];
  // Autocalificación del evaluado (solo objetivos)
  resultadoEvaluado?: number;    // resultado real logrado (ej: 78%)
  autocalificacion?: number;     // nota 1–5
  observacionEvaluado?: string;
  // Calificación del líder
  calificacionLider?: number;    // nota 1–5
  observacionLider?: string;
}

// Una EvaluacionParticipante es la evaluación completa de UNA persona en UN ciclo.
// Es la unidad que agrupa todo: objetivos copiados del perfil, competencias y sus
// calificaciones, comentarios, firmas y puntajes finales.
export interface EvaluacionParticipante {
  usuarioId: string;

  // Objetivos copiados del PerfilCargo al abrir el ciclo
  objetivos: ObjetivoEvaluado[];

  // Calificaciones de competencias (por comportamiento)
  calificacionesCompetencias: CalificacionCompetencia[];

  // Puntajes calculados (puntaje 0–5 + porcentaje 0–100%)
  puntajeObjetivos?: number;
  porcentajeObjetivos?: number;
  puntajeCompetencias?: number;
  porcentajeCompetencias?: number;
  puntajePares?: number;
  porcentajePares?: number;
  puntajeFinal?: number;
  porcentajeFinal?: number;

  // Comentarios de cierre
  comentarioJefe?: string;
  comentarioColaborador?: string;
  planesAccionCompromisos?: string;

  // Firmas
  firmadoLider: boolean;
  firmadoColaborador: boolean;
}

// ===== CICLO DE EVALUACIÓN =====
export type EstadoEvaluacion =
  | "configuracion"
  | "autocalificacion"
  | "calificacion_lider"
  | "pares"
  | "revision_th"
  | "cerrada";

export type TipoEvaluacion = "90" | "180" | "360";
export type PeriodoEvaluacion = "anual" | "semestral" | "trimestral";

export interface CicloEvaluacion {
  id: string;
  nombre: string;
  tipo: TipoEvaluacion;
  periodo: PeriodoEvaluacion;
  anio: number;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoEvaluacion;
  companyId: string;
  creadoPor: string;
  pesoObjetivos: number;     // default 60
  pesoCompetencias: number;  // default 40 (suma 100 con pesoObjetivos)
  // Cada elemento es la evaluación completa de un participante en este ciclo
  participantes: EvaluacionParticipante[];
}

// Alias de compatibilidad para código que aún use ResultadoParticipante
/** @deprecated Usar EvaluacionParticipante */
export type ResultadoParticipante = EvaluacionParticipante;


// ===== ESCALA DE CALIFICACIÓN OFICIAL INMOV =====
// Corrección 7: documentar significado de cada nivel
export const ESCALA_CALIFICACION = [
  { desde: 1, hasta: 1.9, descripcion: "No cumple con las especificaciones de las competencias requeridas para el nivel del cargo.", etiqueta: "Insatisfactorio" },
  { desde: 2, hasta: 2.9, descripcion: "Cumple con algunas especificaciones de las competencias requeridas para el nivel del cargo.", etiqueta: "Por mejorar" },
  { desde: 3, hasta: 3.9, descripcion: "Cumple con la mayoría de las especificaciones de las competencias requeridas para el nivel del cargo.", etiqueta: "Satisfactorio" },
  { desde: 4, hasta: 4.9, descripcion: "Cumple con todas las especificaciones de las competencias requeridas para el nivel del cargo.", etiqueta: "Destacado" },
  { desde: 5, hasta: 5, descripcion: "Cumple excepcionalmente con todas las especificaciones de las competencias requeridas para el nivel del cargo.", etiqueta: "Excepcional" },
] as const;

// Corrección 9: funciones de cálculo documentadas
export function calcularPuntajeFinal(
  puntajeObjetivos: number,
  puntajeCompetencias: number,
  pesoObjetivos: number = 60,
  pesoCompetencias: number = 40
): { puntaje: number; porcentaje: number } {
  const puntaje = (puntajeObjetivos * pesoObjetivos) / 100 + (puntajeCompetencias * pesoCompetencias) / 100;
  const porcentaje = (puntaje / 5) * 100;
  return { puntaje: Math.round(puntaje * 100) / 100, porcentaje: Math.round(porcentaje * 10) / 10 };
}

export function calcularPuntajeCompetencia(
  calificaciones: number[], // calificaciones de cada comportamiento
  pesoCompetencia: number   // % peso de esta competencia (del 40% total)
): number {
  const promedio = calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
  return Math.round(promedio * (pesoCompetencia / 100) * 100) / 100;
}

// ===== FIRMA DIGITAL =====
export type EstadoFirma = "pendiente" | "firmado" | "rechazado";

export interface FirmaDigital {
  id: string;
  evaluacionId: string;
  participanteId: string;
  nombreDocumento: string;
  estado: EstadoFirma;
  tipoFirmante: "lider" | "colaborador"; // Corrección 3: firmas separadas
  timestamp?: string;
  ipMock?: string;
  otpUsado?: string;
  hashDocumento: string;
  auditTrail: AuditEntry[];
}

export interface AuditEntry {
  accion: string;
  usuarioId: string;
  timestamp: string;
  ip: string;
  dispositivo: string;
}

// ===== PARES 360 =====
export type EstadoAprobacionPares = "pendiente_th" | "aprobado" | "rechazado";

export interface SugerenciaPar {
  usuarioId: string;
  score: number;
  justificacion: string;
  categoria: "par" | "subordinado" | "cliente_interno";
}

export interface SeleccionPares {
  id: string;
  evaluadoId: string;
  evaluacionId: string;
  sugerenciasIA: SugerenciaPar[];
  paresAprobados: string[];
  estadoAprobacion: EstadoAprobacionPares;
  revisadoPor?: string;
}

// ===== PDI =====
export type EstadoAccion = "pendiente" | "en_progreso" | "completada";

export interface AccionPDI {
  id: string;
  actividad: string;
  tipo: "formacion" | "mentoring" | "proyecto" | "coaching";
  plazo: string;
  responsable: string;
  estado: EstadoAccion;
  metrica: string;
}

export interface PDI {
  id: string;
  evaluadoId: string;
  evaluacionId: string;
  areasFortaleza: string[];
  areasMejora: string[];
  feedbackIA?: string;
  feedbackLider?: string;
  planAccion: AccionPDI[];
  generadoEn?: string;
  aprobadoPor?: string;
  estado: "borrador" | "en_revision" | "aprobado";
}

// ===== ANALYTICS =====
export interface KPI {
  label: string;
  valor: number | string;
  variacion?: number;
  icono: string;
  color: string;
}

export interface NineBoxPosition {
  usuarioId: string;
  desempeno: 1 | 2 | 3;
  potencial: 1 | 2 | 3;
  etiqueta: string;
}

// Corrección 5 y 7: Fila de la matriz consolidada (reporte Analytics)
export interface FilaMatrizConsolidada {
  // Datos del empleado
  cedula: string;
  nombre: string;
  cargo: string;
  compania: string;
  fechaIngreso: string;
  nivel: string;
  tipoContrato: string;
  antiguedad: string;
  // Datos del evaluador
  cedulaLider: string;
  nombreLider: string;
  // Por competencia: peso + calificación de cada comportamiento + total competencia
  competencias: {
    competenciaId: string;
    nombreCompetencia: string;
    peso: number;
    calificacionesPorComportamiento: { descripcion: string; calificacion: number }[];
    calificacionTotal: number;
  }[];
  // Totales
  calificacionTotal: number; // 0-5
  porcentajeTotal: number; // 0-100%
  // Comentarios y planes
  comentariosJefe: string;
  comentariosColaborador: string;
  planesAccion: string;
}
