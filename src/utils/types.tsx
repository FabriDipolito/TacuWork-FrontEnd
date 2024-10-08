/* eslint-disable prettier/prettier */

import { Dayjs } from "dayjs";

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
  imagen: string | null;
  banco?: string;
  sucursal?: string;
  numero_cuenta?: string;
  nombre_emergencia?: string;
  telefono_emergencia?: string;
  comienzo?: string;
  finalizacion?: string;
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

export type PuntajeProps = {
  colaborador_id: number,
  evaluacion_id: number,
  adaptacion_al_cambio: number | undefined,
  habilidades_relacionales: number | undefined,
  comunicacion: number | undefined,
  liderazgo: number | undefined,
  proactividad: number | undefined,
  presencia: number | undefined,
  puntualidad: number | undefined,
  porcentaje_asistencia: number | undefined,
  trabajo_en_equipo: number | undefined,
  responsabilidades: number | undefined,
  rendimiento_laboral: number | undefined,
  [key: string]: number | undefined,
};

export type EncuestaProps = {
  id: number,
  respuesta1: string | undefined,
  respuesta2: string | undefined,
  respuesta3: string | undefined,
  comentario: string | undefined,
  peal_id: number | undefined,
  nombre: string | undefined,
};

// Props

// Estados

export type generalState = {
  colaboradores: Array<ColaboradorProps> | undefined,
  peales: Array<PealProps> | undefined,
  evaluaciones: Array<EvaluacionProps> | undefined,
  puntajes: Array<PuntajeProps> | undefined,
  encuestas: Array<EncuestaProps> | undefined,
};

export type colaboradorState = {
  colaboradorSelected: ColaboradorProps | undefined,
  pealSelected: PealProps | undefined,
  edit: boolean;
};

export type proyectoState = {
  pealSelected: PealProps | undefined,
  edit: boolean;
};

export type evaluacionState = {
  pealSelected: PealProps | undefined,
  evaluacionesHechas: Array<EvaluacionProps>,
  edit: boolean;
};

export interface DataBarProps {
  respuesta: string;
  darkRed: number;
  red: number;
  lightRed: number;
  orange: number;
  lightOrange: number;
  yellow: number;
  lightLime: number;
  lime: number;
  lightGreen: number;
  green: number;
  darkGreen: number;
}

export interface DataPieProps {
  id: string;
  label: string;
  value: number;
}

export type encuestasState = {
  barData: Array<DataBarProps>;
  pie1Data: Array<DataPieProps>;
  pie2Data: Array<DataPieProps>;
  pealSelected: PealProps | undefined,
  active: boolean;
};

export type encuestasUsuariosState = {
  id: number | undefined;
  pealSelected: PealProps | undefined,
  nombre: string | undefined,
  respuesta1: "Excelente" | "Buena" | "Regular" | "Mala" | "Muy mala" | undefined;
  respuesta2: "Siempre" | "La mayor parte del tiempo" | "A veces" | "Rara vez" | "Nunca" | undefined;
  respuesta3: "Muy positivo" | "Positivo" | "Neutral" | "Negativo" | "Muy negativo" | undefined;
  comentario: string | undefined;
};

export type participantesEvaluacionState = {
  colaboradorSelected: ColaboradorProps | undefined,
  pealSelected: PealProps | undefined;
  evaluacionSelected: EvaluacionProps | undefined,
  puntajes: Array<PuntajeProps> | undefined,
};

export type perfilState = {
  linkSelected: "PERFIL" | "PERSONAL";
  colaboradorSelected: ColaboradorProps | undefined,
  srcImage: string | null,
  banco: string | undefined | null,
  sucursal: string| undefined | null,
  numero_cuenta: string | undefined | null,
  nombre_emergencia: string | undefined | null,
  telefono_emergencia: string | undefined | null,
};

export type perfilProyectoState = {
  linkSelected: "PROYECTO" | "PARTICIPANTES";
  pealSelected: PealProps | undefined,
};

export type searchBoxState = {
  filter: Array<string> | undefined
  filterSelected: string | undefined,
  groupFilter: Array<string> | undefined,
  groupFilterSelected: string | undefined,
  searchFilterSelected: string | undefined,
  comienzoFilter?: Dayjs | null,
  finalizacionFilter?: Dayjs | null,
  filterArray: Array<ColaboradorProps> | Array<PealProps> | Array<EvaluacionProps> | undefined,
  arrayRanking: Array<ColaboradorProps> | undefined,
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
  comienzoColaborador: Dayjs | null,
  finalizacionColaborador: Dayjs | null,
  //COLABORADOR
  //PROYECTO
  nombre_peal: string | undefined,
  comienzo: Dayjs | null,
  fin: Dayjs | null,
  //PROYECTO
  //EVALUACION
  nombre_evaluacion: string | undefined,
  comienzo_evaluacion: Dayjs | null,
  //EVALUACION
  //PUNTUACION
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
  //PUNTUACION
};

export type modalDeleteState = {
  active: boolean | undefined,
  colaboradorSelected: ColaboradorProps | undefined,
  pealSelected: PealProps | undefined,
  evaluacionSelected: EvaluacionProps | undefined,
  puntajeSelected: PuntajeProps | undefined,
};

export interface DataProps {
  criterio: string;
  [key: string]: any;
}

export interface LineProps {
  id: string;
  color: string;
  data: Array<{x: string, y: number}>;
}

export type analisisState = {
  linkSelected: "TRABAJADOR" | "PROYECTO" | "COMPARACION";
  radarData: Array<DataProps>;
  keyArray: Array<string>;
  lineData: Array<LineProps>;
  promedioGeneral: number | undefined;
  promedioGeneral2: number | undefined;
  caracteristicaMejor: { nombre: string, valor: number } | undefined;
  caracteristicaPeor: { nombre: string, valor: number } | undefined;
  trabajadorSelected: ColaboradorProps | undefined;
  proyectoPealSelected: PealProps | undefined;
  primerPealSelected: PealProps | undefined;
  segundoPealSelected: PealProps | undefined;
  modalActive: boolean | undefined;
  comentario: string | undefined;
};

export type dataColaboradorDelete = {
  deleted_ids: number[],
}

export type dataPealDelete = {
  deleted_ids: number[],
}

export type dataEvaluacionDelete = {
  deleted_ids: number[],
}

export type dataPuntajeDelete = {

    deleted_records: { colaborador_id: number, evaluacion_id: number }[],
    message: string,

}

// Estados