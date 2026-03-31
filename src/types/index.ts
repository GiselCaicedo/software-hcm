export type UserRole = "admin" | "lider" | "colaborador";
export type NivelJerarquico = "operativo" | "tactico" | "estrategico";
export type BandaSalarial = "B1" | "B2" | "B3";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cargo: string;
  cargoId: string;
  departamento: string;
  area: string;
  sede: string;
  nivel: NivelJerarquico;
  bandaSalarial: BandaSalarial;
  liderDirectoId: string | null;
  avatar?: string;
  diasEnEmpresa?: number;
}

export interface Competencia {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: "Organizacional" | "Por nivel" | "De la tarea";
  nivel: string;
  nivelActual: number;
  nivelEsperado: number;
  evaluados: number;
  categoria?: string;
}

export interface Objetivo {
  id: string;
  titulo: string;
  descripcion: string;
  fuente: string;
  fechaInicio: string;
  fechaFin: string;
  ponderacion: number;
  progreso: number;
  estado: "In Progress" | "Completado" | "Pendiente";
}

export interface FasesCiclo {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "activa" | "pendiente" | "completada";
}
