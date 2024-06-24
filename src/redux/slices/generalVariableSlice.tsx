import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColaboradorProps,
  EncuestaProps,
  EvaluacionProps,
  generalState,
  PealProps,
  PuntajeProps,
} from "@types";

const initialState: generalState = {
  colaboradores: [],
  peales: [],
  evaluaciones: [],
  puntajes: [],
  encuestas: [],
};

export const generalVariableSlice = createSlice({
  name: "generalVariables",
  initialState,
  reducers: {
    setColaboradores: (
      state,
      action: PayloadAction<Array<ColaboradorProps> | undefined>,
    ) => {
      state.colaboradores = action.payload;
    },
    setPeales: (state, action: PayloadAction<Array<PealProps> | undefined>) => {
      state.peales = action.payload;
    },
    setEvaluaciones: (
      state,
      action: PayloadAction<Array<EvaluacionProps> | undefined>,
    ) => {
      state.evaluaciones = action.payload;
    },
    setPuntajes: (
      state,
      action: PayloadAction<Array<PuntajeProps> | undefined>,
    ) => {
      state.puntajes = action.payload;
    },
    setEncuestas: (
      state,
      action: PayloadAction<Array<EncuestaProps> | undefined>,
    ) => {
      state.encuestas = action.payload;
    },
  },
});

export const {
  setColaboradores,
  setPeales,
  setEvaluaciones,
  setPuntajes,
  setEncuestas,
} = generalVariableSlice.actions;

export default generalVariableSlice.reducer;
