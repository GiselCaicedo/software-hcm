import { CicloEvaluacion, EvaluacionParticipante, EstadoEvaluacion, PeriodoEvaluacion } from "@/types";
import { getUserById } from "@/lib/mock-data/users";

// Los objetivos ya NO son una colección global con evaluadoId.
// Cada EvaluacionParticipante dentro del ciclo tiene sus propios objetivos,
// copiados del PerfilCargo al momento de abrir el ciclo.

export const MOCK_EVALUACIONES: CicloEvaluacion[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // CICLO ACTIVO: Evaluación Anual 2025
  // Estado: calificacion_lider — el evaluado ya autocalificó, el líder califica
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "e1",
    nombre: "Evaluación Anual 2025",
    tipo: "360",
    periodo: "anual",
    anio: 2025,
    fechaInicio: "2026-01-15",
    fechaFin: "2026-03-31",
    estado: "calificacion_lider",
    companyId: "emp-1",
    creadoPor: "u1",
    pesoObjetivos: 60,
    pesoCompetencias: 40,
    participantes: [
      // ── Andrés Torres (Analista de Operaciones, Operativo) ──────────────
      {
        usuarioId: "u4",
        objetivos: [
          {
            id: "e1-u4-o1",
            kpiCargoId: "kpi-ao-1",
            funcion: "Gestión de satisfacción del cliente",
            como: "Encuestas NPS y seguimiento de tickets",
            cuando: "Mensual",
            paraQue: "Garantizar experiencia positiva del cliente en operaciones",
            objetivoSmart: "Aumentar el NPS del área de operaciones de 65 a 80 puntos al cierre del año 2025",
            indicadorKpi: "NPS (Net Promoter Score)",
            formulaMedicion: "(Promotores - Detractores) / Total encuestados × 100",
            peso: 30,
            estado: "completado",
            evidencias: ["reporte_nps_q4.pdf", "encuesta_satisfaccion.xlsx"],
            resultadoEvaluado: 78,
            autocalificacion: 4,
            observacionEvaluado: "Logramos 78 puntos, muy cerca de la meta. Implementamos nuevos protocolos de atención.",
            calificacionLider: 4,
            observacionLider: "Buen progreso, quedó 2 puntos por debajo pero el proceso mejoró notablemente.",
          },
          {
            id: "e1-u4-o2",
            kpiCargoId: "kpi-ao-2",
            funcion: "Gestión de tiempos de respuesta en soporte",
            como: "Sistema de tickets (Zendesk) y reportes mensuales",
            cuando: "Seguimiento semanal, reporte mensual",
            paraQue: "Mejorar la eficiencia operativa y satisfacción del cliente",
            objetivoSmart: "Reducir el tiempo promedio de resolución de tickets de 48h a 24h al 31 de diciembre 2025",
            indicadorKpi: "Tiempo promedio de resolución (horas)",
            formulaMedicion: "Suma de horas de resolución / Total tickets cerrados en el período",
            peso: 25,
            estado: "completado",
            evidencias: ["metricas_soporte_2025.pdf"],
            resultadoEvaluado: 22,
            autocalificacion: 5,
            observacionEvaluado: "Alcanzamos 22h promedio en diciembre. Automatizamos la clasificación de tickets.",
            calificacionLider: 5,
            observacionLider: "Excelente resultado, superó la meta. El proceso de automatización fue clave.",
          },
          {
            id: "e1-u4-o3",
            kpiCargoId: "kpi-ao-3",
            funcion: "Diseño e implementación de proceso de onboarding",
            como: "Documentación en Confluence + capacitación presencial",
            cuando: "Implementación continua durante el año",
            paraQue: "Reducir la curva de aprendizaje de nuevos colaboradores",
            objetivoSmart: "Diseñar e implementar proceso de onboarding documentado y aplicado al 100% de ingresos nuevos antes del 30 de junio 2025",
            indicadorKpi: "% de nuevos ingresos con onboarding completado",
            formulaMedicion: "(# colaboradores con onboarding completado / # total nuevos ingresos) × 100",
            peso: 20,
            estado: "en_progreso",
            evidencias: [],
            resultadoEvaluado: 70,
            autocalificacion: 3,
            observacionEvaluado: "El proceso se documentó pero solo se aplicó al 70% de los ingresos por falta de tiempo.",
          },
          {
            id: "e1-u4-o4",
            kpiCargoId: "kpi-ao-4",
            funcion: "Control presupuestal del área",
            como: "SAP y reportes financieros mensuales",
            cuando: "Seguimiento mensual, cierre trimestral",
            paraQue: "Garantizar eficiencia en el uso de recursos asignados al área",
            objetivoSmart: "Ejecutar el presupuesto asignado con desviación máxima del 5% al cierre del año 2025",
            indicadorKpi: "Desviación presupuestal (%)",
            formulaMedicion: "|(Presupuesto ejecutado - Presupuesto asignado)| / Presupuesto asignado × 100",
            peso: 25,
            estado: "pendiente",
            evidencias: [],
          },
        ],
        calificacionesCompetencias: [],
        puntajeObjetivos: 4.2,
        porcentajeObjetivos: 84,
        firmadoLider: false,
        firmadoColaborador: false,
      },

      // ── Daniela Gómez (Ejecutiva Comercial, Operativo) ──────────────────
      {
        usuarioId: "u5",
        objetivos: [
          {
            id: "e1-u5-o1",
            kpiCargoId: "kpi-ec-1",
            funcion: "Gestión de ventas de cartera activa",
            como: "CRM Salesforce + reuniones semanales con clientes",
            cuando: "Seguimiento semanal, cierre mensual",
            paraQue: "Incrementar los ingresos del área comercial y fidelizar clientes existentes",
            objetivoSmart: "Incrementar las ventas de la cartera activa en un 15% respecto al año anterior al 31 de diciembre 2025",
            indicadorKpi: "Crecimiento en ventas YoY (%)",
            formulaMedicion: "(Ventas 2025 - Ventas 2024) / Ventas 2024 × 100",
            peso: 40,
            estado: "completado",
            evidencias: ["reporte_ventas_2025.pdf"],
            resultadoEvaluado: 18,
            autocalificacion: 4,
            observacionEvaluado: "Crecí 18% en mi cartera. Trabajé más el upselling con clientes existentes.",
            calificacionLider: 4,
            observacionLider: "Superó la meta, muy buen desempeño en el cierre del año.",
          },
          {
            id: "e1-u5-o2",
            kpiCargoId: "kpi-ec-2",
            funcion: "Prospección y adquisición de nuevos clientes",
            como: "Llamadas en frío, LinkedIn y referidos",
            cuando: "Seguimiento quincenal",
            paraQue: "Ampliar la base de clientes activos y diversificar el portafolio",
            objetivoSmart: "Incorporar 10 nuevos clientes activos con al menos 1 compra efectiva antes del 31 de diciembre 2025",
            indicadorKpi: "Número de nuevos clientes activos",
            formulaMedicion: "# clientes nuevos con al menos 1 factura pagada en el período",
            peso: 35,
            estado: "completado",
            evidencias: [],
            resultadoEvaluado: 7,
            autocalificacion: 3,
            observacionEvaluado: "Logré 7 nuevos clientes. El mercado estuvo difícil en el segundo semestre.",
          },
          {
            id: "e1-u5-o3",
            kpiCargoId: "kpi-ec-3",
            funcion: "Gestión de indicadores comerciales",
            como: "Dashboard en Power BI y reporte semanal al jefe",
            cuando: "Semanal",
            paraQue: "Mantener visibilidad de la gestión comercial y tomar decisiones oportunas",
            objetivoSmart: "Actualizar y presentar el dashboard de ventas con 100% de datos correctos en reuniones semanales durante 2025",
            indicadorKpi: "% reuniones con dashboard actualizado",
            formulaMedicion: "(# reuniones con dashboard actualizado / # total reuniones) × 100",
            peso: 25,
            estado: "en_progreso",
            evidencias: [],
          },
        ],
        calificacionesCompetencias: [],
        puntajeObjetivos: 3.8,
        porcentajeObjetivos: 76,
        firmadoLider: false,
        firmadoColaborador: false,
      },

      // ── Miguel Pereira (Técnico de Soporte, Operativo) ──────────────────
      {
        usuarioId: "u6",
        objetivos: [
          {
            id: "e1-u6-o1",
            kpiCargoId: "kpi-ts-1",
            funcion: "Resolución de incidencias técnicas nivel 1",
            como: "Sistema de tickets interno",
            cuando: "Diario",
            paraQue: "Garantizar continuidad operativa del área",
            objetivoSmart: "Resolver el 95% de los tickets nivel 1 en menos de 4 horas durante 2025",
            indicadorKpi: "% tickets resueltos en ≤4h",
            formulaMedicion: "(# tickets cerrados en ≤4h / # total tickets N1) × 100",
            peso: 50,
            estado: "en_progreso",
            evidencias: [],
            autocalificacion: 3,
            observacionEvaluado: "He mejorado los tiempos pero aún no alcanzo el 95% consistentemente.",
          },
          {
            id: "e1-u6-o2",
            kpiCargoId: "kpi-ts-2",
            funcion: "Documentación de soluciones técnicas",
            como: "Confluence y base de conocimiento interna",
            cuando: "Semanal",
            paraQue: "Reducir tiempos de resolución futura mediante reutilización de soluciones",
            objetivoSmart: "Documentar el 100% de las soluciones a incidencias recurrentes en la base de conocimiento durante 2025",
            indicadorKpi: "% incidencias recurrentes documentadas",
            formulaMedicion: "(# soluciones documentadas / # incidencias recurrentes identificadas) × 100",
            peso: 50,
            estado: "pendiente",
            evidencias: [],
          },
        ],
        calificacionesCompetencias: [],
        puntajeObjetivos: 3.5,
        porcentajeObjetivos: 70,
        firmadoLider: false,
        firmadoColaborador: false,
      },

      // ── Laura Jiménez (Coordinadora de Tecnología, Táctico) ─────────────
      {
        usuarioId: "u7",
        objetivos: [
          {
            id: "e1-u7-o1",
            kpiCargoId: "kpi-ct-1",
            funcion: "Gestión de proyectos tecnológicos del área",
            como: "Metodología ágil con Jira",
            cuando: "Seguimiento semanal, entrega por sprint",
            paraQue: "Garantizar la entrega oportuna de iniciativas tecnológicas estratégicas",
            objetivoSmart: "Entregar el 90% de los proyectos del área a tiempo y dentro del presupuesto en 2025",
            indicadorKpi: "% proyectos entregados a tiempo y en presupuesto",
            formulaMedicion: "(# proyectos en plazo y presupuesto / # total proyectos) × 100",
            peso: 40,
            estado: "completado",
            evidencias: ["reporte_proyectos_2025.pdf"],
            autocalificacion: 5,
            observacionEvaluado: "Entregamos el 95% de los proyectos a tiempo. Implementamos Jira y mejoró notablemente el seguimiento.",
            calificacionLider: 5,
            observacionLider: "Laura superó las expectativas. El área de tecnología mejoró sustancialmente su cumplimiento.",
          },
          {
            id: "e1-u7-o2",
            kpiCargoId: "kpi-ct-2",
            funcion: "Desarrollo y gestión del equipo técnico",
            como: "Reuniones 1:1 y evaluaciones de desempeño",
            cuando: "Quincenal",
            paraQue: "Desarrollar el talento técnico del área y reducir la rotación",
            objetivoSmart: "Lograr que el 100% del equipo técnico tenga un PDI activo y NPS del equipo ≥ 8 al cierre de 2025",
            indicadorKpi: "% equipo con PDI activo y NPS del equipo",
            formulaMedicion: "NPS: escala 0–10 por encuesta trimestral al equipo",
            peso: 35,
            estado: "completado",
            evidencias: [],
            autocalificacion: 4,
            observacionEvaluado: "Todos tienen PDI. El NPS del equipo fue 8.5 en la última medición.",
          },
          {
            id: "e1-u7-o3",
            kpiCargoId: "kpi-ct-3",
            funcion: "Control de disponibilidad de sistemas críticos",
            como: "Monitoreo con Datadog y alertas automáticas",
            cuando: "Continuo (alertas) + reporte mensual",
            paraQue: "Garantizar continuidad del negocio y cumplimiento del SLA de disponibilidad",
            objetivoSmart: "Mantener disponibilidad de sistemas críticos ≥ 99.5% mensual durante 2025",
            indicadorKpi: "Uptime de sistemas críticos (%)",
            formulaMedicion: "(Tiempo disponible / Tiempo total) × 100",
            peso: 25,
            estado: "completado",
            evidencias: ["reporte_uptime_2025.pdf"],
            autocalificacion: 5,
            observacionEvaluado: "Promedio anual de 99.7%. Solo tuvimos 1 incidente mayor que se resolvió en 2h.",
          },
        ],
        calificacionesCompetencias: [],
        puntajeObjetivos: 4.5,
        porcentajeObjetivos: 90,
        firmadoLider: false,
        firmadoColaborador: false,
      },

      // ── Felipe Castro (Asesor Comercial, Operativo) ─────────────────────
      {
        usuarioId: "u8",
        objetivos: [
          {
            id: "e1-u8-o1",
            kpiCargoId: "kpi-ac-1",
            funcion: "Cumplimiento de cuota de ventas mensual",
            como: "CRM y reportes semanales al jefe comercial",
            cuando: "Mensual",
            paraQue: "Contribuir al cumplimiento de la meta comercial del área",
            objetivoSmart: "Cumplir el 100% de la cuota de ventas mensual asignada durante 2025",
            indicadorKpi: "% cumplimiento de cuota mensual",
            formulaMedicion: "(Ventas reales / Cuota asignada) × 100",
            peso: 60,
            estado: "en_progreso",
            evidencias: [],
            autocalificacion: 2,
            observacionEvaluado: "Promedié 72% de la cuota en el año. Tuve dificultades con el portafolio de productos nuevos.",
          },
          {
            id: "e1-u8-o2",
            kpiCargoId: "kpi-ac-2",
            funcion: "Actualización del CRM",
            como: "Salesforce",
            cuando: "Diario",
            paraQue: "Garantizar visibilidad del pipeline y trazabilidad de las gestiones comerciales",
            objetivoSmart: "Mantener el 100% de las interacciones con clientes registradas en CRM dentro de las 24h siguientes en 2025",
            indicadorKpi: "% interacciones registradas en CRM en ≤24h",
            formulaMedicion: "(# interacciones registradas en tiempo / # total interacciones) × 100",
            peso: 40,
            estado: "en_progreso",
            evidencias: [],
            autocalificacion: 3,
            observacionEvaluado: "Mejoré en el segundo semestre. El registro está al día en un 85% promedio.",
          },
        ],
        calificacionesCompetencias: [],
        puntajeObjetivos: 2.9,
        porcentajeObjetivos: 58,
        firmadoLider: false,
        firmadoColaborador: false,
      },

      // ── Isabel Vargas (Analista Financiero, Operativo) ──────────────────
      {
        usuarioId: "u9",
        objetivos: [
          {
            id: "e1-u9-o1",
            kpiCargoId: "kpi-af-1",
            funcion: "Elaboración de informes financieros periódicos",
            como: "SAP + Excel + Power BI",
            cuando: "Mensual (cierres) y trimestral (consolidados)",
            paraQue: "Proveer información financiera confiable para la toma de decisiones directivas",
            objetivoSmart: "Entregar el 100% de los informes financieros sin errores y en la fecha acordada durante 2025",
            indicadorKpi: "% informes entregados a tiempo y sin errores",
            formulaMedicion: "(# informes correctos y en fecha / # informes solicitados) × 100",
            peso: 45,
            estado: "completado",
            evidencias: ["informe_financiero_dic2025.pdf"],
            autocalificacion: 4,
            observacionEvaluado: "Entregué todos los informes a tiempo. Solo hubo una corrección menor en marzo.",
            calificacionLider: 4,
            observacionLider: "Isabel es muy rigurosa con los cierres. Excelente trabajo.",
          },
          {
            id: "e1-u9-o2",
            kpiCargoId: "kpi-af-2",
            funcion: "Conciliaciones bancarias y de cuentas",
            como: "SAP y World Office",
            cuando: "Mensual",
            paraQue: "Garantizar la exactitud de los registros contables y prevenir inconsistencias",
            objetivoSmart: "Completar el 100% de las conciliaciones bancarias en los primeros 5 días hábiles del mes siguiente durante 2025",
            indicadorKpi: "% conciliaciones completadas en ≤5 días hábiles",
            formulaMedicion: "(# conciliaciones en plazo / # total conciliaciones mensuales) × 100",
            peso: 30,
            estado: "completado",
            evidencias: [],
            autocalificacion: 4,
            observacionEvaluado: "Cumplí el 100% en los 12 meses.",
            calificacionLider: 4,
          },
          {
            id: "e1-u9-o3",
            kpiCargoId: "kpi-af-3",
            funcion: "Apoyo al proceso de presupuestación anual",
            como: "Excel y reuniones con cada área",
            cuando: "Trimestral (seguimiento) + anual (consolidación)",
            paraQue: "Asegurar que el presupuesto refleje las necesidades reales de cada área",
            objetivoSmart: "Consolidar y presentar el presupuesto 2026 de todas las áreas antes del 30 de noviembre 2025",
            indicadorKpi: "Fecha de entrega del presupuesto consolidado",
            formulaMedicion: "Entrega antes del 30 de noviembre = 5, por cada día de retraso -0.5",
            peso: 25,
            estado: "completado",
            evidencias: ["presupuesto_2026_consolidado.xlsx"],
            autocalificacion: 5,
            observacionEvaluado: "Presentamos el presupuesto el 25 de noviembre, 5 días antes del plazo.",
            calificacionLider: 5,
          },
        ],
        calificacionesCompetencias: [],
        puntajeObjetivos: 4.1,
        porcentajeObjetivos: 82,
        firmadoLider: false,
        firmadoColaborador: false,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CICLO CERRADO: Evaluación Semestral I-2025
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "e2",
    nombre: "Evaluación Semestral I-2025",
    tipo: "180",
    periodo: "semestral",
    anio: 2025,
    fechaInicio: "2025-07-01",
    fechaFin: "2025-08-15",
    estado: "cerrada",
    companyId: "emp-1",
    creadoPor: "u1",
    pesoObjetivos: 50,
    pesoCompetencias: 50,
    participantes: [
      {
        usuarioId: "u4",
        objetivos: [],
        calificacionesCompetencias: [],
        puntajeObjetivos: 3.9,
        porcentajeObjetivos: 78,
        puntajeCompetencias: 4.1,
        porcentajeCompetencias: 82,
        puntajeFinal: 4.0,
        porcentajeFinal: 80,
        comentarioJefe: "Andrés ha mostrado un desempeño consistente. Debe fortalecer la documentación de procesos.",
        comentarioColaborador: "Estoy satisfecho con los resultados logrados. Quiero mejorar en organización del tiempo.",
        planesAccionCompromisos: "Completar curso de gestión del tiempo antes del 30 de septiembre.",
        firmadoLider: true,
        firmadoColaborador: true,
      },
      {
        usuarioId: "u5",
        objetivos: [],
        calificacionesCompetencias: [],
        puntajeObjetivos: 4.2,
        porcentajeObjetivos: 84,
        puntajeCompetencias: 3.8,
        porcentajeCompetencias: 76,
        puntajeFinal: 4.0,
        porcentajeFinal: 80,
        comentarioJefe: "Daniela supera las metas de ventas. Debe trabajar en comunicación con el equipo.",
        comentarioColaborador: "Estoy comprometida con mejorar mi trabajo en equipo.",
        firmadoLider: true,
        firmadoColaborador: true,
      },
      {
        usuarioId: "u6",
        objetivos: [],
        calificacionesCompetencias: [],
        puntajeObjetivos: 3.2,
        porcentajeObjetivos: 64,
        puntajeCompetencias: 3.5,
        porcentajeCompetencias: 70,
        puntajeFinal: 3.3,
        porcentajeFinal: 66,
        firmadoLider: true,
        firmadoColaborador: true,
      },
      {
        usuarioId: "u8",
        objetivos: [],
        calificacionesCompetencias: [],
        puntajeObjetivos: 2.8,
        porcentajeObjetivos: 56,
        puntajeCompetencias: 3.1,
        porcentajeCompetencias: 62,
        puntajeFinal: 2.9,
        porcentajeFinal: 58,
        comentarioJefe: "Felipe necesita mejorar significativamente en prospección de clientes.",
        firmadoLider: true,
        firmadoColaborador: true,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CICLO CERRADO: Evaluación Anual 2024
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "e3",
    nombre: "Evaluación Anual 2024",
    tipo: "360",
    periodo: "anual",
    anio: 2024,
    fechaInicio: "2025-01-15",
    fechaFin: "2025-03-31",
    estado: "cerrada",
    companyId: "emp-1",
    creadoPor: "u1",
    pesoObjetivos: 50,
    pesoCompetencias: 50,
    participantes: [
      { usuarioId: "u4", objetivos: [], calificacionesCompetencias: [], puntajeObjetivos: 4.0, porcentajeObjetivos: 80, puntajeCompetencias: 3.8, porcentajeCompetencias: 76, puntajePares: 4.2, porcentajePares: 84, puntajeFinal: 4.0, porcentajeFinal: 80, firmadoLider: true, firmadoColaborador: true },
      { usuarioId: "u5", objetivos: [], calificacionesCompetencias: [], puntajeObjetivos: 3.5, porcentajeObjetivos: 70, puntajeCompetencias: 4.0, porcentajeCompetencias: 80, puntajePares: 3.8, porcentajePares: 76, puntajeFinal: 3.8, porcentajeFinal: 76, firmadoLider: true, firmadoColaborador: true },
      { usuarioId: "u6", objetivos: [], calificacionesCompetencias: [], puntajeObjetivos: 3.0, porcentajeObjetivos: 60, puntajeCompetencias: 3.2, porcentajeCompetencias: 64, puntajePares: 3.5, porcentajePares: 70, puntajeFinal: 3.2, porcentajeFinal: 64, firmadoLider: true, firmadoColaborador: true },
      { usuarioId: "u7", objetivos: [], calificacionesCompetencias: [], puntajeObjetivos: 4.8, porcentajeObjetivos: 96, puntajeCompetencias: 4.5, porcentajeCompetencias: 90, puntajePares: 4.7, porcentajePares: 94, puntajeFinal: 4.7, porcentajeFinal: 94, firmadoLider: true, firmadoColaborador: true },
      { usuarioId: "u8", objetivos: [], calificacionesCompetencias: [], puntajeObjetivos: 2.5, porcentajeObjetivos: 50, puntajeCompetencias: 2.8, porcentajeCompetencias: 56, puntajePares: 3.0, porcentajePares: 60, puntajeFinal: 2.8, porcentajeFinal: 56, firmadoLider: true, firmadoColaborador: true },
      { usuarioId: "u9", objetivos: [], calificacionesCompetencias: [], puntajeObjetivos: 4.2, porcentajeObjetivos: 84, puntajeCompetencias: 4.0, porcentajeCompetencias: 80, puntajePares: 4.1, porcentajePares: 82, puntajeFinal: 4.1, porcentajeFinal: 82, firmadoLider: true, firmadoColaborador: true },
    ],
  },
];

export const WORKFLOW_STATES = [
  { key: "configuracion",     label: "Configuración" },
  { key: "autocalificacion",  label: "Autocalificación" },
  { key: "calificacion_lider",label: "Calificación Líder" },
  { key: "pares",             label: "Evaluación 360°" },
  { key: "revision_th",       label: "Revisión TH" },
  { key: "cerrada",           label: "Cierre y Firma" },
] as const;

// Helper: obtener la evaluación de un participante específico dentro de un ciclo
export function getEvaluacionParticipante(cicloId: string, usuarioId: string) {
  const ciclo = MOCK_EVALUACIONES.find((e) => e.id === cicloId);
  return ciclo?.participantes.find((p) => p.usuarioId === usuarioId) ?? null;
}

export interface EvaluacionIndividual {
  cicloId: string;
  cicloNombre: string;
  cicloPeriodo: PeriodoEvaluacion;
  cicloTipo: CicloEvaluacion["tipo"];
  cicloAnio: number;
  cicloEstado: EstadoEvaluacion;
  fechaInicio: string;
  fechaFin: string;
  usuarioId: string;
  participante: EvaluacionParticipante;
}

export function getEvaluacionesIndividuales(): EvaluacionIndividual[] {
  return MOCK_EVALUACIONES.flatMap((ciclo) =>
    ciclo.participantes.map((participante) => ({
      cicloId: ciclo.id,
      cicloNombre: ciclo.nombre,
      cicloPeriodo: ciclo.periodo,
      cicloTipo: ciclo.tipo,
      cicloAnio: ciclo.anio,
      cicloEstado: ciclo.estado,
      fechaInicio: ciclo.fechaInicio,
      fechaFin: ciclo.fechaFin,
      usuarioId: participante.usuarioId,
      participante,
    }))
  );
}

export function getEvaluacionesIndividualesPorRol(userId?: string, role?: string | null): EvaluacionIndividual[] {
  const evaluaciones = getEvaluacionesIndividuales();

  if (!userId || !role) return evaluaciones;
  if (role === "evaluado") return evaluaciones.filter((item) => item.usuarioId === userId);
  if (role === "lider") {
    return evaluaciones.filter((item) => getUserById(item.usuarioId)?.liderId === userId);
  }
  return evaluaciones;
}
