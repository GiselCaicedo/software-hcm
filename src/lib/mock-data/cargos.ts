import type { PerfilCargo } from "@/types/cargos";

export const CARGOS: PerfilCargo[] = [
  // ── 1. AUXILIAR ADMINISTRATIVO ───────────────────────────────────────────
  {
    id: "cargo-aux-admin",
    codigo: "F12P12",
    revision: 2,
    denominacion: "Auxiliar Administrativo",
    nivel: "operativo",
    reportaA: "cargo-lider-contabilidad",
    area: "Contabilidad",
    nivelAcademico: "Bachiller, técnico o tecnólogo en áreas administrativas, contables o afines",
    carrerasAfines: "Administración de empresas, Contabilidad, Tecnología en gestión administrativa",
    tiempoExperiencia: "1 año",
    areasExperiencia: "Áreas administrativas y contables, gestión documental, atención al cliente interno",
    mision:
      "Garantizar la correcta organización, conservación y disponibilidad de la documentación física y digital de la empresa, apoyando los procesos contables y administrativos mediante el mantenimiento de registros precisos y oportunos que faciliten la toma de decisiones y el cumplimiento de los requisitos legales y corporativos.",
    personasACargo: 0,
    personasQueReportanDirectamente: 0,
    responsabilidades: [
      {
        que: "Registro y actualización de proveedores",
        como: "Mediante el sistema de información contable y formatos establecidos por la empresa",
        cuando: "De manera continua, con actualizaciones mensuales o cuando se incorpore un nuevo proveedor",
        paraQue: "Para garantizar la trazabilidad de las transacciones y el cumplimiento de los requisitos fiscales",
        tipoFuncion: "Ejecución",
        objetivoSMART:
          "Registrar y actualizar el 100% de los proveedores activos en el sistema de información contable dentro de los primeros 5 días hábiles de cada mes, garantizando que los datos estén completos y correctos.",
        indicador: "% de proveedores registrados y actualizados en el sistema",
        formulaMedicion: "(Proveedores actualizados / Total proveedores activos) × 100",
        ponderacion: 0.25,
      },
      {
        que: "Gestión y archivo de documentación contable",
        como: "A través del sistema de gestión documental y carpetas físicas organizadas por criterios contables",
        cuando: "Diariamente y con revisión semanal del estado del archivo",
        paraQue:
          "Para asegurar la disponibilidad inmediata de documentos en auditorías, revisiones internas y requerimientos legales",
        tipoFuncion: "Ejecución",
        objetivoSMART:
          "Mantener el 100% de la documentación contable archivada correctamente en el sistema digital y físico, con un tiempo de respuesta máximo de 2 horas ante cualquier solicitud de documento.",
        indicador: "Tiempo de respuesta ante solicitud de documentos / % documentos correctamente archivados",
        formulaMedicion:
          "Tiempo promedio de entrega de documentos solicitados + (Documentos correctamente archivados / Total documentos) × 100",
        ponderacion: 0.5,
      },
      {
        que: "Apoyo operativo a procesos contables y administrativos",
        como:
          "Mediante la ejecución de tareas asignadas por el líder de contabilidad usando herramientas ofimáticas y el ERP de la empresa",
        cuando: "Según requerimientos del área, con seguimiento semanal de avance",
        paraQue:
          "Para contribuir al correcto funcionamiento del área contable y administrativa, garantizando el cumplimiento de los procesos internos",
        tipoFuncion: "Ejecución",
        objetivoSMART:
          "Completar el 95% de las tareas de apoyo operativo asignadas dentro de los plazos establecidos, con cero reprocesos por errores de ejecución durante el trimestre.",
        indicador: "% tareas completadas a tiempo / Tasa de reprocesos",
        formulaMedicion: "(Tareas completadas en plazo / Total tareas asignadas) × 100",
        ponderacion: 0.25,
      },
    ],
    autonomia: {
      autonoma: [
        "Organización y archivo de documentos contables en el sistema",
        "Registro de proveedores con información previamente validada",
        "Priorización de tareas operativas diarias",
      ],
      consultada: [
        "Modificaciones en datos de proveedores existentes",
        "Manejo de documentos con observaciones o inconsistencias",
        "Respuesta ante requerimientos externos (auditorías, entes de control)",
      ],
    },
    relaciones: {
      internas: [
        { con: "Contabilidad", proposito: "Coordinación de procesos contables y archivo documental" },
        { con: "Compras", proposito: "Validación y actualización de datos de proveedores" },
      ],
      externas: [
        { con: "Proveedores", proposito: "Recolección y verificación de documentación" },
      ],
    },
    competenciasAdicionales: [],
    bandaSalarial: "B1",
  },

  // ── 2. AGENTE CALL CENTER Y DIGITADOR ────────────────────────────────────
  {
    id: "cargo-call-center",
    codigo: "F12P15",
    revision: 1,
    denominacion: "Agente Call Center y Digitador",
    nivel: "operativo",
    reportaA: "cargo-coord-ops",
    area: "Operaciones",
    nivelAcademico: "Bachiller o técnico en áreas administrativas o afines",
    carrerasAfines: "Administración, Servicio al Cliente, Comunicaciones",
    tiempoExperiencia: "6 meses",
    areasExperiencia: "Servicio al cliente, digitación, gestión de llamadas",
    mision:
      "Gestionar las comunicaciones entrantes y salientes de la empresa, digitando y registrando información de manera precisa en los sistemas, garantizando una atención oportuna y de calidad a clientes internos y externos.",
    personasACargo: 0,
    personasQueReportanDirectamente: 0,
    responsabilidades: [
      {
        que: "Atención de llamadas y gestión de solicitudes",
        como: "A través de la plataforma de call center y CRM de la empresa",
        cuando: "Durante el horario laboral definido, con registro inmediato",
        paraQue: "Para garantizar una atención oportuna y satisfacción del cliente",
        tipoFuncion: "Ejecución",
        objetivoSMART:
          "Atender el 95% de las llamadas entrantes dentro de los primeros 30 segundos, con un NPS de satisfacción de clientes ≥ 8.0 durante el trimestre.",
        indicador: "% llamadas atendidas en tiempo / NPS clientes",
        formulaMedicion: "(Llamadas atendidas ≤30s / Total llamadas) × 100",
        ponderacion: 0.5,
      },
      {
        que: "Digitación y registro de información",
        como: "Usando los sistemas de información definidos por la empresa",
        cuando: "De forma continua durante la jornada laboral",
        paraQue: "Para mantener bases de datos actualizadas y confiables",
        tipoFuncion: "Ejecución",
        objetivoSMART:
          "Digitalizar y registrar el 100% de la información asignada con un margen de error menor al 0.5% durante el trimestre.",
        indicador: "% registros correctos / Tasa de errores de digitación",
        formulaMedicion: "(Registros correctos / Total registros) × 100",
        ponderacion: 0.5,
      },
    ],
    autonomia: {
      autonoma: ["Atención de consultas de primer nivel", "Registro de información estándar en sistemas"],
      consultada: ["Escalamiento de quejas o reclamos complejos", "Modificación de registros existentes"],
    },
    relaciones: {
      internas: [
        { con: "Operaciones", proposito: "Reporte de novedades y coordinación de procesos" },
        { con: "Servicio al Cliente", proposito: "Escalamiento de casos complejos" },
      ],
      externas: [
        { con: "Clientes", proposito: "Atención de solicitudes y resolución de consultas" },
      ],
    },
    competenciasAdicionales: [],
    bandaSalarial: "B1",
  },

  // ── 3. COORDINADOR DE OPERACIONES ────────────────────────────────────────
  {
    id: "cargo-coord-ops",
    codigo: "F12P08",
    revision: 3,
    denominacion: "Coordinador de Operaciones",
    nivel: "tactico",
    reportaA: "cargo-hr-manager",
    area: "Operaciones",
    nivelAcademico: "Tecnólogo o profesional en Administración, Ingeniería Industrial o afines",
    carrerasAfines: "Ingeniería Industrial, Administración de empresas, Gestión de operaciones",
    tiempoExperiencia: "3 años",
    areasExperiencia: "Coordinación de equipos operativos, gestión de procesos, indicadores de servicio",
    mision:
      "Coordinar y supervisar las operaciones del área garantizando el cumplimiento de los niveles de servicio, la eficiencia de los procesos y el desarrollo del equipo a cargo, alineando la operación con los objetivos estratégicos de la organización.",
    personasACargo: 2,
    personasQueReportanDirectamente: 2,
    responsabilidades: [
      {
        que: "Supervisión de campo y cumplimiento de SLA",
        como: "A través de monitoreo de indicadores en tiempo real y visitas de supervisión",
        cuando: "Diariamente con reporte semanal al director",
        paraQue: "Para garantizar que los niveles de servicio acordados se cumplan consistentemente",
        tipoFuncion: "Gestión",
        objetivoSMART:
          "Mantener el cumplimiento de SLA por encima del 95% en todos los procesos bajo su responsabilidad durante el trimestre.",
        indicador: "% cumplimiento de SLA",
        formulaMedicion: "(Servicios entregados en tiempo / Total servicios comprometidos) × 100",
        ponderacion: 0.35,
      },
      {
        que: "Gestión y desarrollo del equipo operativo",
        como: "Mediante reuniones de seguimiento, retroalimentación individual y planes de mejora",
        cuando: "Reuniones semanales y revisión mensual de desempeño",
        paraQue: "Para garantizar que el equipo tenga las competencias y motivación necesarias",
        tipoFuncion: "Gestión",
        objetivoSMART:
          "Realizar el 100% de las reuniones de seguimiento programadas y mantener la satisfacción del equipo por encima de 4.0/5.0 en encuesta trimestral.",
        indicador: "% reuniones realizadas / Satisfacción del equipo",
        formulaMedicion: "(Reuniones realizadas / Reuniones programadas) × 100",
        ponderacion: 0.3,
      },
      {
        que: "Elaboración de reportes operativos",
        como: "Usando las herramientas de BI y reportes del ERP",
        cuando: "Reporte semanal y consolidado mensual",
        paraQue: "Para proveer información oportuna que soporte la toma de decisiones gerenciales",
        tipoFuncion: "Gestión",
        objetivoSMART:
          "Entregar el 100% de los reportes operativos en las fechas establecidas con información completa y sin errores durante el trimestre.",
        indicador: "% reportes entregados a tiempo",
        formulaMedicion: "(Reportes entregados en fecha / Total reportes comprometidos) × 100",
        ponderacion: 0.2,
      },
      {
        que: "Mejora continua de procesos operativos",
        como: "A través de análisis de datos, revisión de procesos y propuesta de mejoras",
        cuando: "Con revisión mensual y proyectos trimestrales",
        paraQue: "Para incrementar la eficiencia operacional y reducir costos",
        tipoFuncion: "Gestión",
        objetivoSMART:
          "Identificar e implementar al menos 2 mejoras de proceso por trimestre con impacto medible en eficiencia o reducción de costos.",
        indicador: "Número de mejoras implementadas con impacto medible",
        formulaMedicion: "Conteo de iniciativas de mejora implementadas con indicador de impacto documentado",
        ponderacion: 0.15,
      },
    ],
    autonomia: {
      autonoma: [
        "Asignación de tareas y prioridades del equipo operativo",
        "Aprobación de procedimientos operativos estándar",
        "Respuesta inmediata ante incidentes operativos de nivel bajo y medio",
      ],
      consultada: [
        "Cambios en los niveles de servicio acordados con clientes",
        "Contratación o desvinculación de personal",
        "Inversiones en herramientas o tecnología para el área",
      ],
    },
    relaciones: {
      internas: [
        { con: "Talento Humano", proposito: "Gestión de nómina, permisos y desarrollo del equipo" },
        { con: "Tecnología", proposito: "Soporte técnico y mejoras en sistemas operativos" },
        { con: "Comercial", proposito: "Coordinación de entrega de servicios a clientes" },
      ],
      externas: [
        { con: "Clientes corporativos", proposito: "Reporte de cumplimiento de SLA y gestión de escalamientos" },
      ],
    },
    competenciasAdicionales: [],
    bandaSalarial: "B2",
  },

  // ── 4. HR MANAGER ────────────────────────────────────────────────────────
  {
    id: "cargo-hr-manager",
    codigo: "F12P01",
    revision: 4,
    denominacion: "HR Manager",
    nivel: "estrategico",
    reportaA: "",
    area: "Talento Humano",
    nivelAcademico: "Profesional en Psicología, Administración, Ingeniería Industrial o afines. Especialización deseable.",
    carrerasAfines: "Psicología organizacional, Gestión del talento, Administración de empresas",
    tiempoExperiencia: "5 años",
    areasExperiencia: "Gestión del talento humano, desarrollo organizacional, relaciones laborales",
    mision:
      "Diseñar, implementar y liderar las estrategias de gestión del talento humano que permitan atraer, desarrollar y retener el capital humano necesario para el cumplimiento de los objetivos organizacionales, garantizando un ambiente de trabajo positivo, el desarrollo de competencias y el cumplimiento de la normativa laboral vigente.",
    personasACargo: 3,
    personasQueReportanDirectamente: 3,
    responsabilidades: [
      {
        que: "Implementación del sistema de evaluación de desempeño",
        como: "A través de la plataforma HCM y los ciclos de evaluación trimestrales",
        cuando: "Con ciclos trimestrales y revisión continua del proceso",
        paraQue: "Para garantizar una evaluación objetiva, sistemática y que genere valor para el desarrollo del talento",
        tipoFuncion: "Estratégica",
        objetivoSMART:
          "Implementar el ciclo de evaluación Q1 2026 logrando un 90% de participación y un NPS del proceso ≥ 8.0 al cierre del trimestre.",
        indicador: "% participación en evaluaciones / NPS del proceso",
        formulaMedicion: "(Evaluaciones completadas / Total evaluaciones) × 100",
        ponderacion: 0.35,
      },
      {
        que: "Estrategia de retención de talento",
        como: "Mediante análisis de rotación, encuestas de clima y planes de carrera",
        cuando: "Con seguimiento mensual y estrategias trimestrales",
        paraQue: "Para reducir la rotación no deseada y retener el talento crítico",
        tipoFuncion: "Estratégica",
        objetivoSMART:
          "Mantener la rotación voluntaria por debajo del 8% anual e implementar planes de carrera para el 100% del talento crítico identificado.",
        indicador: "Tasa de rotación voluntaria / % talento crítico con plan de carrera",
        formulaMedicion: "(Renuncias voluntarias / Promedio de empleados) × 100",
        ponderacion: 0.25,
      },
      {
        que: "Medición y mejora del clima organizacional",
        como: "A través de encuestas semestrales de clima y planes de acción por área",
        cuando: "Dos mediciones al año con seguimiento trimestral de planes de acción",
        paraQue: "Para garantizar un ambiente de trabajo positivo que impulse el desempeño",
        tipoFuncion: "Estratégica",
        objetivoSMART:
          "Alcanzar un índice de clima organizacional ≥ 75% en la medición semestral e implementar el 80% de las acciones de mejora identificadas.",
        indicador: "Índice de clima organizacional / % acciones de mejora implementadas",
        formulaMedicion: "Score encuesta de clima / (Acciones implementadas / Acciones planificadas) × 100",
        ponderacion: 0.25,
      },
      {
        que: "Cumplimiento de procesos y normativa de Talento Humano",
        como: "Mediante auditorías internas, revisión de procesos y actualización normativa",
        cuando: "Con revisión mensual de cumplimiento y auditoría trimestral",
        paraQue: "Para garantizar el cumplimiento de la normativa laboral y los procesos corporativos",
        tipoFuncion: "Gestión",
        objetivoSMART:
          "Mantener el 100% de cumplimiento en procesos de nómina, contratos y SGSST sin hallazgos críticos en auditorías durante el trimestre.",
        indicador: "% cumplimiento normativo / Hallazgos críticos en auditoría",
        formulaMedicion: "(Procesos en cumplimiento / Total procesos auditados) × 100",
        ponderacion: 0.15,
      },
    ],
    autonomia: {
      autonoma: [
        "Diseño e implementación de políticas de talento humano",
        "Decisiones sobre procesos de selección y desvinculación",
        "Aprobación de planes de desarrollo individual",
      ],
      consultada: [
        "Cambios estructurales en la organización",
        "Ajustes salariales significativos",
        "Política de beneficios y compensación variable",
      ],
    },
    relaciones: {
      internas: [
        { con: "Todas las áreas", proposito: "Gestión del talento, clima y desarrollo organizacional" },
        { con: "Dirección General", proposito: "Reporte estratégico de indicadores de talento" },
        { con: "Contabilidad", proposito: "Coordinación de nómina y beneficios" },
      ],
      externas: [
        { con: "Entidades regulatorias (SENA, Min. Trabajo)", proposito: "Cumplimiento normativo laboral" },
        { con: "Proveedores de formación", proposito: "Gestión de programas de capacitación" },
      ],
    },
    competenciasAdicionales: [],
    bandaSalarial: "B3",
  },
];

export function getCargoById(id: string): PerfilCargo | undefined {
  return CARGOS.find((c) => c.id === id);
}
