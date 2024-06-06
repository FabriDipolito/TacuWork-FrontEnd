import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  analisisState,
  PealProps,
  ColaboradorProps,
  DataProps,
  LineProps,
} from "@types";

const initialState: analisisState = {
  linkSelected: "TRABAJADOR",
  keyArray: [],
  radarData: [
    {
      criterio: "Adaptacion al Cambio",
    },
    {
      criterio: "Habilidades Relacionales",
    },
    {
      criterio: "Comunicacion",
    },
    {
      criterio: "Liderazgo",
    },
    {
      criterio: "Proactividad",
    },
    {
      criterio: "Responsabilidades",
    },
    {
      criterio: "Trabajo en Equipo",
    },
    {
      criterio: "% de Asistencias",
    },
    {
      criterio: "Presencia",
    },
    {
      criterio: "Puntualidad",
    },
    {
      criterio: "Rendimiento Laboral",
    },
  ],
  lineData: [],
  promedioGeneral: undefined,
  promedioGeneral2: undefined,
  caracteristicaMejor: undefined,
  caracteristicaPeor: undefined,
  trabajadorSelected: undefined,
  proyectoPealSelected: undefined,
  primerPealSelected: undefined,
  segundoPealSelected: undefined,
};

export const analisisSlice = createSlice({
  name: "analisis",
  initialState,
  reducers: {
    setLinkSelected: (
      state,
      action: PayloadAction<"TRABAJADOR" | "PROYECTO" | "COMPARACION">,
    ) => {
      state.linkSelected = action.payload;
    },
    setRadarData: (state, action: PayloadAction<Array<DataProps>>) => {
      state.radarData = action.payload;
    },
    setRadarKey: (state, action: PayloadAction<Array<string>>) => {
      state.keyArray = action.payload;
    },
    setLineData: (state, action: PayloadAction<Array<LineProps>>) => {
      state.lineData = action.payload;
    },
    setPromedioGeneral: (state, action: PayloadAction<number>) => {
      state.promedioGeneral = action.payload;
    },
    setPromedioGeneral2: (state, action: PayloadAction<number>) => {
      state.promedioGeneral2 = action.payload;
    },
    setCaracteristicaMejor: (
      state,
      action: PayloadAction<{ nombre: string; valor: number }>,
    ) => {
      state.caracteristicaMejor = action.payload;
    },
    setCaracteristicaPeor: (
      state,
      action: PayloadAction<{ nombre: string; valor: number }>,
    ) => {
      state.caracteristicaPeor = action.payload;
    },
    setTrabajadorSelected: (
      state,
      action: PayloadAction<ColaboradorProps | undefined>,
    ) => {
      state.trabajadorSelected = action.payload;
    },
    setProyectoPealSelected: (
      state,
      action: PayloadAction<PealProps | undefined>,
    ) => {
      state.proyectoPealSelected = action.payload;
    },
    setPrimerPealSelected: (
      state,
      action: PayloadAction<PealProps | undefined>,
    ) => {
      state.primerPealSelected = action.payload;
    },
    setSegundoPealSelected: (
      state,
      action: PayloadAction<PealProps | undefined>,
    ) => {
      state.segundoPealSelected = action.payload;
    },
  },
});

export const {
  setLinkSelected,
  setRadarData,
  setRadarKey,
  setLineData,
  setPromedioGeneral,
  setPromedioGeneral2,
  setCaracteristicaMejor,
  setCaracteristicaPeor,
  setTrabajadorSelected,
  setProyectoPealSelected,
  setPrimerPealSelected,
  setSegundoPealSelected,
} = analisisSlice.actions;

export default analisisSlice.reducer;
