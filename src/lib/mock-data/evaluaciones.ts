import type { Evaluacion } from "@/types";
import { USERS } from "./users";

export const EVALUACIONES: Evaluacion[] = [
  { id: "e1", empleado: USERS[2], fuente: "Skyfall", departamento: "Liam x Carla", estado: "En Curso", calificacion: 69, progreso: 69, cicloId: "c1" },
  { id: "e2", empleado: USERS[3], fuente: "Better", departamento: "Eintriebe", estado: "En Curso", calificacion: 90, progreso: 90, cicloId: "c1" },
  { id: "e3", empleado: USERS[4], fuente: "Rafael", departamento: "Eintriebe", estado: "Calificada", calificacion: 19, progreso: 19, cicloId: "c1" },
  { id: "e4", empleado: USERS[4], fuente: "Rafael", departamento: "KickOut", estado: "Calificada", calificacion: 55, progreso: 55, cicloId: "c1" },
  { id: "e5", empleado: USERS[4], fuente: "Pelitar", departamento: "Eintriebe", estado: "Calificada", calificacion: 90, progreso: 90, cicloId: "c1" },
  { id: "e6", empleado: USERS[4], fuente: "Rafael", departamento: "KickOut", estado: "En Curso", calificacion: 55, progreso: 55, cicloId: "c1" },
  { id: "e7", empleado: USERS[4], fuente: "Rafael", departamento: "Eintriebe", estado: "Calificada", calificacion: 55, progreso: 55, cicloId: "c1" },
  { id: "e8", empleado: USERS[4], fuente: "Pelitar", departamento: "Eintriebe", estado: "Calificada", calificacion: 95, progreso: 95, cicloId: "c1" },
  { id: "e9", empleado: USERS[4], fuente: "Rafael", departamento: "Eintriebe", estado: "En Curso", calificacion: 19, progreso: 19, cicloId: "c1" },
  { id: "e10", empleado: USERS[4], fuente: "Quitde", departamento: "Eintriebe", estado: "Calificada", calificacion: 35, progreso: 35, cicloId: "c1" },
];

export const CICLOS = [
  {
    id: "c1",
    nombre: "Ciclo Activo Q1 2026",
    fechaInicio: "Ene. 11 – Mar. 11, 2026",
    fechaFin: "2026-03-11",
    estado: "Activo" as const,
    totalEmpleados: 142,
    calificadas: 97,
    pendientes: 45,
    sinEvaluar: 23,
    pesoObjetivos: 60,
    pesoCompetencias: 40,
    escala: "360°",
    fases: [
      { nombre: "Autoevaluación", fechaInicio: "Ene. 11", fechaFin: "Feb. 11", estado: "completada" as const },
      { nombre: "Evaluación de pares", fechaInicio: "Feb. 12", fechaFin: "Mar. 11", estado: "activa" as const },
      { nombre: "Evaluación del líder", fechaInicio: "Mar. 12", fechaFin: "Abr. 12", estado: "pendiente" as const },
      { nombre: "Calibración y Cierre", fechaInicio: "Abr. 13", fechaFin: "Abr. 30", estado: "pendiente" as const },
    ],
  },
];
