export type NivelJerarquico = "operativo" | "tactico" | "estrategico";

export interface Responsabilidad {
  que: string;
  como: string;
  cuando: string;
  paraQue: string;
  tipoFuncion: string;
  objetivoSMART: string;
  indicador: string;
  formulaMedicion: string;
  ponderacion: number; // suma = 1.0
}

export interface PerfilCargo {
  id: string;
  codigo: string;
  revision: number;

  // 1. Naturaleza del cargo
  denominacion: string;
  nivel: NivelJerarquico;
  reportaA: string; // cargo id del jefe directo
  area: string;

  // 2. Formación académica
  nivelAcademico: string;
  carrerasAfines: string;

  // 3. Experiencia laboral
  tiempoExperiencia: string;
  areasExperiencia: string;

  // 4. Misión del cargo
  mision: string;

  // 5. Dimensión
  personasACargo: number;
  personasQueReportanDirectamente: number;

  // 6. Responsabilidades clave
  responsabilidades: Responsabilidad[];

  // 7. Autonomía en decisiones
  autonomia: {
    autonoma: string[];
    consultada: string[];
  };

  // 8. Relaciones del cargo
  relaciones: {
    internas: { con: string; proposito: string }[];
    externas: { con: string; proposito: string }[];
  };

  // 10. Competencias adicionales (específicas del cargo)
  competenciasAdicionales: {
    nombre: string;
    definicion: string;
    comportamientos: string[];
    peso: number;
  }[];

  bandaSalarial: string;
}
