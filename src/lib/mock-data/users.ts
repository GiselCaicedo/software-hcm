import { User, Company } from "@/types";

// Corrección 6: sistema multiempresa
export const MOCK_COMPANIES: Company[] = [
  { id: "emp-1", nombre: "INMOV S.A.S.", nit: "900.123.456-7" },
  { id: "emp-2", nombre: "AX MARKETING S.A.S.", nit: "900.987.654-3" },
];

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    nombre: "Sindy Caicedo",
    email: "sindy.caicedo@inmov.co",
    roles: ["th", "admin"],
    cargo: "Coordinadora de Talento Humano",
    departamento: "Talento Humano",
    nivel: "tactico",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sindy",
    fechaIngreso: "2019-03-15",
    companyId: "emp-1",
    cedula: "1.020.345.678",
    tipoContrato: "Indefinido",
  },
  {
    id: "u2",
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@inmov.co",
    roles: ["lider"],
    cargo: "Gerente de Operaciones",
    departamento: "Operaciones",
    nivel: "estrategico",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    fechaIngreso: "2018-07-01",
    companyId: "emp-1",
    cedula: "1.010.222.333",
    tipoContrato: "Indefinido",
  },
  {
    id: "u3",
    nombre: "Valentina Ríos",
    email: "valentina.rios@inmov.co",
    roles: ["lider"],
    cargo: "Jefe Comercial",
    departamento: "Comercial",
    nivel: "tactico",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
    fechaIngreso: "2020-01-15",
    companyId: "emp-1",
    cedula: "1.030.444.555",
    tipoContrato: "Indefinido",
  },
  {
    id: "u4",
    nombre: "Andrés Torres",
    email: "andres.torres@inmov.co",
    roles: ["evaluado"],
    cargo: "Analista de Operaciones",
    departamento: "Operaciones",
    nivel: "operativo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andres",
    liderId: "u2",
    fechaIngreso: "2021-05-10",
    companyId: "emp-1",
    cedula: "1.040.666.777",
    tipoContrato: "Indefinido",
  },
  {
    id: "u5",
    nombre: "Daniela Gómez",
    email: "daniela.gomez@inmov.co",
    roles: ["evaluado"],
    cargo: "Ejecutiva Comercial",
    departamento: "Comercial",
    nivel: "operativo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniela",
    liderId: "u3",
    fechaIngreso: "2022-02-28",
    companyId: "emp-1",
    cedula: "1.050.888.999",
    tipoContrato: "Indefinido",
  },
  {
    id: "u6",
    nombre: "Miguel Pereira",
    email: "miguel.pereira@inmov.co",
    roles: ["evaluado"],
    cargo: "Técnico de Soporte",
    departamento: "Tecnología",
    nivel: "operativo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
    liderId: "u2",
    fechaIngreso: "2021-11-01",
    companyId: "emp-1",
    cedula: "1.060.111.222",
    tipoContrato: "Fijo",
  },
  {
    id: "u7",
    nombre: "Laura Jiménez",
    email: "laura.jimenez@inmov.co",
    roles: ["evaluado", "lider"],
    cargo: "Coordinadora de Tecnología",
    departamento: "Tecnología",
    nivel: "tactico",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
    liderId: "u2",
    fechaIngreso: "2020-08-20",
    companyId: "emp-1",
    cedula: "1.070.333.444",
    tipoContrato: "Indefinido",
  },
  {
    id: "u8",
    nombre: "Felipe Castro",
    email: "felipe.castro@inmov.co",
    roles: ["evaluado"],
    cargo: "Asesor Comercial",
    departamento: "Comercial",
    nivel: "operativo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felipe",
    liderId: "u3",
    fechaIngreso: "2023-01-15",
    companyId: "emp-1",
    cedula: "1.080.555.666",
    tipoContrato: "Fijo",
  },
  {
    id: "u9",
    nombre: "Isabel Vargas",
    email: "isabel.vargas@inmov.co",
    roles: ["evaluado"],
    cargo: "Analista Financiero",
    departamento: "Finanzas",
    nivel: "operativo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabel",
    liderId: "u2",
    fechaIngreso: "2022-09-05",
    companyId: "emp-1",
    cedula: "1.090.777.888",
    tipoContrato: "Indefinido",
  },
  {
    id: "u10",
    nombre: "Ricardo Morales",
    email: "ricardo.morales@inmov.co",
    roles: ["lider"],
    cargo: "Director Financiero",
    departamento: "Finanzas",
    nivel: "estrategico",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
    fechaIngreso: "2017-04-10",
    companyId: "emp-1",
    cedula: "1.000.123.456",
    tipoContrato: "Indefinido",
  },
  // Corrección 6: usuario de AX MARKETING S.A.S.
  {
    id: "u11",
    nombre: "Sara Jennifer Olarte Peña",
    email: "sara.olarte@axmarketing.co",
    roles: ["evaluado"],
    cargo: "Auxiliar Administrativo",
    departamento: "Administración",
    nivel: "operativo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    fechaIngreso: "2023-06-01",
    companyId: "emp-2",
    cedula: "1.100.234.567",
    tipoContrato: "Fijo",
  },
];

export const getUserById = (id: string) => MOCK_USERS.find((u) => u.id === id);

export function getUsuariosPorCompania(companyId: string): User[] {
  return MOCK_USERS.filter((u) => u.companyId === companyId);
}

export function calcularAntiguedad(fechaIngreso: string): string {
  const inicio = new Date(fechaIngreso);
  const hoy = new Date("2026-03-22");
  const anios = Math.floor((hoy.getTime() - inicio.getTime()) / (365.25 * 24 * 3600 * 1000));
  const meses = Math.floor(
    ((hoy.getTime() - inicio.getTime()) % (365.25 * 24 * 3600 * 1000)) / (30.44 * 24 * 3600 * 1000)
  );
  if (anios === 0) return `${meses} mes${meses !== 1 ? "es" : ""}`;
  return `${anios} año${anios !== 1 ? "s" : ""}${meses > 0 ? ` ${meses} mes${meses !== 1 ? "es" : ""}` : ""}`;
}
