import { PDI, SeleccionPares } from "@/types";

export const MOCK_PDI: PDI[] = [
  {
    id: "pdi1",
    evaluadoId: "u4",
    evaluacionId: "e3",
    areasFortaleza: [
      "Gestión de indicadores de servicio al cliente",
      "Capacidad de automatización de procesos",
      "Trabajo colaborativo con otras áreas",
    ],
    areasMejora: [
      "Gestión del tiempo y priorización",
      "Documentación de procesos",
      "Habilidades de presentación ejecutiva",
    ],
    feedbackIA: `## Plan de Desarrollo Individual - Andrés Torres

### Análisis de Resultados

Con base en los resultados de la Evaluación Anual 2024, Andrés demuestra un desempeño **sólido** (4.0/5.0) con fortalezas claras en orientación al cliente y capacidad técnica. Las principales áreas de mejora identificadas se concentran en competencias de gestión personal y comunicación estratégica.

### Fortalezas Identificadas

**1. Orientación al cliente (4.8/5.0)**
Andrés supera consistentemente las metas de satisfacción. Su iniciativa en implementar nuevos protocolos de atención y la automatización de clasificación de tickets demuestra pensamiento sistémico orientado al usuario final.

**2. Pensamiento analítico y resolución de problemas (4.5/5.0)**
La capacidad de identificar oportunidades de mejora en procesos y ejecutarlas con resultados medibles es una fortaleza diferenciadora para su nivel.

### Áreas de Desarrollo Prioritarias

**1. Gestión del tiempo (Brecha: 1.5 puntos)**
Se recomienda implementar metodologías de productividad personal (GTD, time-blocking) y herramientas de gestión de proyectos para mejorar la priorización de tareas.

**2. Comunicación ejecutiva (Brecha: 1.2 puntos)**
El objetivo de onboarding no se completó en parte por dificultades para gestionar hacia arriba y negociar tiempos con otras áreas. Se recomienda formación en comunicación asertiva y habilidades de influencia sin autoridad.

### Recomendaciones de Capacitación

- **Curso:** Gestión del tiempo y productividad personal - Plataforma Coursera (8 horas)
- **Taller:** Comunicación ejecutiva y presentaciones de alto impacto - Proveedor externo (16 horas)
- **Mentoring:** 6 sesiones con Carlos Mendoza sobre gestión de proyectos estratégicos

---
*Generado por IA · Requiere revisión y aprobación del Líder y TH*`,
    feedbackLider: "Andrés ha mostrado un crecimiento notable este año. Estoy de acuerdo con el plan de desarrollo propuesto, especialmente en las habilidades de comunicación que son clave para su próximo paso de carrera.",
    planAccion: [
      {
        id: "pa1",
        actividad: "Completar curso de Gestión del tiempo - Coursera",
        tipo: "formacion",
        plazo: "2026-05-31",
        responsable: "Andrés Torres",
        estado: "pendiente",
        metrica: "Certificado de finalización",
      },
      {
        id: "pa2",
        actividad: "Asistir a taller de comunicación ejecutiva",
        tipo: "formacion",
        plazo: "2026-06-30",
        responsable: "Andrés Torres + TH",
        estado: "pendiente",
        metrica: "Lista de asistencia + evaluación post-taller ≥ 4/5",
      },
      {
        id: "pa3",
        actividad: "Sesiones de mentoring con Gerente de Operaciones",
        tipo: "mentoring",
        plazo: "2026-09-30",
        responsable: "Carlos Mendoza",
        estado: "pendiente",
        metrica: "6 sesiones realizadas con acta de cada una",
      },
      {
        id: "pa4",
        actividad: "Liderar proyecto de documentación de procesos del área",
        tipo: "proyecto",
        plazo: "2026-07-31",
        responsable: "Andrés Torres",
        estado: "en_progreso",
        metrica: "100% procesos del área documentados en Confluence",
      },
    ],
    generadoEn: "2025-04-05T10:30:00Z",
    aprobadoPor: "u2",
    estado: "aprobado",
  },
];

export const MOCK_PARES: SeleccionPares[] = [
  {
    id: "sp1",
    evaluadoId: "u4",
    evaluacionId: "e1",
    sugerenciasIA: [
      {
        usuarioId: "u6",
        score: 88,
        justificacion: "Mismo departamento (Operaciones), colaboración frecuente en proyectos de soporte técnico. Nivel jerárquico similar.",
        categoria: "par",
      },
      {
        usuarioId: "u7",
        score: 82,
        justificacion: "Coordinadora de Tecnología, interacción frecuente en proyectos de automatización. Nivel táctico complementario.",
        categoria: "cliente_interno",
      },
      {
        usuarioId: "u9",
        score: 75,
        justificacion: "Analista Financiero, trabajó en proyecto de presupuestos junto a Andrés. Perspectiva cross-funcional.",
        categoria: "par",
      },
      {
        usuarioId: "u5",
        score: 71,
        justificacion: "Ejecutiva Comercial, interacción en seguimiento de clientes. Misma antigüedad aproximada en la empresa.",
        categoria: "par",
      },
    ],
    paresAprobados: ["u6", "u7", "u9"],
    estadoAprobacion: "aprobado",
    revisadoPor: "u1",
  },
];
