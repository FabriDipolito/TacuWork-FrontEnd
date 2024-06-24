import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataBarProps, DataPieProps, encuestasState, PealProps } from "@types";

const initialState: encuestasState = {
  barData: [
    {
      respuesta: "Muy mala",
      darkRed: 0,
      red: 0,
      lightRed: 0,
      orange: 0,
      lightOrange: 0,
      yellow: 0,
      lightLime: 0,
      lime: 0,
      lightGreen: 0,
      green: 0,
      darkGreen: 0,
    },
    {
      respuesta: "Mala",
      darkRed: 0,
      red: 0,
      lightRed: 0,
      orange: 0,
      lightOrange: 0,
      yellow: 0,
      lightLime: 0,
      lime: 0,
      lightGreen: 0,
      green: 0,
      darkGreen: 0,
    },
    {
      respuesta: "Regular",
      darkRed: 0,
      red: 0,
      lightRed: 0,
      orange: 0,
      lightOrange: 0,
      yellow: 0,
      lightLime: 0,
      lime: 0,
      lightGreen: 0,
      green: 0,
      darkGreen: 0,
    },
    {
      respuesta: "Buena",
      darkRed: 0,
      red: 0,
      lightRed: 0,
      orange: 0,
      lightOrange: 0,
      yellow: 0,
      lightLime: 0,
      lime: 0,
      lightGreen: 0,
      green: 0,
      darkGreen: 0,
    },
    {
      respuesta: "Excelente",
      darkRed: 0,
      red: 0,
      lightRed: 0,
      orange: 0,
      lightOrange: 0,
      yellow: 0,
      lightLime: 0,
      lime: 0,
      lightGreen: 0,
      green: 0,
      darkGreen: 0,
    },
  ],
  pie1Data: [
    {
      id: "brown",
      label: "brown",
      value: 0,
    },
    {
      id: "Nunca",
      label: "Nunca",
      value: 0,
    },
    {
      id: "A veces",
      label: "A veces",
      value: 0,
    },
    {
      id: "Rara vez",
      label: "Rara vez",
      value: 0,
    },
    {
      id: "Siempre",
      label: "Siempre",
      value: 0,
    },
    {
      id: "La mayor parte del tiempo",
      label: "La mayor parte del tiempo",
      value: 0,
    },
  ],
  pie2Data: [
    {
      id: "brown",
      label: "brown",
      value: 0,
    },
    {
      id: "Muy negativo",
      label: "Muy negativo",
      value: 0,
    },
    {
      id: "Neutral",
      label: "Neutral",
      value: 0,
    },
    {
      id: "Negativo",
      label: "Negativo",
      value: 0,
    },
    {
      id: "Muy positivo",
      label: "Muy positivo",
      value: 0,
    },
    {
      id: "Positivo",
      label: "Positivo",
      value: 0,
    },
  ],
  pealSelected: undefined,
  active: false,
};

export const encuestasSlice = createSlice({
  name: "encuestas",
  initialState,
  reducers: {
    setBarData: (state, action: PayloadAction<Array<DataBarProps>>) => {
      state.barData = action.payload;
    },
    setPie1Data: (state, action: PayloadAction<Array<DataPieProps>>) => {
      state.pie1Data = action.payload;
    },
    setPie2Data: (state, action: PayloadAction<Array<DataPieProps>>) => {
      state.pie2Data = action.payload;
    },
    setPealSelected: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
  },
});

export const {
  setBarData,
  setPie1Data,
  setPie2Data,
  setPealSelected,
  setActive,
} = encuestasSlice.actions;

export default encuestasSlice.reducer;
