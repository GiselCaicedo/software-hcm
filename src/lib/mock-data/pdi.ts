export type EstadoPDI = "En curso" | "Completado" | "Atrasado" | "Sin iniciar";

export interface AccionPDI {
  descripcion: string;
  tipo: "Formación" | "Mentoría" | "Proyecto" | "Lectura";
  fechaLimite: string;
  estado: EstadoPDI;
}

export interface PlanDesarrollo {
  id: string;
  colaborador: { name: string; cargo: string; area: string; seed: string };
  lider: string;
  competenciaObjetivo: string;
  nivelActual: number;
  nivelMeta: number;
  fechaInicio: string;
  fechaFin: string;
  porcentajeAvance: number;
  estado: EstadoPDI;
  acciones: AccionPDI[];
}

export const PLANES_DESARROLLO: PlanDesarrollo[] = [
  {
    id: "pdi01",
    colaborador: { name: "Valentina Morales", cargo: "Analista de Talento Humano", area: "Talento Humano", seed: "valentina-morales" },
    lider: "Alejandra Ríos",
    competenciaObjetivo: "Liderazgo de equipos",
    nivelActual: 2,
    nivelMeta: 4,
    fechaInicio: "01 Ene 2026",
    fechaFin: "30 Jun 2026",
    porcentajeAvance: 45,
    estado: "En curso",
    acciones: [
      { descripcion: "Curso de facilitación y liderazgo situacional",  tipo: "Formación", fechaLimite: "15 Feb 2026", estado: "Completado" },
      { descripcion: "Mentoría mensual con Directora de TH",            tipo: "Mentoría",  fechaLimite: "30 Mar 2026", estado: "En curso"   },
      { descripcion: "Liderar proyecto de bienestar Q2",                tipo: "Proyecto",  fechaLimite: "30 Jun 2026", estado: "Sin iniciar" },
    ],
  },
  {
    id: "pdi02",
    colaborador: { name: "Sebastián Cárdenas", cargo: "Analista de Sistemas", area: "Tecnología", seed: "sebastian-cardenas" },
    lider: "Jorge Palacios",
    competenciaObjetivo: "Gestión de proyectos ágiles",
    nivelActual: 1,
    nivelMeta: 3,
    fechaInicio: "15 Ene 2026",
    fechaFin: "15 Jul 2026",
    porcentajeAvance: 30,
    estado: "En curso",
    acciones: [
      { descripcion: "Certificación Scrum Master (PSM I)",              tipo: "Formación", fechaLimite: "28 Feb 2026", estado: "Completado" },
      { descripcion: "Participar como Scrum Master en proyecto interno", tipo: "Proyecto",  fechaLimite: "30 May 2026", estado: "En curso"   },
    ],
  },
  {
    id: "pdi03",
    colaborador: { name: "Daniela Forero", cargo: "Auxiliar Contable", area: "Contabilidad", seed: "daniela-forero" },
    lider: "Patricia Suárez",
    competenciaObjetivo: "Análisis financiero avanzado",
    nivelActual: 1,
    nivelMeta: 3,
    fechaInicio: "01 Feb 2026",
    fechaFin: "31 Jul 2026",
    porcentajeAvance: 10,
    estado: "Atrasado",
    acciones: [
      { descripcion: "Diplomado en finanzas para no financieros",        tipo: "Formación", fechaLimite: "15 Mar 2026", estado: "Atrasado"   },
      { descripcion: "Lectura: Análisis de estados financieros (Ross)", tipo: "Lectura",   fechaLimite: "30 Mar 2026", estado: "Sin iniciar" },
    ],
  },
  {
    id: "pdi04",
    colaborador: { name: "Andrés Mosquera", cargo: "Coordinador Comercial", area: "Comercial", seed: "andres-mosquera" },
    lider: "Ricardo Bermúdez",
    competenciaObjetivo: "Negociación avanzada",
    nivelActual: 3,
    nivelMeta: 5,
    fechaInicio: "01 Oct 2025",
    fechaFin: "31 Mar 2026",
    porcentajeAvance: 85,
    estado: "En curso",
    acciones: [
      { descripcion: "Taller de negociación Harvard Negotiation Project", tipo: "Formación", fechaLimite: "30 Nov 2025", estado: "Completado" },
      { descripcion: "Negociar 3 contratos corporativos de manera autónoma", tipo: "Proyecto", fechaLimite: "28 Feb 2026", estado: "Completado" },
      { descripcion: "Retroalimentación final con Director Comercial",    tipo: "Mentoría",  fechaLimite: "31 Mar 2026", estado: "En curso"   },
    ],
  },
  {
    id: "pdi05",
    colaborador: { name: "Luisa Pinzón", cargo: "Analista Financiero", area: "Finanzas", seed: "luisa-pinzon" },
    lider: "Patricia Suárez",
    competenciaObjetivo: "Modelación financiera en Excel",
    nivelActual: 2,
    nivelMeta: 4,
    fechaInicio: "01 Sep 2025",
    fechaFin: "28 Feb 2026",
    porcentajeAvance: 100,
    estado: "Completado",
    acciones: [
      { descripcion: "Curso avanzado Excel para finanzas (Udemy)",       tipo: "Formación", fechaLimite: "31 Oct 2025", estado: "Completado" },
      { descripcion: "Construir modelo de proyección 2026",              tipo: "Proyecto",  fechaLimite: "30 Jan 2026", estado: "Completado" },
    ],
  },
];
