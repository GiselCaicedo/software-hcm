export type UserRole = "admin" | "lider" | "colaborador";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cargo: string;
  departamento: string;
  avatar?: string;
  diasEnEmpresa?: number;
}

export interface Evaluacion {
  id: string;
  empleado: User;
  fuente: string;
  departamento: string;
  estado: "En Curso" | "Enviada" | "Calificada" | "Firmada" | "Pendiente";
  calificacion: number;
  progreso: number;
  cicloId: string;
}

export interface Ciclo {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "Activo" | "Cerrado" | "Borrador";
  totalEmpleados: number;
  calificadas: number;
  pendientes: number;
  sinEvaluar: number;
  pesoObjetivos: number;
  pesoCompetencias: number;
  escala: string;
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

export interface FasesCiclo {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "activa" | "pendiente" | "completada";
}
