import type { CicloEvaluacion, EvaluacionDetalle } from "@/types/evaluaciones";

// ── Ciclos ───────────────────────────────────────────────────────────────────

export const CICLOS_MOCK: CicloEvaluacion[] = [
  {
    id: "ciclo-q1-2026",
    nombre: "Evaluación Desempeño Q1 2026",
    tipo: "180",
    estado: "activo",
    fechaInicio: "2026-01-01",
    fechaLimite: "2026-03-15",
    fechaCierre: "2026-03-31",
    poblacion: { niveles: ["operativo", "tactico", "estrategico"], areas: ["todas"] },
    pesoObjetivos: 50,
    pesoCompetencias: 50,
    pesoLider: 70,
    pesoPar: 30,
    totalEvaluaciones: 3,
    completadas: 1,
    firmadas: 1,
  },
];

// ── Evaluaciones individuales ────────────────────────────────────────────────

export const EVALUACIONES_MOCK: EvaluacionDetalle[] = [
  // ── 1. OPERATIVO — Sara Jennifer Olarte Peña ─────────────────────────────
  {
    id: "ev-sara-q1-2026",
    cicloId: "ciclo-q1-2026",
    cicloNombre: "Evaluación Desempeño Q1 2026",
    tipo: "180",
    estado: "en_progreso",
    fechaInicio: "2026-01-01",
    fechaLimite: "2026-03-15",
    pesoObjetivos: 50,
    pesoCompetencias: 50,
    pesoLiderEnCompetencias: 70,
    pesoParEnCompetencias: 30,
    firmadoLider: false,
    firmadoColaborador: false,
    colaborador: {
      id: "u-sara",
      nombre: "Sara Jennifer Olarte Peña",
      cargo: "Auxiliar Administrativo",
      rol: "colaborador",
      completado: false,
    },
    lider: {
      id: "u-rodrigo",
      nombre: "Rodrigo Garzón Latorre",
      cargo: "Coordinador de Operaciones",
      rol: "lider",
      completado: false,
    },
    par: {
      id: "u-deisy",
      nombre: "Deisy Natalia Gómez Valdés",
      cargo: "Agente Call Center y Digitador",
      rol: "par",
      completado: false,
    },
    // Objetivos precargados desde el perfil de cargo Auxiliar Administrativo
    objetivos: [
      {
        id: "obj-sara-1",
        descripcion:
          "Registrar y actualizar el 100% de los proveedores activos en el sistema de información contable dentro de los primeros 5 días hábiles de cada mes, garantizando que los datos estén completos y correctos.",
        peso: 25,
        metaCuantitativa: "(Proveedores actualizados / Total proveedores activos) × 100 ≥ 100%",
      },
      {
        id: "obj-sara-2",
        descripcion:
          "Mantener el 100% de la documentación contable archivada correctamente en el sistema digital y físico, con un tiempo de respuesta máximo de 2 horas ante cualquier solicitud de documento.",
        peso: 50,
        metaCuantitativa: "(Documentos correctamente archivados / Total documentos) × 100 ≥ 100%",
      },
      {
        id: "obj-sara-3",
        descripcion:
          "Completar el 95% de las tareas de apoyo operativo asignadas dentro de los plazos establecidos, con cero reprocesos por errores de ejecución durante el trimestre.",
        peso: 25,
        metaCuantitativa: "(Tareas completadas en plazo / Total tareas asignadas) × 100 ≥ 95%",
      },
    ],
    // Competencias 6 operativas de la biblioteca
    competencias: [
      { id: "cev-sara-1", nombre: "Compromiso", tipo: "organizacional", nivelEsperado: 3, calificaciones: {} },
      { id: "cev-sara-2", nombre: "Proactividad - Iniciativa", tipo: "organizacional", nivelEsperado: 3, calificaciones: {} },
      { id: "cev-sara-3", nombre: "Orientación al Cliente", tipo: "organizacional", nivelEsperado: 3, calificaciones: {} },
      { id: "cev-sara-4", nombre: "Trabajo en Equipo", tipo: "organizacional", nivelEsperado: 3, calificaciones: {} },
      { id: "cev-sara-5", nombre: "Organización y Manejo del Tiempo", tipo: "por_nivel", nivelEsperado: 3, calificaciones: {} },
      { id: "cev-sara-6", nombre: "Liderazgo", tipo: "por_nivel", nivelEsperado: 3, calificaciones: {} },
    ],
  },

  // ── 2. TÁCTICO — Rodrigo Garzón Latorre ──────────────────────────────────
  {
    id: "ev-rodrigo-q1-2026",
    cicloId: "ciclo-q1-2026",
    cicloNombre: "Evaluación Desempeño Q1 2026",
    tipo: "180",
    estado: "consolidado",
    fechaInicio: "2026-01-01",
    fechaLimite: "2026-03-15",
    pesoObjetivos: 50,
    pesoCompetencias: 50,
    pesoLiderEnCompetencias: 70,
    pesoParEnCompetencias: 30,
    puntajeFinal: 3.95,
    firmadoLider: false,
    firmadoColaborador: false,
    colaborador: {
      id: "u-rodrigo",
      nombre: "Rodrigo Garzón Latorre",
      cargo: "Coordinador de Operaciones",
      rol: "colaborador",
      completado: true,
      fechaCompletado: "2026-02-10",
    },
    lider: {
      id: "u-sindy",
      nombre: "Sindy Caicedo",
      cargo: "HR Manager",
      rol: "lider",
      completado: true,
      fechaCompletado: "2026-02-25",
    },
    par: {
      id: "u-carlos",
      nombre: "Carlos Martínez",
      cargo: "Tech Lead",
      rol: "par",
      completado: true,
      fechaCompletado: "2026-02-20",
    },
    objetivos: [
      {
        id: "obj-rodrigo-1",
        descripcion:
          "Mantener el cumplimiento de SLA por encima del 95% en todos los procesos bajo su responsabilidad durante el trimestre.",
        peso: 35,
        metaCuantitativa: "(Servicios entregados en tiempo / Total servicios comprometidos) × 100 ≥ 95%",
        calificacionColaborador: 4,
        calificacionLider: 4,
        observacion: "SLA promedio del trimestre: 96.2%. Excelente gestión del equipo.",
      },
      {
        id: "obj-rodrigo-2",
        descripcion:
          "Realizar el 100% de las reuniones de seguimiento programadas y mantener la satisfacción del equipo por encima de 4.0/5.0.",
        peso: 30,
        metaCuantitativa: "(Reuniones realizadas / Reuniones programadas) × 100 = 100%",
        calificacionColaborador: 4,
        calificacionLider: 3,
        observacion: "Se realizaron 11 de 12 reuniones. Satisfacción del equipo: 4.2/5.0.",
      },
      {
        id: "obj-rodrigo-3",
        descripcion:
          "Entregar el 100% de los reportes operativos en las fechas establecidas con información completa y sin errores.",
        peso: 20,
        metaCuantitativa: "(Reportes entregados en fecha / Total reportes comprometidos) × 100 = 100%",
        calificacionColaborador: 5,
        calificacionLider: 4,
      },
      {
        id: "obj-rodrigo-4",
        descripcion:
          "Identificar e implementar al menos 2 mejoras de proceso por trimestre con impacto medible en eficiencia.",
        peso: 15,
        metaCuantitativa: "≥ 2 iniciativas de mejora implementadas con indicador documentado",
        calificacionColaborador: 4,
        calificacionLider: 4,
        observacion: "Se implementaron 3 mejoras de proceso con ahorro documentado.",
      },
    ],
    competencias: [
      { id: "cev-rodrigo-1", nombre: "Compromiso", tipo: "organizacional", nivelEsperado: 4, calificaciones: { lider: 4, par: 4 } },
      { id: "cev-rodrigo-2", nombre: "Proactividad - Iniciativa", tipo: "organizacional", nivelEsperado: 4, calificaciones: { lider: 4, par: 3 } },
      { id: "cev-rodrigo-3", nombre: "Orientación al Cliente", tipo: "organizacional", nivelEsperado: 4, calificaciones: { lider: 4, par: 4 } },
      { id: "cev-rodrigo-4", nombre: "Trabajo en Equipo", tipo: "organizacional", nivelEsperado: 4, calificaciones: { lider: 4, par: 5 } },
      { id: "cev-rodrigo-5", nombre: "Organización y Manejo del Tiempo", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 4, par: 4 } },
      { id: "cev-rodrigo-6", nombre: "Liderazgo", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 4, par: 4 }, observacion: "Muy buen liderazgo del equipo operativo." },
    ],
  },

  // ── 3. ESTRATÉGICO — Sindy Caicedo ────────────────────────────────────────
  {
    id: "ev-sindy-q1-2026",
    cicloId: "ciclo-q1-2026",
    cicloNombre: "Evaluación Desempeño Q1 2026",
    tipo: "90",
    estado: "firmado_lider",
    fechaInicio: "2026-01-01",
    fechaLimite: "2026-03-15",
    pesoObjetivos: 50,
    pesoCompetencias: 50,
    pesoLiderEnCompetencias: 100,
    pesoParEnCompetencias: 0,
    puntajeFinal: 4.35,
    firmadoLider: true,
    firmadoColaborador: false,
    observacionesLider:
      "Sindy ha liderado de manera excepcional la implementación del sistema de evaluación de desempeño. Su capacidad para gestionar múltiples frentes estratégicos simultáneamente es destacable. El foco para el próximo ciclo debe estar en la medición de impacto de las iniciativas de clima.",
    checkboxLider: true,
    colaborador: {
      id: "u-sindy",
      nombre: "Sindy Caicedo",
      cargo: "HR Manager",
      rol: "colaborador",
      completado: true,
      fechaCompletado: "2026-02-15",
    },
    lider: {
      id: "u-sindy",
      nombre: "Sindy Caicedo",
      cargo: "HR Manager",
      rol: "lider",
      completado: true,
      fechaCompletado: "2026-03-01",
    },
    objetivos: [
      {
        id: "obj-sindy-1",
        descripcion:
          "Implementar el ciclo de evaluación Q1 2026 logrando un 90% de participación y un NPS del proceso ≥ 8.0 al cierre del trimestre.",
        peso: 35,
        metaCuantitativa: "(Evaluaciones completadas / Total evaluaciones) × 100 ≥ 90%",
        calificacionColaborador: 5,
        calificacionLider: 4,
        observacion: "Participación alcanzada: 92%. NPS del proceso: 8.4.",
      },
      {
        id: "obj-sindy-2",
        descripcion:
          "Mantener la rotación voluntaria por debajo del 8% anual e implementar planes de carrera para el 100% del talento crítico.",
        peso: 25,
        metaCuantitativa: "Rotación voluntaria < 8% / 100% talento crítico con plan de carrera",
        calificacionColaborador: 4,
        calificacionLider: 4,
        observacion: "Rotación Q1: 1.8% (proyección anual 7.2%). Planes de carrera: 85% completados.",
      },
      {
        id: "obj-sindy-3",
        descripcion:
          "Alcanzar un índice de clima organizacional ≥ 75% en la medición semestral e implementar el 80% de las acciones de mejora.",
        peso: 25,
        metaCuantitativa: "Índice de clima ≥ 75% / 80% acciones implementadas",
        calificacionColaborador: 4,
        calificacionLider: 5,
        observacion: "Índice de clima: 78%. Acciones de mejora implementadas: 83%.",
      },
      {
        id: "obj-sindy-4",
        descripcion:
          "Mantener el 100% de cumplimiento en procesos de nómina, contratos y SGSST sin hallazgos críticos en auditorías.",
        peso: 15,
        metaCuantitativa: "(Procesos en cumplimiento / Total procesos auditados) × 100 = 100%",
        calificacionColaborador: 5,
        calificacionLider: 5,
      },
    ],
    competencias: [
      { id: "cev-sindy-1", nombre: "Solución de Problemas", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 4 } },
      { id: "cev-sindy-2", nombre: "Aptitud de Negocio", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 4 } },
      { id: "cev-sindy-3", nombre: "Trabajo en Equipo", tipo: "organizacional", nivelEsperado: 5, calificaciones: { lider: 5 } },
      { id: "cev-sindy-4", nombre: "Atención al Cliente", tipo: "organizacional", nivelEsperado: 4, calificaciones: { lider: 4 } },
      { id: "cev-sindy-5", nombre: "Toma de Decisiones", tipo: "por_nivel", nivelEsperado: 5, calificaciones: { lider: 4 } },
      { id: "cev-sindy-6", nombre: "Adaptabilidad", tipo: "organizacional", nivelEsperado: 4, calificaciones: { lider: 5 } },
      { id: "cev-sindy-7", nombre: "Tolerancia al Estrés", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 4 } },
      { id: "cev-sindy-8", nombre: "Innovación", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 4 }, observacion: "Lideró la innovación en el sistema de evaluación digital." },
      { id: "cev-sindy-9", nombre: "Análisis de la Información", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 5 } },
      { id: "cev-sindy-10", nombre: "Planeación y Orden", tipo: "por_nivel", nivelEsperado: 4, calificaciones: { lider: 4 } },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getCiclo(id: string): CicloEvaluacion | undefined {
  return CICLOS_MOCK.find((c) => c.id === id);
}

export function getEvaluacionesDeCiclo(cicloId: string): EvaluacionDetalle[] {
  return EVALUACIONES_MOCK.filter((e) => e.cicloId === cicloId);
}

export function getEvaluacion(cicloId: string, evalId: string): EvaluacionDetalle | undefined {
  return EVALUACIONES_MOCK.find((e) => e.cicloId === cicloId && e.id === evalId);
}

export function getEvaluacionesColaborador(userId: string): EvaluacionDetalle[] {
  return EVALUACIONES_MOCK.filter(
    (e) => e.colaborador.id === userId && e.estado !== "cerrado"
  ).sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));
}

/**
 * Algoritmo de sugerencia de pares:
 * +40 mismo nivel, +30 misma banda, +20 misma área, +15 misma sede, +10 relación de cargo
 * Excluir: jefe directo (50 pts) y el mismo colaborador (100 pts)
 * Resultado como % sobre 115 puntos máximos
 */
export interface SugerenciaPar {
  userId: string;
  nombre: string;
  cargo: string;
  puntaje: number;
  porcentajeCompatibilidad: number;
}

export function calcularPuntajePar(
  colaborador: { nivel: string; bandaSalarial: string; area: string; sede: string; liderDirectoId: string | null },
  candidato: { id: string; nivel: string; bandaSalarial: string; area: string; sede: string; liderDirectoId: string | null },
  colaboradorId: string
): number {
  if (candidato.id === colaboradorId) return -100; // excluir
  if (candidato.id === colaborador.liderDirectoId) return -50; // excluir jefe
  let pts = 0;
  if (candidato.nivel === colaborador.nivel) pts += 40;
  if (candidato.bandaSalarial === colaborador.bandaSalarial) pts += 30;
  if (candidato.area === colaborador.area) pts += 20;
  if (candidato.sede === colaborador.sede) pts += 15;
  return pts;
}
