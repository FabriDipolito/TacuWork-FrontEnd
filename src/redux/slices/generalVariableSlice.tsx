import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColaboradorProps,
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
  },
});

export const { setColaboradores, setPeales, setEvaluaciones, setPuntajes } =
  generalVariableSlice.actions;

export default generalVariableSlice.reducer;
