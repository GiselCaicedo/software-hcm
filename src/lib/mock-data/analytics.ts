import { NineBoxPosition } from "@/types";

export const MOCK_KPIS = {
  totalEvaluados: 42,
  completados: 18,
  enProceso: 16,
  pendientes: 8,
  porcentajeAvance: 57,
  firmasPendientes: 5,
  pdiGenerados: 18,
  cumplimientoPromedio: 3.9,
};

export const MOCK_NINE_BOX: NineBoxPosition[] = [
  { usuarioId: "u4", desempeno: 3, potencial: 2, etiqueta: "Referente" },
  { usuarioId: "u5", desempeno: 2, potencial: 3, etiqueta: "Alto potencial" },
  { usuarioId: "u6", desempeno: 2, potencial: 2, etiqueta: "Colaborador clave" },
  { usuarioId: "u7", desempeno: 3, potencial: 3, etiqueta: "Estrella" },
  { usuarioId: "u8", desempeno: 1, potencial: 2, etiqueta: "Dilema" },
  { usuarioId: "u9", desempeno: 3, potencial: 2, etiqueta: "Referente" },
  { usuarioId: "u2", desempeno: 3, potencial: 3, etiqueta: "Estrella" },
  { usuarioId: "u3", desempeno: 2, potencial: 2, etiqueta: "Colaborador clave" },
];

export const MOCK_DISTRIBUCION_CALIFICACIONES = [
  { rango: "4.5 - 5.0 (Excelente)", cantidad: 8, color: "#22c55e" },
  { rango: "3.5 - 4.4 (Bueno)", cantidad: 18, color: "#3b82f6" },
  { rango: "2.5 - 3.4 (Aceptable)", cantidad: 12, color: "#f59e0b" },
  { rango: "1.5 - 2.4 (En mejora)", cantidad: 3, color: "#ef4444" },
  { rango: "1.0 - 1.4 (Insatisfactorio)", cantidad: 1, color: "#7f1d1d" },
];

export const MOCK_COMPETENCIAS_RADAR = [
  { competencia: "Orientación cliente", promedio: 3.9, esperado: 4.0 },
  { competencia: "Trabajo en equipo", promedio: 4.1, esperado: 4.0 },
  { competencia: "Comunicación", promedio: 3.5, esperado: 3.5 },
  { competencia: "Gestión resultados", promedio: 3.8, esperado: 4.0 },
  { competencia: "Adaptabilidad", promedio: 3.6, esperado: 3.5 },
  { competencia: "Pensamiento analítico", promedio: 3.7, esperado: 3.5 },
];

export const MOCK_AVANCE_POR_AREA = [
  { area: "Operaciones", completados: 8, total: 12 },
  { area: "Comercial", completados: 5, total: 10 },
  { area: "Tecnología", completados: 3, total: 8 },
  { area: "Finanzas", completados: 2, total: 7 },
  { area: "Talento Humano", completados: 0, total: 5 },
];

export const MOCK_DECRETO_1373 = [
  { empleadoId: "u8", nombre: "Felipe Castro", puntaje: 2.9, estado: "bajo_desempeno", paso: "notificacion", fechaNotificacion: "2026-03-10", fechaDescargos: "2026-03-18", diasRestantes: 0 },
];
