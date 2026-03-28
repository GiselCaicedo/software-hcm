import { FilaMatrizConsolidada } from "@/types";
import { calcularAntiguedad } from "./users";

// Corrección 7: Matriz Consolidada — equivalente digital del archivo
// EVALUACIÓN_DE_COMPETENCIAS_17_FEBRERO_2026.xlsx
// Una fila por empleado, columnas por competencia+comportamiento, totales ponderados, comentarios
// Filtrable por nivel, área, compañía, período

export const MOCK_MATRIZ_CONSOLIDADA_E3: FilaMatrizConsolidada[] = [
  // ─── NIVEL OPERATIVO ───
  {
    cedula: "1.040.666.777",
    nombre: "Torres Andrés",
    cargo: "Analista de Operaciones",
    compania: "INMOV S.A.S.",
    fechaIngreso: "2021-05-10",
    nivel: "Operativo",
    tipoContrato: "Indefinido",
    antiguedad: calcularAntiguedad("2021-05-10"),
    cedulaLider: "1.010.222.333",
    nombreLider: "Mendoza Carlos",
    competencias: [
      {
        competenciaId: "c-compromiso",
        nombreCompetencia: "Compromiso",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Cumplimiento de Objetivos y Plazos", calificacion: 4.0 },
          { descripcion: "Proactividad y Mejora Continua", calificacion: 3.8 },
          { descripcion: "Compromiso con la Satisfacción del Cliente", calificacion: 4.2 },
        ],
        calificacionTotal: 3.81, // promedio × peso: ((4.0+3.8+4.2)/3) × 0.17 = 0.681 → acumulado
      },
      {
        competenciaId: "c-proactividad",
        nombreCompetencia: "Proactividad - Iniciativa",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Identificación Proactiva de Problemas", calificacion: 3.5 },
          { descripcion: "Acción Inmediata ante Dificultades", calificacion: 4.0 },
          { descripcion: "Búsqueda de Eficiencia en Tareas", calificacion: 3.8 },
        ],
        calificacionTotal: 3.77,
      },
      {
        competenciaId: "c-orientacion-cliente",
        nombreCompetencia: "Orientación al Cliente",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Identificación y Comprensión de Necesidades del Cliente", calificacion: 4.0 },
          { descripcion: "Resolución Eficaz de Problemas del Cliente", calificacion: 4.2 },
          { descripcion: "Seguimiento y Retroalimentación al Cliente", calificacion: 3.8 },
        ],
        calificacionTotal: 4.0,
      },
      {
        competenciaId: "c-trabajo-equipo",
        nombreCompetencia: "Trabajo en Equipo",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Colaboración y Comunicación Efectiva", calificacion: 4.0 },
          { descripcion: "Apoyo Mutuo y Resolución de Conflictos", calificacion: 3.5 },
          { descripcion: "Responsabilidad Compartida y Logro de Objetivos Comunes", calificacion: 4.0 },
        ],
        calificacionTotal: 3.83,
      },
      {
        competenciaId: "c-organizacion-tiempo",
        nombreCompetencia: "Organización y Manejo del Tiempo",
        peso: 16,
        calificacionesPorComportamiento: [
          { descripcion: "Planificación de Tareas Diarias", calificacion: 3.8 },
          { descripcion: "Gestión del Tiempo", calificacion: 3.5 },
          { descripcion: "Cumplimiento de Plazos", calificacion: 4.0 },
        ],
        calificacionTotal: 3.77,
      },
      {
        competenciaId: "c-liderazgo",
        nombreCompetencia: "Liderazgo",
        peso: 16,
        calificacionesPorComportamiento: [
          { descripcion: "Promoción de la Participación del Equipo", calificacion: 3.5 },
          { descripcion: "Eficiencia en Reuniones", calificacion: 3.8 },
          { descripcion: "Claridad en la Comunicación", calificacion: 4.0 },
          { descripcion: "Desarrollo de Talentos", calificacion: 3.2 },
          { descripcion: "Integridad y Coherencia", calificacion: 4.5 },
          { descripcion: "Retroalimentación Positiva", calificacion: 3.8 },
        ],
        calificacionTotal: 3.8,
      },
    ],
    calificacionTotal: 3.83,
    porcentajeTotal: 76.6,
    comentariosJefe: "Andrés demuestra compromiso y proactividad. Debe fortalecer sus habilidades de liderazgo y la documentación de procesos para poder escalar en la organización.",
    comentariosColaborador: "Estoy satisfecho con mi desempeño en los indicadores técnicos. Reconozco que debo mejorar en liderazgo y gestión del tiempo.",
    planesAccion: "1. Completar curso de liderazgo situacional (Q1 2026). 2. Certificación en gestión de proyectos (Q2 2026). 3. Mentoría mensual con Carlos Mendoza.",
  },

  {
    cedula: "1.050.888.999",
    nombre: "Gómez Daniela",
    cargo: "Ejecutiva Comercial",
    compania: "INMOV S.A.S.",
    fechaIngreso: "2022-02-28",
    nivel: "Operativo",
    tipoContrato: "Indefinido",
    antiguedad: calcularAntiguedad("2022-02-28"),
    cedulaLider: "1.030.444.555",
    nombreLider: "Ríos Valentina",
    competencias: [
      {
        competenciaId: "c-compromiso",
        nombreCompetencia: "Compromiso",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Cumplimiento de Objetivos y Plazos", calificacion: 4.5 },
          { descripcion: "Proactividad y Mejora Continua", calificacion: 4.0 },
          { descripcion: "Compromiso con la Satisfacción del Cliente", calificacion: 4.8 },
        ],
        calificacionTotal: 4.43,
      },
      {
        competenciaId: "c-proactividad",
        nombreCompetencia: "Proactividad - Iniciativa",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Identificación Proactiva de Problemas", calificacion: 4.0 },
          { descripcion: "Acción Inmediata ante Dificultades", calificacion: 4.2 },
          { descripcion: "Búsqueda de Eficiencia en Tareas", calificacion: 3.8 },
        ],
        calificacionTotal: 4.0,
      },
      {
        competenciaId: "c-orientacion-cliente",
        nombreCompetencia: "Orientación al Cliente",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Identificación y Comprensión de Necesidades del Cliente", calificacion: 4.5 },
          { descripcion: "Resolución Eficaz de Problemas del Cliente", calificacion: 4.0 },
          { descripcion: "Seguimiento y Retroalimentación al Cliente", calificacion: 4.5 },
        ],
        calificacionTotal: 4.33,
      },
      {
        competenciaId: "c-trabajo-equipo",
        nombreCompetencia: "Trabajo en Equipo",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Colaboración y Comunicación Efectiva", calificacion: 3.5 },
          { descripcion: "Apoyo Mutuo y Resolución de Conflictos", calificacion: 3.8 },
          { descripcion: "Responsabilidad Compartida y Logro de Objetivos Comunes", calificacion: 4.0 },
        ],
        calificacionTotal: 3.77,
      },
      {
        competenciaId: "c-organizacion-tiempo",
        nombreCompetencia: "Organización y Manejo del Tiempo",
        peso: 16,
        calificacionesPorComportamiento: [
          { descripcion: "Planificación de Tareas Diarias", calificacion: 4.0 },
          { descripcion: "Gestión del Tiempo", calificacion: 3.8 },
          { descripcion: "Cumplimiento de Plazos", calificacion: 4.2 },
        ],
        calificacionTotal: 4.0,
      },
      {
        competenciaId: "c-liderazgo",
        nombreCompetencia: "Liderazgo",
        peso: 16,
        calificacionesPorComportamiento: [
          { descripcion: "Promoción de la Participación del Equipo", calificacion: 3.5 },
          { descripcion: "Eficiencia en Reuniones", calificacion: 3.5 },
          { descripcion: "Claridad en la Comunicación", calificacion: 3.8 },
          { descripcion: "Desarrollo de Talentos", calificacion: 3.0 },
          { descripcion: "Integridad y Coherencia", calificacion: 4.2 },
          { descripcion: "Retroalimentación Positiva", calificacion: 3.5 },
        ],
        calificacionTotal: 3.58,
      },
    ],
    calificacionTotal: 4.02,
    porcentajeTotal: 80.4,
    comentariosJefe: "Daniela es una de las mejores ejecutivas del equipo en términos de resultados comerciales. Necesita trabajar en trabajo en equipo y comunicación con sus pares.",
    comentariosColaborador: "Me siento comprometida con los resultados de la empresa. Reconozco que debo mejorar mi trabajo con el equipo comercial.",
    planesAccion: "1. Taller de comunicación asertiva (Q1 2026). 2. Proyecto colaborativo con otro ejecutivo (Q2 2026).",
  },

  // ─── NIVEL TÁCTICO ───
  {
    cedula: "1.070.333.444",
    nombre: "Jiménez Laura",
    cargo: "Coordinadora de Tecnología",
    compania: "INMOV S.A.S.",
    fechaIngreso: "2020-08-20",
    nivel: "Táctico",
    tipoContrato: "Indefinido",
    antiguedad: calcularAntiguedad("2020-08-20"),
    cedulaLider: "1.010.222.333",
    nombreLider: "Mendoza Carlos",
    competencias: [
      {
        competenciaId: "c-compromiso",
        nombreCompetencia: "Compromiso",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Cumplimiento de Objetivos Estratégicos del Área", calificacion: 4.8 },
          { descripcion: "Impulso de Mejora Continua en el Equipo", calificacion: 4.5 },
          { descripcion: "Compromiso con Resultados del Negocio", calificacion: 4.7 },
        ],
        calificacionTotal: 4.67,
      },
      {
        competenciaId: "c-proactividad",
        nombreCompetencia: "Proactividad - Iniciativa",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Anticipación de Riesgos del Área", calificacion: 4.5 },
          { descripcion: "Gestión Proactiva de Recursos", calificacion: 4.2 },
          { descripcion: "Optimización de Procesos del Equipo", calificacion: 4.8 },
        ],
        calificacionTotal: 4.5,
      },
      {
        competenciaId: "c-orientacion-cliente",
        nombreCompetencia: "Orientación al Cliente",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Diseño de Estrategias de Servicio al Cliente", calificacion: 4.5 },
          { descripcion: "Gestión de Experiencia del Cliente en el Área", calificacion: 4.3 },
          { descripcion: "Medición y Mejora de Indicadores de Satisfacción", calificacion: 4.7 },
        ],
        calificacionTotal: 4.5,
      },
      {
        competenciaId: "c-trabajo-equipo",
        nombreCompetencia: "Trabajo en Equipo",
        peso: 17,
        calificacionesPorComportamiento: [
          { descripcion: "Integración y Cohesión del Equipo", calificacion: 4.8 },
          { descripcion: "Gestión de Conflictos Interfuncionales", calificacion: 4.2 },
          { descripcion: "Construcción de Sinergias entre Áreas", calificacion: 4.5 },
        ],
        calificacionTotal: 4.5,
      },
      {
        competenciaId: "c-organizacion-tiempo",
        nombreCompetencia: "Organización y Manejo del Tiempo",
        peso: 16,
        calificacionesPorComportamiento: [
          { descripcion: "Planificación de Proyectos y Recursos del Área", calificacion: 4.5 },
          { descripcion: "Priorización Estratégica de Actividades", calificacion: 4.3 },
          { descripcion: "Control y Seguimiento de Entregables", calificacion: 4.8 },
        ],
        calificacionTotal: 4.53,
      },
      {
        competenciaId: "c-liderazgo",
        nombreCompetencia: "Liderazgo",
        peso: 16,
        calificacionesPorComportamiento: [
          { descripcion: "Liderazgo de Equipos Multidisciplinarios", calificacion: 4.7 },
          { descripcion: "Gestión del Desempeño del Equipo", calificacion: 4.5 },
          { descripcion: "Desarrollo y Retención de Talento", calificacion: 4.3 },
          { descripcion: "Comunicación Estratégica con Stakeholders", calificacion: 4.8 },
          { descripcion: "Integridad en la Toma de Decisiones", calificacion: 5.0 },
          { descripcion: "Cultura de Retroalimentación Continua", calificacion: 4.5 },
        ],
        calificacionTotal: 4.63,
      },
    ],
    calificacionTotal: 4.55,
    porcentajeTotal: 91.0,
    comentariosJefe: "Laura es una líder excepcional. Sus capacidades técnicas y de gestión de personas son sobresalientes. Es candidata para roles de mayor responsabilidad.",
    comentariosColaborador: "Me siento muy satisfecha con mi desempeño. Quiero continuar desarrollándome en habilidades de innovación y estrategia.",
    planesAccion: "1. Programa de liderazgo avanzado (Q1 2026). 2. Certificación en gestión de proyectos ágiles (Q2 2026). 3. Mentoría con directivo externo.",
  },
];

// Función para generar la fila de matriz consolidada de un participante
// dado su resultado de evaluación — útil para el módulo de Analytics
export function filtrarMatrizPorCompania(
  matriz: FilaMatrizConsolidada[],
  compania: string
): FilaMatrizConsolidada[] {
  return matriz.filter((fila) => fila.compania === compania);
}

export function filtrarMatrizPorNivel(
  matriz: FilaMatrizConsolidada[],
  nivel: string
): FilaMatrizConsolidada[] {
  return matriz.filter((fila) => fila.nivel.toLowerCase() === nivel.toLowerCase());
}
