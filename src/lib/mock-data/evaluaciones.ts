import type { Evaluacion } from "@/types";
import { USERS } from "./users";

export const EVALUACIONES: Evaluacion[] = [
  { id: "e1",  empleado: USERS[2], fuente: "Autoevaluación",     departamento: "Diseño",       estado: "En Curso",  calificacion: 69, progreso: 69, cicloId: "c1", lider: USERS[6], pares: [USERS[3], USERS[4]], evaluacionesActivas: 3,  fecha: "Hoy, 4:30 PM"    },
  { id: "e2",  empleado: USERS[3], fuente: "Evaluación 360°",    departamento: "Tecnología",   estado: "En Curso",  calificacion: 90, progreso: 90, cicloId: "c1", lider: USERS[6], pares: [USERS[2], USERS[5]], evaluacionesActivas: 2,  fecha: "Hoy, 4:30 PM"    },
  { id: "e3",  empleado: USERS[4], fuente: "Evaluación de pares",departamento: "Diseño",       estado: "Calificada",calificacion: 19, progreso: 19, cicloId: "c1", lider: USERS[1], pares: [USERS[2], USERS[3]], evaluacionesActivas: 5,  fecha: "Hace 12 horas"   },
  { id: "e4",  empleado: USERS[5], fuente: "Autoevaluación",     departamento: "Tecnología",   estado: "Calificada",calificacion: 55, progreso: 55, cicloId: "c1", lider: USERS[6], pares: [USERS[0], USERS[4]], evaluacionesActivas: 4,  fecha: "Hace 14 horas"   },
  { id: "e5",  empleado: USERS[0], fuente: "Evaluación 360°",    departamento: "RRHH",         estado: "Calificada",calificacion: 90, progreso: 90, cicloId: "c1", lider: USERS[6], pares: [USERS[1], USERS[7]], evaluacionesActivas: 6,  fecha: "Ayer"            },
  { id: "e6",  empleado: USERS[7], fuente: "Evaluación de pares",departamento: "Diseño",       estado: "En Curso",  calificacion: 55, progreso: 55, cicloId: "c1", lider: USERS[1], pares: [USERS[2], USERS[4]], evaluacionesActivas: 2,  fecha: "Hace 2 días"     },
  { id: "e7",  empleado: USERS[1], fuente: "Autoevaluación",     departamento: "Tecnología",   estado: "Calificada",calificacion: 55, progreso: 55, cicloId: "c1", lider: USERS[6], pares: [USERS[3], USERS[5]], evaluacionesActivas: 1,  fecha: "Hace 9 días"     },
  { id: "e8",  empleado: USERS[4], fuente: "Evaluación 360°",    departamento: "Diseño",       estado: "Calificada",calificacion: 95, progreso: 95, cicloId: "c1", lider: USERS[6], pares: [USERS[0], USERS[7]], evaluacionesActivas: 3,  fecha: "Hace 9 días"     },
  { id: "e9",  empleado: USERS[2], fuente: "Evaluación de pares",departamento: "Diseño",       estado: "Pendiente", calificacion: 19, progreso: 19, cicloId: "c1", lider: USERS[1], pares: [USERS[5], USERS[6]], evaluacionesActivas: 0,  fecha: "Hace 10 días"    },
  { id: "e10", empleado: USERS[3], fuente: "Autoevaluación",     departamento: "Tecnología",   estado: "Enviada",   calificacion: 35, progreso: 35, cicloId: "c1", lider: USERS[6], pares: [USERS[4], USERS[7]], evaluacionesActivas: 2,  fecha: "Hace 12 días"    },
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
