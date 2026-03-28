import { PerfilCargo } from "@/types";

// Corrección 5: entidad JobProfile — fuente de verdad del sistema
// Basado en el perfil real de Auxiliar Administrativo (Sara Jennifer Olarte Peña)
// y perfiles inferidos para los demás cargos del sistema

export const MOCK_PERFILES_CARGO: PerfilCargo[] = [
  // ─── AUXILIAR ADMINISTRATIVO (INMOV) ───
  // Fuente directa: Perfil de Cargo Sara Jennifer Olarte Peña
  {
    id: "pc-auxiliar-admin",
    companyId: "emp-2",
    nombreCargo: "Auxiliar Administrativo",
    nivelJerarquico: "operativo",
    nivelAcademico: "Tecnólogo o Profesional en áreas administrativas o afines",
    aniosExperiencia: 1,
    mision: "Brindar soporte administrativo eficiente y preciso en el registro, archivo y gestión de documentos e información, garantizando el cumplimiento de los procedimientos internos y contribuyendo al buen funcionamiento del área.",
    kpis: [
      {
        id: "kpi-aa-1",
        funcion: "Ingresar datos de proveedores en sistema contable",
        como: "SAP y World Office",
        cuando: "Según necesidad",
        paraQue: "Garantizar el registro oportuno y exacto de información de proveedores",
        objetivoSmart: "100% de registros ingresados en ≤2 horas desde la recepción del documento durante 2025",
        indicadorKpi: "Tiempo de registro de proveedores",
        formulaMedicion: "(# solicitudes ingresadas en ≤2h / # total solicitudes) × 100",
        pesoPct: 25,
      },
      {
        id: "kpi-aa-2",
        funcion: "Gestión y archivo de documentos físicos y digitales",
        como: "Google Drive y sistema de archivo físico codificado",
        cuando: "Diario",
        paraQue: "Asegurar la trazabilidad y disponibilidad inmediata de documentos para auditorías y consultas",
        objetivoSmart: "Mantener 100% de documentos archivados y localizables en ≤5 minutos durante 2025",
        indicadorKpi: "% documentos archivados correctamente",
        formulaMedicion: "(# documentos localizados en ≤5min en auditorías / # documentos solicitados) × 100",
        pesoPct: 25,
      },
      {
        id: "kpi-aa-3",
        funcion: "Elaboración de informes y reportes administrativos",
        como: "Excel y Google Sheets",
        cuando: "Semanal y mensual",
        paraQue: "Proveer información confiable y oportuna para la toma de decisiones del área",
        objetivoSmart: "Entregar el 100% de los informes solicitados sin errores y en la fecha acordada durante 2025",
        indicadorKpi: "% informes entregados a tiempo y sin errores",
        formulaMedicion: "(# informes entregados en fecha sin correcciones / # informes solicitados) × 100",
        pesoPct: 25,
      },
      {
        id: "kpi-aa-4",
        funcion: "Atención y gestión de solicitudes internas",
        como: "Correo electrónico y sistema interno de tickets",
        cuando: "Diario",
        paraQue: "Resolver requerimientos de los colaboradores internos con rapidez y precisión",
        objetivoSmart: "Responder el 95% de las solicitudes internas en ≤4 horas durante 2025",
        indicadorKpi: "Tiempo de respuesta a solicitudes internas",
        formulaMedicion: "(# solicitudes respondidas en ≤4h / # total solicitudes) × 100",
        pesoPct: 25,
      },
    ],
    competencias: [
      { competenciaId: "c-compromiso", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-proactividad", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-orientacion-cliente", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-trabajo-equipo", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-organizacion-tiempo", peso: 16, proficienciaEsperada: 4 },
      { competenciaId: "c-liderazgo", peso: 16, proficienciaEsperada: 2 },
    ],
    relacionesInternas: [
      { entidad: "Área Contable", tipoRelacion: "Coordinación diaria para registro de proveedores y conciliaciones" },
      { entidad: "Área de Compras", tipoRelacion: "Recepción y procesamiento de órdenes de compra" },
      { entidad: "Gerencia Administrativa", tipoRelacion: "Reporte directo y atención de requerimientos" },
      { entidad: "Todos los colaboradores de la empresa", tipoRelacion: "Atención de solicitudes administrativas" },
    ],
    relacionesExternas: [
      { entidad: "Proveedores", tipoRelacion: "Gestión de documentación y comunicaciones administrativas" },
      { entidad: "Entidades bancarias", tipoRelacion: "Trámites administrativos y documentación de pagos" },
    ],
    autonomiaDecisiones: [
      "Priorización de tareas administrativas diarias",
      "Clasificación y archivo de documentos",
      "Respuesta a consultas administrativas de rutina",
    ],
    activo: true,
    version: 1,
  },

  // ─── ANALISTA DE OPERACIONES (INMOV) ───
  {
    id: "pc-analista-operaciones",
    companyId: "emp-1",
    nombreCargo: "Analista de Operaciones",
    nivelJerarquico: "operativo",
    nivelAcademico: "Profesional en Ingeniería Industrial, Administración o afines",
    aniosExperiencia: 2,
    mision: "Analizar, diseñar y optimizar procesos operativos para garantizar la eficiencia, calidad y satisfacción del cliente, contribuyendo al logro de los objetivos estratégicos del área.",
    kpis: [
      {
        id: "kpi-ao-1",
        funcion: "Gestión de satisfacción del cliente",
        como: "Encuestas NPS y seguimiento de tickets",
        cuando: "Mensual",
        paraQue: "Garantizar experiencia positiva del cliente en operaciones",
        objetivoSmart: "Aumentar el NPS del área de operaciones de 65 a 80 puntos al cierre del año 2025",
        indicadorKpi: "NPS (Net Promoter Score)",
        formulaMedicion: "(Promotores - Detractores) / Total encuestados × 100",
        pesoPct: 30,
      },
      {
        id: "kpi-ao-2",
        funcion: "Gestión de tiempos de respuesta en soporte",
        como: "Sistema de tickets (Zendesk) y reportes mensuales",
        cuando: "Seguimiento semanal, reporte mensual",
        paraQue: "Mejorar la eficiencia operativa y satisfacción del cliente",
        objetivoSmart: "Reducir el tiempo promedio de resolución de tickets de 48h a 24h al 31 de diciembre 2025",
        indicadorKpi: "Tiempo promedio de resolución (horas)",
        formulaMedicion: "Suma de horas de resolución / Total tickets cerrados en el período",
        pesoPct: 25,
      },
      {
        id: "kpi-ao-3",
        funcion: "Diseño e implementación de proceso de onboarding",
        como: "Documentación en Confluence + capacitación presencial",
        cuando: "Implementación continua durante el año",
        paraQue: "Reducir la curva de aprendizaje de nuevos colaboradores",
        objetivoSmart: "Diseñar e implementar proceso de onboarding documentado aplicado al 100% de ingresos nuevos antes del 30 de junio 2025",
        indicadorKpi: "% de nuevos ingresos con onboarding completado",
        formulaMedicion: "(# colaboradores con onboarding completado / # total nuevos ingresos) × 100",
        pesoPct: 20,
      },
      {
        id: "kpi-ao-4",
        funcion: "Control presupuestal del área",
        como: "SAP y reportes financieros mensuales",
        cuando: "Seguimiento mensual, cierre trimestral",
        paraQue: "Garantizar eficiencia en el uso de recursos asignados al área",
        objetivoSmart: "Ejecutar el presupuesto asignado con desviación máxima del 5% al cierre del año 2025",
        indicadorKpi: "Desviación presupuestal (%)",
        formulaMedicion: "|(Presupuesto ejecutado - Presupuesto asignado)| / Presupuesto asignado × 100",
        pesoPct: 25,
      },
    ],
    competencias: [
      { competenciaId: "c-compromiso", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-proactividad", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-orientacion-cliente", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-trabajo-equipo", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-organizacion-tiempo", peso: 16, proficienciaEsperada: 3 },
      { competenciaId: "c-liderazgo", peso: 16, proficienciaEsperada: 2 },
    ],
    relacionesInternas: [
      { entidad: "Gerente de Operaciones", tipoRelacion: "Reporte directo y alineación de prioridades" },
      { entidad: "Área de Tecnología", tipoRelacion: "Coordinación para automatización de procesos" },
      { entidad: "Área Comercial", tipoRelacion: "Coordinación para atención post-venta" },
    ],
    relacionesExternas: [
      { entidad: "Clientes", tipoRelacion: "Seguimiento de satisfacción y resolución de escalaciones" },
      { entidad: "Proveedores de servicio", tipoRelacion: "Coordinación de niveles de servicio" },
    ],
    autonomiaDecisiones: [
      "Priorización de tickets de soporte",
      "Propuesta de mejoras a procesos operativos",
      "Gestión de incidencias de nivel 1 y 2",
    ],
    activo: true,
    version: 1,
  },

  // ─── EJECUTIVA COMERCIAL (INMOV) ───
  {
    id: "pc-ejecutiva-comercial",
    companyId: "emp-1",
    nombreCargo: "Ejecutiva Comercial",
    nivelJerarquico: "operativo",
    nivelAcademico: "Profesional en Administración, Mercadeo, Comunicación o afines",
    aniosExperiencia: 2,
    mision: "Gestionar y hacer crecer la cartera de clientes asignada, generando relaciones de largo plazo y cumpliendo con las metas de ventas establecidas por la organización.",
    kpis: [
      {
        id: "kpi-ec-1",
        funcion: "Gestión de ventas de cartera activa",
        como: "CRM Salesforce + reuniones semanales con clientes",
        cuando: "Seguimiento semanal, cierre mensual",
        paraQue: "Incrementar los ingresos del área comercial y fidelizar clientes existentes",
        objetivoSmart: "Incrementar las ventas de la cartera activa en un 15% respecto al año anterior al 31 de diciembre 2025",
        indicadorKpi: "Crecimiento en ventas YoY (%)",
        formulaMedicion: "(Ventas período actual - Ventas período anterior) / Ventas período anterior × 100",
        pesoPct: 40,
      },
      {
        id: "kpi-ec-2",
        funcion: "Prospección y adquisición de nuevos clientes",
        como: "Llamadas en frío, LinkedIn y referidos",
        cuando: "Seguimiento quincenal",
        paraQue: "Ampliar la base de clientes activos y diversificar el portafolio",
        objetivoSmart: "Incorporar 10 nuevos clientes activos con al menos 1 compra efectiva antes del 31 de diciembre 2025",
        indicadorKpi: "Número de nuevos clientes activos",
        formulaMedicion: "# clientes nuevos con al menos 1 factura pagada en el período",
        pesoPct: 35,
      },
      {
        id: "kpi-ec-3",
        funcion: "Gestión de indicadores comerciales",
        como: "Dashboard en Power BI y reporte semanal al jefe",
        cuando: "Semanal",
        paraQue: "Mantener visibilidad de la gestión comercial y tomar decisiones oportunas",
        objetivoSmart: "Actualizar y presentar el dashboard de ventas con 100% de datos correctos en reuniones semanales durante 2025",
        indicadorKpi: "% reuniones con dashboard actualizado",
        formulaMedicion: "(# reuniones con dashboard actualizado / # total reuniones) × 100",
        pesoPct: 25,
      },
    ],
    competencias: [
      { competenciaId: "c-compromiso", peso: 17, proficienciaEsperada: 4 },
      { competenciaId: "c-proactividad", peso: 17, proficienciaEsperada: 4 },
      { competenciaId: "c-orientacion-cliente", peso: 17, proficienciaEsperada: 4 },
      { competenciaId: "c-trabajo-equipo", peso: 17, proficienciaEsperada: 3 },
      { competenciaId: "c-organizacion-tiempo", peso: 16, proficienciaEsperada: 3 },
      { competenciaId: "c-liderazgo", peso: 16, proficienciaEsperada: 2 },
    ],
    relacionesInternas: [
      { entidad: "Jefe Comercial", tipoRelacion: "Reporte directo y seguimiento de metas" },
      { entidad: "Área de Marketing", tipoRelacion: "Coordinación de materiales y campañas" },
      { entidad: "Área de Postventa", tipoRelacion: "Gestión de satisfacción post-cierre" },
    ],
    relacionesExternas: [
      { entidad: "Clientes actuales y potenciales", tipoRelacion: "Gestión comercial directa" },
      { entidad: "Aliados estratégicos", tipoRelacion: "Generación de referidos" },
    ],
    autonomiaDecisiones: [
      "Priorización de clientes a visitar",
      "Negociación de condiciones comerciales dentro de la política de precios",
      "Propuesta de descuentos dentro del rango autorizado",
    ],
    activo: true,
    version: 1,
  },

  // ─── GERENTE DE OPERACIONES (Estratégico) ───
  {
    id: "pc-gerente-operaciones",
    companyId: "emp-1",
    nombreCargo: "Gerente de Operaciones",
    nivelJerarquico: "estrategico",
    nivelAcademico: "Profesional con especialización o maestría en Ingeniería, Administración o afines",
    aniosExperiencia: 8,
    mision: "Dirigir y optimizar las operaciones de la empresa, asegurando la eficiencia, calidad y rentabilidad de los procesos bajo su responsabilidad, alineados con la estrategia organizacional.",
    kpis: [
      {
        id: "kpi-go-1",
        funcion: "Gestión estratégica de operaciones",
        como: "Cuadro de mando integral y reuniones de alta gerencia",
        cuando: "Mensual con revisión trimestral",
        paraQue: "Asegurar que las operaciones contribuyan a los objetivos estratégicos de la organización",
        objetivoSmart: "Mantener un índice de eficiencia operativa superior al 85% durante el año 2025",
        indicadorKpi: "Índice de eficiencia operativa (%)",
        formulaMedicion: "(Resultados alcanzados / Recursos utilizados) × factor de calidad × 100",
        pesoPct: 35,
      },
      {
        id: "kpi-go-2",
        funcion: "Gestión y desarrollo del equipo",
        como: "Reuniones 1:1, evaluaciones de desempeño y planes de desarrollo",
        cuando: "Quincenal (1:1) y semestral (evaluaciones)",
        paraQue: "Garantizar el desarrollo del talento y el cumplimiento de resultados del equipo",
        objetivoSmart: "Lograr que el 100% del equipo directo tenga un PDI activo y al menos el 80% cumpla sus metas al 31 de diciembre 2025",
        indicadorKpi: "% equipo con PDI activo y metas cumplidas",
        formulaMedicion: "(# colaboradores con PDI activo y ≥80% meta / # total reportes directos) × 100",
        pesoPct: 35,
      },
      {
        id: "kpi-go-3",
        funcion: "Control presupuestal del área",
        como: "SAP y reportes financieros mensuales",
        cuando: "Mensual",
        paraQue: "Garantizar la ejecución presupuestal eficiente y alineada con los objetivos del negocio",
        objetivoSmart: "Ejecutar el presupuesto del área con desviación máxima del 3% al cierre del año 2025",
        indicadorKpi: "Desviación presupuestal (%)",
        formulaMedicion: "|(Presupuesto ejecutado - Presupuesto aprobado)| / Presupuesto aprobado × 100",
        pesoPct: 30,
      },
    ],
    competencias: [
      { competenciaId: "c-est-solucion-problemas", peso: 8, proficienciaEsperada: 4 },
      { competenciaId: "c-est-aptitud-negocio", peso: 9, proficienciaEsperada: 4 },
      { competenciaId: "c-est-trabajo-equipo", peso: 9, proficienciaEsperada: 4 },
      { competenciaId: "c-est-atencion-cliente", peso: 8, proficienciaEsperada: 4 },
      { competenciaId: "c-est-toma-decisiones", peso: 9, proficienciaEsperada: 5 },
      { competenciaId: "c-est-adaptabilidad", peso: 8, proficienciaEsperada: 4 },
      { competenciaId: "c-est-tolerancia-estres", peso: 8, proficienciaEsperada: 4 },
      { competenciaId: "c-est-innovacion", peso: 8, proficienciaEsperada: 4 },
      { competenciaId: "c-est-analisis-informacion", peso: 9, proficienciaEsperada: 4 },
      { competenciaId: "c-est-planeacion-orden", peso: 9, proficienciaEsperada: 5 },
      { competenciaId: "c-est-comunicacion", peso: 8, proficienciaEsperada: 4 },
      { competenciaId: "c-est-liderazgo", peso: 7, proficienciaEsperada: 5 },
    ],
    relacionesInternas: [
      { entidad: "Gerencia General", tipoRelacion: "Reporte estratégico y alineación de prioridades" },
      { entidad: "Directores y Jefes del área", tipoRelacion: "Dirección y supervisión directa" },
      { entidad: "Gerencias pares", tipoRelacion: "Coordinación interfuncional para proyectos estratégicos" },
    ],
    relacionesExternas: [
      { entidad: "Clientes estratégicos", tipoRelacion: "Gestión de relaciones de alto nivel" },
      { entidad: "Proveedores clave", tipoRelacion: "Negociación y gestión de acuerdos de nivel de servicio" },
      { entidad: "Entes reguladores", tipoRelacion: "Cumplimiento normativo del área" },
    ],
    autonomiaDecisiones: [
      "Aprobación de inversiones del área dentro del presupuesto asignado",
      "Contratación y desvinculación de personal directo",
      "Decisiones de procesos operativos de alto impacto",
      "Representación de la empresa ante clientes estratégicos",
    ],
    activo: true,
    version: 1,
  },
];

export function getPerfilPorCargo(nombreCargo: string, companyId?: string): PerfilCargo | undefined {
  return MOCK_PERFILES_CARGO.find(
    (p) => p.nombreCargo === nombreCargo && (!companyId || p.companyId === companyId)
  );
}

export function getPerfilesPorNivel(
  nivel: "operativo" | "tactico" | "estrategico"
): PerfilCargo[] {
  return MOCK_PERFILES_CARGO.filter((p) => p.nivelJerarquico === nivel);
}
