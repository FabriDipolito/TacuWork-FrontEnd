/* eslint-disable prettier/prettier */

// Props

export interface ColaboradorProps {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  hijos: number;
  zona_residencial: string;
  telefono: string;
  nivel_educativo: string;
  egresos: string;
  peal_id: number;
}

export interface PealProps {
  id: number;
  nombre: string;
  comienzo: string;
  fin: string;
}

export type EvaluacionProps = {
  id: number,
  nombre: string,
  comienzo: string,
  ultima_actualizacion: string,
  peal_id: number,
};

// Props

// Estados

export type generalState = {
  colaboradores: Array<ColaboradorProps> | undefined,
  peales: Array<PealProps> | undefined,
};

export type colaboradorState = {
  colaboradorSelected: ColaboradorProps | undefined,
  pealSelected: PealProps | undefined,
};

export type proyectoState = {
  pealSelected: PealProps | undefined,
};

export type evaluacionState = {
  pealSelected: PealProps | undefined,
  evaluacionesHechas: Array<EvaluacionProps>,
};

export type searchBoxState = {
  filter: Array<string> | undefined
  filterSelected: string | undefined,
  groupFilter: Array<string> | undefined,
  groupFilterSelected: string | undefined,
  searchFilterSelected: string | undefined,
  filterArray: Array<ColaboradorProps> | Array<PealProps> | Array<EvaluacionProps> | undefined,
};

export type modalState = {
  active: boolean | undefined,
  // COLABORADOR
  nombre_colaborador: string | undefined,
  apellido: string | undefined,
  edad: number | undefined,
  hijos: number | undefined,
  nivel_educativo: string | undefined,
  telefono: string | undefined,
  barrio: string | undefined,
  egresos: string | undefined,
  peal_id: number | undefined,
  //COLABORADOR
  //PROYECTO
  nombre_peal: string | undefined,
  comienzo: string | undefined,
  fin: string | undefined,
  //PROYECTO
  //EVALUACION
  adaptacion_cambio: number | undefined,
  habilidades_relacionales: number | undefined,
  comunicacion: number | undefined,
  liderazgo: number | undefined,
  proactividad: number | undefined,
  presencia: number | undefined,
  puntualidad: number | undefined,
  porcentaje_asistencia: number | undefined,
  trabajo_equipo: number | undefined,
  responsabilidad: number | undefined,
  rendimiento_laboral: number | undefined,
  //EVALUACION
};

export type analisisState = {
  linkSelected: "TRABAJADOR" | "PROYECTO" | "COMPARACION";
  trabajadorSelected: ColaboradorProps | undefined;
  primerPealSelected: PealProps | undefined,
  segundoPealSelected: PealProps | undefined,
};

// Estados