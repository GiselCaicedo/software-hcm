import { FirmaDigital } from "@/types";

export const MOCK_FIRMAS: FirmaDigital[] = [
  {
    id: "f1",
    evaluacionId: "e1",
    participanteId: "u4",
    nombreDocumento: "Evaluación Anual 2025 - Andrés Torres",
    estado: "pendiente",
    tipoFirmante: "colaborador",
    hashDocumento: "sha256:a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
    auditTrail: [
      {
        accion: "Documento generado",
        usuarioId: "u1",
        timestamp: "2026-03-18T09:00:00Z",
        ip: "192.168.1.10",
        dispositivo: "Chrome 120 / Windows",
      },
      {
        accion: "Documento visualizado",
        usuarioId: "u4",
        timestamp: "2026-03-18T14:30:00Z",
        ip: "192.168.1.45",
        dispositivo: "Chrome 119 / Windows",
      },
    ],
  },
  {
    id: "f2",
    evaluacionId: "e1",
    participanteId: "u5",
    nombreDocumento: "Evaluación Anual 2025 - Daniela Gómez",
    estado: "pendiente",
    tipoFirmante: "colaborador",
    hashDocumento: "sha256:b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
    auditTrail: [
      {
        accion: "Documento generado",
        usuarioId: "u1",
        timestamp: "2026-03-18T09:05:00Z",
        ip: "192.168.1.10",
        dispositivo: "Chrome 120 / Windows",
      },
    ],
  },
  {
    id: "f3",
    evaluacionId: "e2",
    participanteId: "u4",
    nombreDocumento: "Evaluación Semestral I-2025 - Andrés Torres",
    estado: "firmado",
    tipoFirmante: "colaborador",
    timestamp: "2025-08-20T11:45:00Z",
    ipMock: "192.168.1.45",
    otpUsado: "847291",
    hashDocumento: "sha256:c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    auditTrail: [
      {
        accion: "Documento generado",
        usuarioId: "u1",
        timestamp: "2025-08-19T10:00:00Z",
        ip: "192.168.1.10",
        dispositivo: "Chrome 118 / Windows",
      },
      {
        accion: "OTP enviado a email",
        usuarioId: "u4",
        timestamp: "2025-08-20T11:40:00Z",
        ip: "192.168.1.45",
        dispositivo: "Chrome 118 / MacOS",
      },
      {
        accion: "Firma electrónica completada",
        usuarioId: "u4",
        timestamp: "2025-08-20T11:45:00Z",
        ip: "192.168.1.45",
        dispositivo: "Chrome 118 / MacOS",
      },
    ],
  },
];
