import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalState } from "@types";
import { Dayjs } from "dayjs";

const initialState: modalState = {
  active: undefined,
  // COLABORADOR
  nombre_colaborador: undefined,
  apellido: undefined,
  edad: undefined,
  hijos: undefined,
  nivel_educativo: undefined,
  telefono: undefined,
  barrio: undefined,
  egresos: undefined,
  peal_id: undefined,
  comienzoColaborador: null,
  finalizacionColaborador: null,
  // COLABORADOR
  // PROYECTO
  nombre_peal: undefined,
  comienzo: null,
  fin: null,
  // PROYECTO
  // EVALUACION
  nombre_evaluacion: undefined,
  comienzo_evaluacion: null,
  // EVALUACION
  // PUNTUACION
  adaptacion_cambio: undefined,
  habilidades_relacionales: undefined,
  comunicacion: undefined,
  liderazgo: undefined,
  proactividad: undefined,
  presencia: undefined,
  puntualidad: undefined,
  porcentaje_asistencia: undefined,
  trabajo_equipo: undefined,
  responsabilidad: undefined,
  rendimiento_laboral: undefined,
  // PUNTUACION
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean | undefined>) => {
      state.active = action.payload;
    },
    clearModal: (state) => {
      state.nombre_colaborador = undefined;
      state.apellido = undefined;
      state.edad = undefined;
      state.hijos = undefined;
      state.nivel_educativo = undefined;
      state.telefono = undefined;
      state.barrio = undefined;
      state.egresos = undefined;
      state.peal_id = undefined;
      state.comienzoColaborador = null;
      state.finalizacionColaborador = null;
      state.nombre_peal = undefined;
      state.comienzo = null;
      state.fin = null;
      state.nombre_evaluacion = undefined;
      state.comienzo_evaluacion = null;
      state.adaptacion_cambio = undefined;
      state.habilidades_relacionales = undefined;
      state.comunicacion = undefined;
      state.liderazgo = undefined;
      state.proactividad = undefined;
      state.presencia = undefined;
      state.puntualidad = undefined;
      state.porcentaje_asistencia = undefined;
      state.trabajo_equipo = undefined;
      state.responsabilidad = undefined;
      state.rendimiento_laboral = undefined;
    },
    // COLABORADOR
    setNombreColaborador: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.nombre_colaborador = action.payload;
    },
    setApellido: (state, action: PayloadAction<string | undefined>) => {
      state.apellido = action.payload;
    },
    setEdad: (state, action: PayloadAction<number | undefined>) => {
      state.edad = action.payload;
    },
    setHijos: (state, action: PayloadAction<number | undefined>) => {
      state.hijos = action.payload;
    },
    setNivelEducativo: (state, action: PayloadAction<string | undefined>) => {
      state.nivel_educativo = action.payload;
    },
    setTelefono: (state, action: PayloadAction<string | undefined>) => {
      state.telefono = action.payload;
    },
    setBarrio: (state, action: PayloadAction<string | undefined>) => {
      state.barrio = action.payload;
    },
    setEgresos: (state, action: PayloadAction<string | undefined>) => {
      state.egresos = action.payload;
    },
    setPealId: (state, action: PayloadAction<number | undefined>) => {
      state.peal_id = action.payload;
    },
    setComienzoColaborador: (state, action: PayloadAction<Dayjs | null>) => {
      state.comienzoColaborador = action.payload;
    },
    setFinalizacionColaborador: (
      state,
      action: PayloadAction<Dayjs | null>,
    ) => {
      state.finalizacionColaborador = action.payload;
    },
    // COLABORADOR
    // PROYECTO
    setNombrePeal: (state, action: PayloadAction<string | undefined>) => {
      state.nombre_peal = action.payload;
    },
    setComienzo: (state, action: PayloadAction<Dayjs | null>) => {
      state.comienzo = action.payload;
    },
    setFin: (state, action: PayloadAction<Dayjs | null>) => {
      state.fin = action.payload;
    },
    // PROYECTO
    // EVALUACION
    setNombreEvaluacion: (state, action: PayloadAction<string | undefined>) => {
      state.nombre_evaluacion = action.payload;
    },
    setComienzoEvaluacion: (state, action: PayloadAction<Dayjs | null>) => {
      state.comienzo_evaluacion = action.payload;
    },
    // EVALUACION
    // PUNTUACION
    setAdaptacionCambio: (state, action: PayloadAction<number | undefined>) => {
      state.adaptacion_cambio = action.payload;
    },
    setHabilidadesRelacionales: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.habilidades_relacionales = action.payload;
    },
    setComunicacion: (state, action: PayloadAction<number | undefined>) => {
      state.comunicacion = action.payload;
    },
    setLiderazgo: (state, action: PayloadAction<number | undefined>) => {
      state.liderazgo = action.payload;
    },
    setProactividad: (state, action: PayloadAction<number | undefined>) => {
      state.proactividad = action.payload;
    },
    setPresencia: (state, action: PayloadAction<number | undefined>) => {
      state.presencia = action.payload;
    },
    setPuntualidad: (state, action: PayloadAction<number | undefined>) => {
      state.puntualidad = action.payload;
    },
    setPorcentajeAsistencia: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.porcentaje_asistencia = action.payload;
    },
    setTrabajoEquipo: (state, action: PayloadAction<number | undefined>) => {
      state.trabajo_equipo = action.payload;
    },
    setResponsabilidad: (state, action: PayloadAction<number | undefined>) => {
      state.responsabilidad = action.payload;
    },
    setRendimientoLaboral: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.rendimiento_laboral = action.payload;
    },
    // PUNTUACION
  },
});

export const {
  setActive,
  clearModal,
  // COLABORADOR
  setNombreColaborador,
  setApellido,
  setEdad,
  setHijos,
  setNivelEducativo,
  setTelefono,
  setBarrio,
  setEgresos,
  setPealId,
  setComienzoColaborador,
  setFinalizacionColaborador,
  // COLABORADOR
  // PROYECTO
  setNombrePeal,
  setComienzo,
  setFin,
  // PROYECTO
  // EVALUACION
  setNombreEvaluacion,
  setComienzoEvaluacion,
  // EVALUACION
  // PUNTUACION
  setAdaptacionCambio,
  setHabilidadesRelacionales,
  setComunicacion,
  setLiderazgo,
  setProactividad,
  setPresencia,
  setPuntualidad,
  setPorcentajeAsistencia,
  setTrabajoEquipo,
  setResponsabilidad,
  setRendimientoLaboral,
  // PUNTUACION
} = modalSlice.actions;

export default modalSlice.reducer;
