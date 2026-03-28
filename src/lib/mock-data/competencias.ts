import { Competencia } from "@/types";

// ===== COMPETENCIAS REALES INMOV =====
// Corrección 1: sets exactos por nivel jerárquico según formatos Excel 2025
//
// Niveles Operativo y Táctico: mismas 6 competencias, comportamientos distintos
// Nivel Estratégico: 12 competencias exclusivas (set completamente distinto)

export const MOCK_COMPETENCIAS: Competencia[] = [
  // ─── NIVEL OPERATIVO + TÁCTICO (6 competencias corporativas compartidas) ───

  {
    id: "c-compromiso",
    nombre: "Compromiso",
    descripcion: "Cumplimiento de objetivos, proactividad y orientación al cliente.",
    tipo: "core",
    nivelJerarquico: ["operativo", "tactico"],
    esExclusivaEstrategico: false,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 17,
    comportamientos: [
      // Operativo
      { id: "b-comp-op-1", descripcion: "Cumplimiento de Objetivos y Plazos", nivelJerarquico: "operativo" },
      { id: "b-comp-op-2", descripcion: "Proactividad y Mejora Continua", nivelJerarquico: "operativo" },
      { id: "b-comp-op-3", descripcion: "Compromiso con la Satisfacción del Cliente", nivelJerarquico: "operativo" },
      // Táctico (misma competencia, mayor alcance y responsabilidad)
      { id: "b-comp-tac-1", descripcion: "Cumplimiento de Objetivos Estratégicos del Área", nivelJerarquico: "tactico" },
      { id: "b-comp-tac-2", descripcion: "Impulso de Mejora Continua en el Equipo", nivelJerarquico: "tactico" },
      { id: "b-comp-tac-3", descripcion: "Compromiso con Resultados del Negocio", nivelJerarquico: "tactico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "No cumple con los compromisos adquiridos en tiempo y forma." },
      { nivel: 2, descripcion: "Cumple parcialmente con sus compromisos bajo supervisión." },
      { nivel: 3, descripcion: "Cumple con sus compromisos y propone mejoras incrementales." },
      { nivel: 4, descripcion: "Supera consistentemente sus compromisos e impulsa al equipo." },
      { nivel: 5, descripcion: "Es referente de compromiso organizacional y genera cultura de resultados." },
    ],
  },

  {
    id: "c-proactividad",
    nombre: "Proactividad - Iniciativa",
    descripcion: "Identificación proactiva de problemas, acción inmediata y búsqueda de eficiencia.",
    tipo: "core",
    nivelJerarquico: ["operativo", "tactico"],
    esExclusivaEstrategico: false,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 17,
    comportamientos: [
      // Operativo
      { id: "b-prov-op-1", descripcion: "Identificación Proactiva de Problemas", nivelJerarquico: "operativo" },
      { id: "b-prov-op-2", descripcion: "Acción Inmediata ante Dificultades", nivelJerarquico: "operativo" },
      { id: "b-prov-op-3", descripcion: "Búsqueda de Eficiencia en Tareas", nivelJerarquico: "operativo" },
      // Táctico
      { id: "b-prov-tac-1", descripcion: "Anticipación de Riesgos del Área", nivelJerarquico: "tactico" },
      { id: "b-prov-tac-2", descripcion: "Gestión Proactiva de Recursos", nivelJerarquico: "tactico" },
      { id: "b-prov-tac-3", descripcion: "Optimización de Procesos del Equipo", nivelJerarquico: "tactico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Solo actúa cuando se le solicita; no anticipa problemas." },
      { nivel: 2, descripcion: "Identifica problemas cuando ya están ocurriendo y actúa." },
      { nivel: 3, descripcion: "Anticipa situaciones y toma iniciativa antes de ser solicitado." },
      { nivel: 4, descripcion: "Genera soluciones innovadoras y lidera la eficiencia del área." },
      { nivel: 5, descripcion: "Transforma la cultura hacia la proactividad en toda la organización." },
    ],
  },

  {
    id: "c-orientacion-cliente",
    nombre: "Orientación al Cliente",
    descripcion: "Identificación de necesidades, resolución eficaz y seguimiento al cliente.",
    tipo: "core",
    nivelJerarquico: ["operativo", "tactico"],
    esExclusivaEstrategico: false,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 17,
    comportamientos: [
      // Operativo
      { id: "b-oc-op-1", descripcion: "Identificación y Comprensión de Necesidades del Cliente", nivelJerarquico: "operativo" },
      { id: "b-oc-op-2", descripcion: "Resolución Eficaz de Problemas del Cliente", nivelJerarquico: "operativo" },
      { id: "b-oc-op-3", descripcion: "Seguimiento y Retroalimentación al Cliente", nivelJerarquico: "operativo" },
      // Táctico
      { id: "b-oc-tac-1", descripcion: "Diseño de Estrategias de Servicio al Cliente", nivelJerarquico: "tactico" },
      { id: "b-oc-tac-2", descripcion: "Gestión de Experiencia del Cliente en el Área", nivelJerarquico: "tactico" },
      { id: "b-oc-tac-3", descripcion: "Medición y Mejora de Indicadores de Satisfacción", nivelJerarquico: "tactico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Atiende solicitudes básicas del cliente cuando se le indica." },
      { nivel: 2, descripcion: "Responde proactivamente a las necesidades del cliente." },
      { nivel: 3, descripcion: "Anticipa necesidades y propone mejoras en el servicio." },
      { nivel: 4, descripcion: "Diseña estrategias de servicio orientadas al cliente." },
      { nivel: 5, descripcion: "Transforma la cultura organizacional hacia la orientación al cliente." },
    ],
  },

  {
    id: "c-trabajo-equipo",
    nombre: "Trabajo en Equipo",
    descripcion: "Colaboración efectiva, apoyo mutuo y responsabilidad compartida en el logro de objetivos.",
    tipo: "core",
    nivelJerarquico: ["operativo", "tactico"],
    esExclusivaEstrategico: false,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 17,
    comportamientos: [
      // Operativo
      { id: "b-te-op-1", descripcion: "Colaboración y Comunicación Efectiva", nivelJerarquico: "operativo" },
      { id: "b-te-op-2", descripcion: "Apoyo Mutuo y Resolución de Conflictos", nivelJerarquico: "operativo" },
      { id: "b-te-op-3", descripcion: "Responsabilidad Compartida y Logro de Objetivos Comunes", nivelJerarquico: "operativo" },
      // Táctico
      { id: "b-te-tac-1", descripcion: "Integración y Cohesión del Equipo", nivelJerarquico: "tactico" },
      { id: "b-te-tac-2", descripcion: "Gestión de Conflictos Interfuncionales", nivelJerarquico: "tactico" },
      { id: "b-te-tac-3", descripcion: "Construcción de Sinergias entre Áreas", nivelJerarquico: "tactico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Participa en actividades grupales cuando se le solicita." },
      { nivel: 2, descripcion: "Colabora activamente y comparte información con su equipo." },
      { nivel: 3, descripcion: "Facilita la integración y el logro colectivo." },
      { nivel: 4, descripcion: "Construye equipos de alto rendimiento." },
      { nivel: 5, descripcion: "Lidera iniciativas de colaboración inter-áreas." },
    ],
  },

  {
    id: "c-organizacion-tiempo",
    nombre: "Organización y Manejo del Tiempo",
    descripcion: "Planificación de tareas diarias, gestión del tiempo y cumplimiento de plazos.",
    tipo: "core",
    nivelJerarquico: ["operativo", "tactico"],
    esExclusivaEstrategico: false,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 16,
    comportamientos: [
      // Operativo
      { id: "b-org-op-1", descripcion: "Planificación de Tareas Diarias", nivelJerarquico: "operativo" },
      { id: "b-org-op-2", descripcion: "Gestión del Tiempo", nivelJerarquico: "operativo" },
      { id: "b-org-op-3", descripcion: "Cumplimiento de Plazos", nivelJerarquico: "operativo" },
      // Táctico
      { id: "b-org-tac-1", descripcion: "Planificación de Proyectos y Recursos del Área", nivelJerarquico: "tactico" },
      { id: "b-org-tac-2", descripcion: "Priorización Estratégica de Actividades", nivelJerarquico: "tactico" },
      { id: "b-org-tac-3", descripcion: "Control y Seguimiento de Entregables", nivelJerarquico: "tactico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Frecuentemente incumple plazos y necesita supervisión constante." },
      { nivel: 2, descripcion: "Organiza sus tareas básicas y cumple plazos simples." },
      { nivel: 3, descripcion: "Gestiona eficientemente su tiempo y entrega a tiempo." },
      { nivel: 4, descripcion: "Optimiza la planificación del área y anticipa cuellos de botella." },
      { nivel: 5, descripcion: "Es referente de eficiencia y enseña a otros a gestionar su tiempo." },
    ],
  },

  {
    id: "c-liderazgo",
    nombre: "Liderazgo",
    descripcion: "Influencia positiva, desarrollo de talento, comunicación clara y retroalimentación.",
    tipo: "liderazgo",
    nivelJerarquico: ["operativo", "tactico"],
    esExclusivaEstrategico: false,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 16,
    comportamientos: [
      // Operativo (6 comportamientos — la más extensa del nivel operativo)
      { id: "b-lid-op-1", descripcion: "Promoción de la Participación del Equipo", nivelJerarquico: "operativo" },
      { id: "b-lid-op-2", descripcion: "Eficiencia en Reuniones", nivelJerarquico: "operativo" },
      { id: "b-lid-op-3", descripcion: "Claridad en la Comunicación", nivelJerarquico: "operativo" },
      { id: "b-lid-op-4", descripcion: "Desarrollo de Talentos", nivelJerarquico: "operativo" },
      { id: "b-lid-op-5", descripcion: "Integridad y Coherencia", nivelJerarquico: "operativo" },
      { id: "b-lid-op-6", descripcion: "Retroalimentación Positiva", nivelJerarquico: "operativo" },
      // Táctico (mayor alcance de gestión)
      { id: "b-lid-tac-1", descripcion: "Liderazgo de Equipos Multidisciplinarios", nivelJerarquico: "tactico" },
      { id: "b-lid-tac-2", descripcion: "Gestión del Desempeño del Equipo", nivelJerarquico: "tactico" },
      { id: "b-lid-tac-3", descripcion: "Desarrollo y Retención de Talento", nivelJerarquico: "tactico" },
      { id: "b-lid-tac-4", descripcion: "Comunicación Estratégica con Stakeholders", nivelJerarquico: "tactico" },
      { id: "b-lid-tac-5", descripcion: "Integridad en la Toma de Decisiones", nivelJerarquico: "tactico" },
      { id: "b-lid-tac-6", descripcion: "Cultura de Retroalimentación Continua", nivelJerarquico: "tactico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Lidera pequeños grupos en tareas definidas." },
      { nivel: 2, descripcion: "Motiva y orienta a su equipo hacia los objetivos." },
      { nivel: 3, descripcion: "Desarrolla talento y gestiona el desempeño del equipo." },
      { nivel: 4, descripcion: "Construye visión compartida y compromiso organizacional." },
      { nivel: 5, descripcion: "Transforma organizaciones a través del liderazgo inspiracional." },
    ],
  },

  // ─── NIVEL ESTRATÉGICO (12 competencias EXCLUSIVAS) ───
  // Corrección 2: is_strategic_exclusive = true

  {
    id: "c-est-solucion-problemas",
    nombre: "Solución de Problemas",
    descripcion: "Priorización efectiva, disposición para innovar y reuniones de diagnóstico.",
    tipo: "funcional",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-sp-1", descripcion: "Priorización Efectiva de Tareas", nivelJerarquico: "estrategico" },
      { id: "b-sp-2", descripcion: "Disposición para Innovar", nivelJerarquico: "estrategico" },
      { id: "b-sp-3", descripcion: "Reuniones Rápidas para Diagnóstico", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Aborda problemas de forma reactiva y sin estructura." },
      { nivel: 2, descripcion: "Identifica causas raíz y propone soluciones básicas." },
      { nivel: 3, descripcion: "Resuelve problemas complejos con enfoque innovador." },
      { nivel: 4, descripcion: "Anticipa problemas sistémicos y diseña planes preventivos." },
      { nivel: 5, descripcion: "Transforma los problemas en oportunidades estratégicas." },
    ],
  },

  {
    id: "c-est-aptitud-negocio",
    nombre: "Aptitud de Negocio",
    descripcion: "Análisis de competencia y negociación con socios estratégicos.",
    tipo: "funcional",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-an-1", descripcion: "Análisis de Competencia y Mercado", nivelJerarquico: "estrategico" },
      { id: "b-an-2", descripcion: "Negociación con Socios Estratégicos", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Conocimiento limitado del entorno de negocio." },
      { nivel: 2, descripcion: "Comprende el modelo de negocio y sus principales competidores." },
      { nivel: 3, descripcion: "Analiza tendencias del mercado y posiciona el área estratégicamente." },
      { nivel: 4, descripcion: "Desarrolla alianzas estratégicas y genera ventaja competitiva." },
      { nivel: 5, descripcion: "Define el posicionamiento estratégico de la organización." },
    ],
  },

  {
    id: "c-est-trabajo-equipo",
    nombre: "Trabajo en Equipo",
    descripcion: "Colaboración activa, apoyo mutuo, resolución de conflictos y celebración de logros.",
    tipo: "core",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 9,
    comportamientos: [
      { id: "b-te-est-1", descripcion: "Colaboración Activa entre Áreas", nivelJerarquico: "estrategico" },
      { id: "b-te-est-2", descripcion: "Apoyo Mutuo en Iniciativas Estratégicas", nivelJerarquico: "estrategico" },
      { id: "b-te-est-3", descripcion: "Resolución de Conflictos Organizacionales", nivelJerarquico: "estrategico" },
      { id: "b-te-est-4", descripcion: "Celebración de Logros del Equipo Directivo", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Opera en silos; colaboración limitada entre áreas." },
      { nivel: 2, descripcion: "Colabora con otras áreas cuando es necesario." },
      { nivel: 3, descripcion: "Promueve activamente la colaboración interfuncional." },
      { nivel: 4, descripcion: "Construye ecosistemas de colaboración de alto rendimiento." },
      { nivel: 5, descripcion: "Es referente de colaboración para toda la organización." },
    ],
  },

  {
    id: "c-est-atencion-cliente",
    nombre: "Atención al Cliente",
    descripcion: "Conocimiento profundo del cliente y comunicación abierta.",
    tipo: "core",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-ac-est-1", descripcion: "Conocimiento Profundo del Cliente Estratégico", nivelJerarquico: "estrategico" },
      { id: "b-ac-est-2", descripcion: "Comunicación Abierta y Transparente con Clientes Clave", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Conocimiento superficial de los clientes estratégicos." },
      { nivel: 2, descripcion: "Mantiene relaciones básicas con clientes clave." },
      { nivel: 3, descripcion: "Construye relaciones de largo plazo con clientes estratégicos." },
      { nivel: 4, descripcion: "Anticipa necesidades de clientes clave y diseña propuestas de valor." },
      { nivel: 5, descripcion: "Es referente en gestión de relaciones con clientes estratégicos." },
    ],
  },

  {
    id: "c-est-toma-decisiones",
    nombre: "Toma de Decisiones",
    descripcion: "Análisis basado en evidencia y evaluación de opciones y consecuencias.",
    tipo: "funcional",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 9,
    comportamientos: [
      { id: "b-td-1", descripcion: "Análisis Basado en Evidencia y Datos", nivelJerarquico: "estrategico" },
      { id: "b-td-2", descripcion: "Evaluación de Opciones y Consecuencias", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Decisiones reactivas sin análisis previo." },
      { nivel: 2, descripcion: "Evalúa opciones básicas antes de decidir." },
      { nivel: 3, descripcion: "Toma decisiones complejas basadas en datos y análisis." },
      { nivel: 4, descripcion: "Diseña marcos de decisión para la organización." },
      { nivel: 5, descripcion: "Sus decisiones generan transformaciones organizacionales." },
    ],
  },

  {
    id: "c-est-adaptabilidad",
    nombre: "Adaptabilidad",
    descripcion: "Reorganización ágil, flexibilidad en funciones y apertura a nuevas herramientas.",
    tipo: "core",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-adap-1", descripcion: "Reorganización de Tareas Rápida ante Cambios", nivelJerarquico: "estrategico" },
      { id: "b-adap-2", descripcion: "Flexibilidad en Funciones y Roles", nivelJerarquico: "estrategico" },
      { id: "b-adap-3", descripcion: "Apertura a Nuevas Herramientas y Tecnologías", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Resistencia al cambio; dificultad para adaptarse." },
      { nivel: 2, descripcion: "Acepta los cambios y se adapta gradualmente." },
      { nivel: 3, descripcion: "Se adapta rápidamente y ayuda a su equipo en la transición." },
      { nivel: 4, descripcion: "Lidera procesos de transformación organizacional." },
      { nivel: 5, descripcion: "Anticipa cambios del entorno y prepara a toda la organización." },
    ],
  },

  {
    id: "c-est-tolerancia-estres",
    nombre: "Tolerancia al Estrés",
    descripcion: "Priorización bajo presión y fomento de un ambiente colaborativo.",
    tipo: "core",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-te-est-1b", descripcion: "Priorización Efectiva Bajo Presión", nivelJerarquico: "estrategico" },
      { id: "b-te-est-2b", descripcion: "Fomento de un Ambiente Colaborativo en Crisis", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "El estrés afecta significativamente su rendimiento." },
      { nivel: 2, descripcion: "Mantiene la calma en situaciones de presión moderada." },
      { nivel: 3, descripcion: "Gestiona el estrés efectivamente y mantiene el rendimiento." },
      { nivel: 4, descripcion: "Es un ancla de estabilidad para su equipo en situaciones críticas." },
      { nivel: 5, descripcion: "Transforma la presión en oportunidad y motiva al equipo." },
    ],
  },

  {
    id: "c-est-innovacion",
    nombre: "Innovación",
    descripcion: "Generación de contenido creativo, investigación de nuevas tecnologías y adaptación al cambio.",
    tipo: "funcional",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-inn-1", descripcion: "Generación de Contenido y Soluciones Creativas", nivelJerarquico: "estrategico" },
      { id: "b-inn-2", descripcion: "Investigación de Nuevas Tecnologías Aplicables", nivelJerarquico: "estrategico" },
      { id: "b-inn-3", descripcion: "Adaptación Flexible al Cambio Tecnológico", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Reproduce soluciones existentes sin aportar ideas nuevas." },
      { nivel: 2, descripcion: "Propone mejoras incrementales a procesos existentes." },
      { nivel: 3, descripcion: "Genera ideas innovadoras e implementa nuevas soluciones." },
      { nivel: 4, descripcion: "Diseña ecosistemas de innovación en la organización." },
      { nivel: 5, descripcion: "Posiciona la empresa como referente de innovación en la industria." },
    ],
  },

  {
    id: "c-est-analisis-informacion",
    nombre: "Análisis de la Información",
    descripcion: "Validación de fuentes, análisis comparativo, conclusiones basadas en datos y medición de métricas.",
    tipo: "funcional",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 9,
    comportamientos: [
      { id: "b-ai-1", descripcion: "Validación de Fuentes de Información", nivelJerarquico: "estrategico" },
      { id: "b-ai-2", descripcion: "Análisis Comparativo de Datos", nivelJerarquico: "estrategico" },
      { id: "b-ai-3", descripcion: "Conclusiones Basadas en Datos", nivelJerarquico: "estrategico" },
      { id: "b-ai-4", descripcion: "Medición y Seguimiento de Métricas Clave", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Analiza información básica para resolver problemas rutinarios." },
      { nivel: 2, descripcion: "Usa datos para fundamentar sus decisiones." },
      { nivel: 3, descripcion: "Identifica tendencias y patrones complejos." },
      { nivel: 4, descripcion: "Diseña modelos analíticos para la toma de decisiones." },
      { nivel: 5, descripcion: "Lidera la cultura data-driven en la organización." },
    ],
  },

  {
    id: "c-est-planeacion-orden",
    nombre: "Planeación y Orden",
    descripcion: "Planificación estratégica, herramientas de gestión, evaluación anticipada y simulaciones.",
    tipo: "funcional",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 9,
    comportamientos: [
      { id: "b-po-1", descripcion: "Planificación Estratégica de Largo Plazo", nivelJerarquico: "estrategico" },
      { id: "b-po-2", descripcion: "Uso de Herramientas de Gestión y PMO", nivelJerarquico: "estrategico" },
      { id: "b-po-3", descripcion: "Evaluación Anticipada de Escenarios", nivelJerarquico: "estrategico" },
      { id: "b-po-4", descripcion: "Simulaciones y Análisis de Sensibilidad", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Planificación reactiva y a muy corto plazo." },
      { nivel: 2, descripcion: "Planifica a mediano plazo con herramientas básicas." },
      { nivel: 3, descripcion: "Desarrolla planes estratégicos con múltiples escenarios." },
      { nivel: 4, descripcion: "Diseña el marco de planificación organizacional." },
      { nivel: 5, descripcion: "Sus planes estratégicos posicionan a la empresa como líder." },
    ],
  },

  {
    id: "c-est-comunicacion",
    nombre: "Comunicación",
    descripcion: "Uso efectivo de medios, claridad y precisión, retroalimentación constructiva.",
    tipo: "core",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-com-est-1", descripcion: "Uso Efectivo de Medios de Comunicación", nivelJerarquico: "estrategico" },
      { id: "b-com-est-2", descripcion: "Claridad y Precisión en Mensajes Estratégicos", nivelJerarquico: "estrategico" },
      { id: "b-com-est-3", descripcion: "Retroalimentación Constructiva a su Equipo Directivo", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Se comunica con claridad en situaciones simples." },
      { nivel: 2, descripcion: "Adapta su comunicación a diferentes audiencias." },
      { nivel: 3, descripcion: "Facilita conversaciones difíciles con asertividad." },
      { nivel: 4, descripcion: "Diseña estrategias de comunicación organizacional." },
      { nivel: 5, descripcion: "Es referente de comunicación a nivel directivo." },
    ],
  },

  {
    id: "c-est-liderazgo",
    nombre: "Liderazgo",
    descripcion: "Fomento de participación, eficacia en decisiones, comunicación clara, empatía, integridad y transferencia de conocimiento.",
    tipo: "liderazgo",
    nivelJerarquico: ["estrategico"],
    esExclusivaEstrategico: true,
    inmutable: true,
    activa: true,
    pesoPorDefecto: 8,
    comportamientos: [
      { id: "b-lid-est-1", descripcion: "Fomento de Participación e Iniciativa", nivelJerarquico: "estrategico" },
      { id: "b-lid-est-2", descripcion: "Eficacia en Toma de Decisiones de Alto Impacto", nivelJerarquico: "estrategico" },
      { id: "b-lid-est-3", descripcion: "Comunicación Clara de Visión y Estrategia", nivelJerarquico: "estrategico" },
      { id: "b-lid-est-4", descripcion: "Empatía con el Equipo Directivo", nivelJerarquico: "estrategico" },
      { id: "b-lid-est-5", descripcion: "Integridad y Coherencia Institucional", nivelJerarquico: "estrategico" },
      { id: "b-lid-est-6", descripcion: "Transferencia de Conocimiento Estratégico", nivelJerarquico: "estrategico" },
    ],
    indicadores: [
      { nivel: 1, descripcion: "Lidera pequeños grupos en tareas definidas." },
      { nivel: 2, descripcion: "Motiva y orienta a su equipo hacia los objetivos." },
      { nivel: 3, descripcion: "Desarrolla talento y gestiona el desempeño del equipo directivo." },
      { nivel: 4, descripcion: "Construye visión compartida y compromiso organizacional." },
      { nivel: 5, descripcion: "Transforma organizaciones a través del liderazgo transformacional." },
    ],
  },
];

// Helpers para obtener competencias filtradas por nivel
export function getCompetenciasPorNivel(
  nivel: "operativo" | "tactico" | "estrategico"
): Competencia[] {
  return MOCK_COMPETENCIAS.filter((c) => c.nivelJerarquico.includes(nivel));
}

export function getComportamientosPorNivel(
  competencia: Competencia,
  nivel: "operativo" | "tactico" | "estrategico"
) {
  return competencia.comportamientos.filter((b) => b.nivelJerarquico === nivel);
}
