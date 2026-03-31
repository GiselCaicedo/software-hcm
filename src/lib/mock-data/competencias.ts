export type NivelBiblioteca = "operativo" | "tactico" | "estrategico";

export interface Comportamiento {
  nombre: string;
}

export interface CompetenciaBiblioteca {
  id: string;
  nombre: string;
  definicion: string;
  comportamientos: string[];
  nivel: NivelBiblioteca;
  peso: number; // % por defecto
}

// ── NIVEL OPERATIVO ─────────────────────────────────────────────────────────

export const COMPETENCIAS_OPERATIVO: CompetenciaBiblioteca[] = [
  {
    id: "op-1",
    nombre: "Compromiso",
    definicion:
      "Capacidad y voluntad de alinear intereses y comportamientos personales con las necesidades, prioridades y objetivos de la compañía.",
    comportamientos: [
      "Completa las tareas asignadas dentro de los plazos establecidos y cumple con los estándares de calidad requeridos.",
      "Identifica y propone soluciones para mejorar procesos en su área de trabajo.",
      "Prioriza las necesidades del cliente interno y externo en todas sus acciones diarias.",
    ],
    nivel: "operativo",
    peso: 20,
  },
  {
    id: "op-2",
    nombre: "Proactividad - Iniciativa",
    definicion:
      "Capacidad de identificar problemas, obstáculos u oportunidades y tomar acciones inmediatas para abordarlos.",
    comportamientos: [
      "Identifica problemas en su área de trabajo antes de que se conviertan en inconvenientes mayores.",
      "Actúa de manera inmediata ante situaciones que requieren atención.",
      "Busca formas de hacer su trabajo de manera más eficiente.",
    ],
    nivel: "operativo",
    peso: 20,
  },
  {
    id: "op-3",
    nombre: "Orientación al Cliente",
    definicion:
      "Trabajar basándose en las necesidades del cliente, estableciendo relaciones de confianza y priorizándolos en todas las acciones.",
    comportamientos: [
      "Identifica y comprende las necesidades del cliente de manera oportuna.",
      "Resuelve eficazmente los problemas o inconvenientes que presenta el cliente.",
      "Realiza seguimiento a las solicitudes y brinda retroalimentación al cliente.",
    ],
    nivel: "operativo",
    peso: 15,
  },
  {
    id: "op-4",
    nombre: "Trabajo en Equipo",
    definicion:
      "Colaborar efectivamente con otros para alcanzar objetivos comunes, aprovechando fortalezas individuales.",
    comportamientos: [
      "Colabora con sus compañeros y mantiene una comunicación efectiva para el logro de objetivos.",
      "Apoya a sus compañeros y contribuye a la resolución de conflictos de forma constructiva.",
      "Asume responsabilidad compartida en los resultados del equipo.",
    ],
    nivel: "operativo",
    peso: 20,
  },
  {
    id: "op-5",
    nombre: "Organización y Manejo del Tiempo",
    definicion:
      "Ejecutar acciones de manera meticulosa, manteniendo orden y planificando tareas eficientemente.",
    comportamientos: [
      "Planifica sus tareas diarias de manera ordenada y con prioridades claras.",
      "Gestiona su tiempo de forma eficiente para cumplir con sus responsabilidades.",
      "Cumple con los plazos establecidos sin comprometer la calidad de su trabajo.",
    ],
    nivel: "operativo",
    peso: 15,
  },
  {
    id: "op-6",
    nombre: "Liderazgo",
    definicion:
      "Habilidad para orientar grupos humanos en una dirección determinada, inspirando valores y anticipando escenarios de desarrollo.",
    comportamientos: [
      "Promueve la participación activa de los miembros del equipo.",
      "Facilita reuniones de manera eficiente y con agenda clara.",
      "Comunica con claridad los objetivos y expectativas al equipo.",
      "Identifica y desarrolla el potencial de los miembros de su equipo.",
      "Actúa con integridad y coherencia entre lo que dice y hace.",
      "Brinda retroalimentación positiva y constructiva al equipo.",
    ],
    nivel: "operativo",
    peso: 10,
  },
];

// ── NIVEL TÁCTICO ────────────────────────────────────────────────────────────

export const COMPETENCIAS_TACTICO: CompetenciaBiblioteca[] = [
  {
    id: "tac-1",
    nombre: "Compromiso",
    definicion:
      "Capacidad y voluntad de alinear intereses y comportamientos del equipo con las necesidades, prioridades y objetivos estratégicos de la compañía.",
    comportamientos: [
      "Desarrolla planes de acción detallados para cumplir con los objetivos del equipo y asegura que todos los miembros estén alineados.",
      "Identifica oportunidades de mejora continua en los procesos del área y lidera su implementación.",
      "Orienta las decisiones del equipo hacia la satisfacción del cliente como prioridad estratégica.",
    ],
    nivel: "tactico",
    peso: 20,
  },
  {
    id: "tac-2",
    nombre: "Proactividad - Iniciativa",
    definicion:
      "Capacidad de anticipar problemas estructurales del área y movilizar recursos para abordarlos antes de que escalen.",
    comportamientos: [
      "Monitorea indicadores del área para detectar desviaciones antes de que afecten los resultados.",
      "Propone e implementa planes de acción ante situaciones de riesgo sin esperar instrucción.",
      "Lidera iniciativas de mejora que incrementan la eficiencia del equipo.",
    ],
    nivel: "tactico",
    peso: 20,
  },
  {
    id: "tac-3",
    nombre: "Orientación al Cliente",
    definicion:
      "Gestionar los procesos del área garantizando que la experiencia del cliente sea la guía de todas las decisiones.",
    comportamientos: [
      "Diseña procesos orientados a satisfacer las necesidades del cliente de manera ágil y efectiva.",
      "Escala y resuelve problemas críticos de clientes garantizando soluciones definitivas.",
      "Implementa mecanismos de retroalimentación para medir y mejorar la satisfacción del cliente.",
    ],
    nivel: "tactico",
    peso: 15,
  },
  {
    id: "tac-4",
    nombre: "Trabajo en Equipo",
    definicion:
      "Articular los esfuerzos del equipo hacia objetivos comunes, fomentando la colaboración y la sinergia interdepartamental.",
    comportamientos: [
      "Facilita la comunicación entre miembros del equipo y con otras áreas para lograr objetivos compartidos.",
      "Media conflictos internos con enfoque en la solución y el bienestar del equipo.",
      "Distribuye responsabilidades equitativamente y reconoce los logros colectivos.",
    ],
    nivel: "tactico",
    peso: 20,
  },
  {
    id: "tac-5",
    nombre: "Organización y Manejo del Tiempo",
    definicion:
      "Planificar y coordinar los recursos del área para garantizar el cumplimiento de compromisos en tiempo y forma.",
    comportamientos: [
      "Elabora cronogramas y planes de trabajo para el equipo con hitos claros y medibles.",
      "Prioriza y redistribuye recursos cuando hay cambios en las prioridades operacionales.",
      "Asegura que el equipo cumpla con los entregables en los plazos comprometidos.",
    ],
    nivel: "tactico",
    peso: 15,
  },
  {
    id: "tac-6",
    nombre: "Liderazgo",
    definicion:
      "Inspirar y guiar al equipo hacia el logro de resultados, generando un ambiente de alto desempeño y desarrollo profesional.",
    comportamientos: [
      "Genera espacios de participación donde el equipo puede plantear ideas y soluciones.",
      "Conduce reuniones con agenda estructurada y decisiones claras al cierre.",
      "Establece y comunica expectativas claras de desempeño para cada miembro.",
      "Implementa planes de desarrollo para retener y potenciar el talento del equipo.",
      "Modela los valores organizacionales en su comportamiento cotidiano.",
      "Brinda retroalimentación continua orientada al crecimiento profesional del equipo.",
    ],
    nivel: "tactico",
    peso: 10,
  },
];

// ── NIVEL ESTRATÉGICO ────────────────────────────────────────────────────────

export const COMPETENCIAS_ESTRATEGICO: CompetenciaBiblioteca[] = [
  {
    id: "est-1",
    nombre: "Solución de Problemas",
    definicion:
      "Capacidad para analizar situaciones complejas, identificar causas raíz y diseñar soluciones efectivas y sostenibles.",
    comportamientos: [
      "Descompone problemas complejos en elementos manejables para identificar la causa raíz.",
      "Evalúa múltiples alternativas de solución considerando impacto, riesgo y viabilidad.",
      "Implementa soluciones de manera efectiva y hace seguimiento a sus resultados.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-2",
    nombre: "Aptitud de Negocio",
    definicion:
      "Comprensión profunda del modelo de negocio, el entorno competitivo y la capacidad de traducir estrategia en resultados.",
    comportamientos: [
      "Comprende el modelo de negocio y cómo su área contribuye a la estrategia organizacional.",
      "Analiza el entorno competitivo y propone ajustes estratégicos oportunos.",
      "Toma decisiones con visión de rentabilidad y sostenibilidad del negocio.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-3",
    nombre: "Trabajo en Equipo",
    definicion:
      "Construir alianzas estratégicas y fomentar la colaboración transversal para el logro de objetivos organizacionales.",
    comportamientos: [
      "Construye relaciones de confianza con líderes de otras áreas para lograr objetivos comunes.",
      "Gestiona conflictos estratégicos con enfoque en el interés organizacional.",
      "Promueve una cultura de colaboración e interdependencia entre equipos.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-4",
    nombre: "Atención al Cliente",
    definicion:
      "Diseñar estrategias y políticas que garanticen una experiencia excepcional para el cliente como ventaja competitiva.",
    comportamientos: [
      "Define estándares de servicio y crea condiciones organizacionales para su cumplimiento.",
      "Lidera iniciativas de mejora en la experiencia del cliente basadas en datos.",
      "Establece relaciones estratégicas con clientes clave para garantizar su fidelización.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-5",
    nombre: "Toma de Decisiones",
    definicion:
      "Capacidad para tomar decisiones oportunas y fundamentadas en contextos de incertidumbre y alta complejidad.",
    comportamientos: [
      "Toma decisiones estratégicas con base en datos, experiencia y análisis de riesgos.",
      "Define prioridades organizacionales con claridad y las comunica efectivamente.",
      "Asume responsabilidad por las consecuencias de sus decisiones.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-6",
    nombre: "Adaptabilidad",
    definicion:
      "Capacidad de liderar el cambio organizacional y adaptarse eficazmente a entornos dinámicos y cambiantes.",
    comportamientos: [
      "Lidera procesos de cambio con claridad, comunicando el propósito y beneficios al equipo.",
      "Ajusta estrategias y recursos ante cambios en el entorno de negocio.",
      "Fomenta una cultura organizacional abierta al cambio y la innovación continua.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-7",
    nombre: "Tolerancia al Estrés",
    definicion:
      "Mantener el desempeño, la claridad y el equilibrio emocional ante situaciones de alta presión o crisis.",
    comportamientos: [
      "Toma decisiones efectivas incluso en situaciones de alta presión o incertidumbre.",
      "Mantiene la calma y transmite seguridad al equipo durante períodos de crisis.",
      "Gestiona múltiples frentes simultáneamente sin perder foco en las prioridades.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-8",
    nombre: "Innovación",
    definicion:
      "Capacidad para generar e implementar ideas disruptivas que creen valor para la organización y sus clientes.",
    comportamientos: [
      "Fomenta un ambiente donde el equipo se siente seguro para proponer ideas innovadoras.",
      "Lidera la implementación de iniciativas de innovación con impacto medible en el negocio.",
      "Explora tendencias del mercado e industria para anticipar oportunidades de diferenciación.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-9",
    nombre: "Análisis de la Información",
    definicion:
      "Capacidad de procesar, interpretar y transformar grandes volúmenes de información en insights estratégicos accionables.",
    comportamientos: [
      "Analiza datos complejos para identificar tendencias, patrones y oportunidades estratégicas.",
      "Transforma información en reportes ejecutivos con recomendaciones claras y accionables.",
      "Diseña sistemas de medición y seguimiento para monitorear el desempeño organizacional.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
  {
    id: "est-10",
    nombre: "Planeación y Orden",
    definicion:
      "Capacidad de estructurar, priorizar y ejecutar planes estratégicos de forma sistemática y orientada a resultados.",
    comportamientos: [
      "Diseña planes estratégicos con objetivos claros, hitos medibles y responsables definidos.",
      "Establece sistemas de seguimiento que garanticen el cumplimiento de los planes.",
      "Gestiona recursos organizacionales de manera eficiente para maximizar resultados.",
    ],
    nivel: "estrategico",
    peso: 10,
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

export type BibliotecaNivel = {
  operativo: CompetenciaBiblioteca[];
  tactico: CompetenciaBiblioteca[];
  estrategico: CompetenciaBiblioteca[];
};

export const BIBLIOTECA_COMPETENCIAS: BibliotecaNivel = {
  operativo: COMPETENCIAS_OPERATIVO,
  tactico: COMPETENCIAS_TACTICO,
  estrategico: COMPETENCIAS_ESTRATEGICO,
};

export function getCompetenciasPorNivel(nivel: "operativo" | "tactico" | "estrategico"): CompetenciaBiblioteca[] {
  return BIBLIOTECA_COMPETENCIAS[nivel];
}
