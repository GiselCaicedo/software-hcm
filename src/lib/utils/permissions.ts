import { Role } from "@/types";

export const PERMISSIONS: Record<string, Role[]> = {
  "dashboard": ["admin", "th", "lider", "evaluado"],
  "competencias": ["admin", "th", "lider"],
  "objetivos": ["admin", "th", "lider", "evaluado"],
  "evaluaciones": ["admin", "th", "lider", "evaluado"],
  "evaluaciones.configuracion": ["admin", "th"],
  "evaluaciones.revision_th": ["admin", "th"],
  "evaluaciones.calificacion_lider": ["admin", "lider"],
  "evaluaciones.autocalificacion": ["evaluado"],
  "firma": ["admin", "th", "lider", "evaluado"],
  "pares": ["admin", "th", "evaluado"],
  "pdi": ["admin", "th", "lider", "evaluado"],
  "analytics": ["admin", "th", "lider"],
  "analytics.reportes": ["admin", "th"],
  "analytics.cumplimiento": ["admin", "th"],
};

export const canAccess = (permission: string, role: Role | null): boolean => {
  if (!role) return false;
  return PERMISSIONS[permission]?.includes(role) ?? false;
};

export const SIDEBAR_ITEMS = [
  {
    label: "Inicio",
    href: "/dashboard",
    icon: "LayoutDashboard",
    permission: "dashboard",
  },
  {
    label: "Evaluaciones",
    href: "/evaluaciones",
    icon: "ClipboardList",
    permission: "evaluaciones",
  },
  {
    label: "Objetivos",
    href: "/objetivos",
    icon: "Target",
    permission: "objetivos",
  },
  {
    label: "Competencias",
    href: "/competencias",
    icon: "Award",
    permission: "competencias",
  },
  {
    label: "Firma Digital",
    href: "/firma",
    icon: "PenLine",
    permission: "firma",
  },
  {
    label: "Pares 360°",
    href: "/pares",
    icon: "Users",
    permission: "pares",
  },
  {
    label: "Plan de Desarrollo",
    href: "/pdi",
    icon: "TrendingUp",
    permission: "pdi",
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: "BarChart2",
    permission: "analytics",
  },
];
