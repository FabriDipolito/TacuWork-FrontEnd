import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { analisisState, PealProps, ColaboradorProps, DataProps } from "@types";

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
  trabajadorSelected: undefined,
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
    setTrabajadorSelected: (
      state,
      action: PayloadAction<ColaboradorProps | undefined>,
    ) => {
      state.trabajadorSelected = action.payload;
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
  setTrabajadorSelected,
  setPrimerPealSelected,
  setSegundoPealSelected,
} = analisisSlice.actions;

export default analisisSlice.reducer;
