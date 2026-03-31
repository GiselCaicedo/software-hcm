export interface BrechaCompetencia {
  id: string;
  competencia: string;
  categoria: "Técnica" | "Conductual" | "Liderazgo";
  nivelRequerido: number;   // 1-5
  nivelPromedio: number;    // 1-5 (puede ser decimal)
  brecha: number;           // positivo = déficit
  colaboradoresAfectados: number;
  tendencia: "mejorando" | "estable" | "empeorando";
  areas: string[];
}

export interface ColaboradorBrecha {
  name: string;
  seed: string;
  cargo: string;
  area: string;
  brechas: { competencia: string; nivel: number; requerido: number }[];
}

export const BRECHAS: BrechaCompetencia[] = [
  {
    id: "br01",
    competencia: "Pensamiento analítico",
    categoria: "Técnica",
    nivelRequerido: 4,
    nivelPromedio: 2.6,
    brecha: 1.4,
    colaboradoresAfectados: 18,
    tendencia: "mejorando",
    areas: ["Finanzas", "Operaciones", "Tecnología"],
  },
  {
    id: "br02",
    competencia: "Comunicación asertiva",
    categoria: "Conductual",
    nivelRequerido: 4,
    nivelPromedio: 3.1,
    brecha: 0.9,
    colaboradoresAfectados: 12,
    tendencia: "estable",
    areas: ["Servicio al Cliente", "Comercial"],
  },
  {
    id: "br03",
    competencia: "Liderazgo de equipos",
    categoria: "Liderazgo",
    nivelRequerido: 4,
    nivelPromedio: 2.4,
    brecha: 1.6,
    colaboradoresAfectados: 8,
    tendencia: "empeorando",
    areas: ["PMO", "Operaciones"],
  },
  {
    id: "br04",
    competencia: "Orientación al cliente",
    categoria: "Conductual",
    nivelRequerido: 5,
    nivelPromedio: 3.8,
    brecha: 1.2,
    colaboradoresAfectados: 21,
    tendencia: "mejorando",
    areas: ["Servicio al Cliente", "Comercial", "Marketing"],
  },
  {
    id: "br05",
    competencia: "Gestión del tiempo",
    categoria: "Conductual",
    nivelRequerido: 3,
    nivelPromedio: 2.9,
    brecha: 0.1,
    colaboradoresAfectados: 4,
    tendencia: "estable",
    areas: ["Tecnología", "PMO"],
  },
  {
    id: "br06",
    competencia: "Manejo de herramientas digitales",
    categoria: "Técnica",
    nivelRequerido: 4,
    nivelPromedio: 2.1,
    brecha: 1.9,
    colaboradoresAfectados: 26,
    tendencia: "empeorando",
    areas: ["Contabilidad", "Compras", "Operaciones"],
  },
  {
    id: "br07",
    competencia: "Trabajo en equipo",
    categoria: "Conductual",
    nivelRequerido: 4,
    nivelPromedio: 3.7,
    brecha: 0.3,
    colaboradoresAfectados: 3,
    tendencia: "mejorando",
    areas: ["Comercial"],
  },
  {
    id: "br08",
    competencia: "Toma de decisiones bajo presión",
    categoria: "Liderazgo",
    nivelRequerido: 4,
    nivelPromedio: 2.5,
    brecha: 1.5,
    colaboradoresAfectados: 10,
    tendencia: "estable",
    areas: ["PMO", "Operaciones", "Finanzas"],
  },
];

export const COLABORADORES_EN_BRECHA: ColaboradorBrecha[] = [
  {
    name: "Daniela Forero",
    seed: "daniela-forero",
    cargo: "Auxiliar Contable",
    area: "Contabilidad",
    brechas: [
      { competencia: "Manejo de herramientas digitales", nivel: 1, requerido: 4 },
      { competencia: "Pensamiento analítico",            nivel: 2, requerido: 4 },
    ],
  },
  {
    name: "Héctor Villanueva",
    seed: "hector-villanueva",
    cargo: "Auxiliar de Compras",
    area: "Compras",
    brechas: [
      { competencia: "Manejo de herramientas digitales", nivel: 1, requerido: 4 },
      { competencia: "Gestión del tiempo",               nivel: 2, requerido: 3 },
    ],
  },
  {
    name: "Lorena Gutiérrez",
    seed: "lorena-gutierrez",
    cargo: "Coordinadora de Logística",
    area: "Operaciones",
    brechas: [
      { competencia: "Liderazgo de equipos",                nivel: 2, requerido: 4 },
      { competencia: "Toma de decisiones bajo presión",     nivel: 2, requerido: 4 },
    ],
  },
  {
    name: "Mauricio Castaño",
    seed: "mauricio-castano",
    cargo: "Analista de Operaciones",
    area: "Operaciones",
    brechas: [
      { competencia: "Pensamiento analítico",            nivel: 2, requerido: 4 },
      { competencia: "Manejo de herramientas digitales", nivel: 2, requerido: 4 },
    ],
  },
  {
    name: "Carolina Nieto",
    seed: "carolina-nieto",
    cargo: "Auxiliar de Servicio al Cliente",
    area: "Servicio al Cliente",
    brechas: [
      { competencia: "Comunicación asertiva",   nivel: 2, requerido: 4 },
      { competencia: "Orientación al cliente",  nivel: 3, requerido: 5 },
    ],
  },
];
