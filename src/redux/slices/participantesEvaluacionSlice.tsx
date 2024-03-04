import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColaboradorProps,
  EvaluacionProps,
  participantesEvaluacionState,
  PealProps,
  PuntajeProps,
} from "@types";

const initialState: participantesEvaluacionState = {
  linkSelected: "PARTICIPANTES",
  colaboradorSelected: undefined,
  pealSelected: undefined,
  evaluacionSelected: undefined,
  puntajes: undefined,
};

export const participantesEvaluacionSlice = createSlice({
  name: "analisis",
  initialState,
  reducers: {
    setLinkSelected: (
      state,
      action: PayloadAction<"PARTICIPANTES" | "TABLERO">,
    ) => {
      state.linkSelected = action.payload;
    },
    setColaboradorSelected: (
      state,
      action: PayloadAction<ColaboradorProps | undefined>,
    ) => {
      state.colaboradorSelected = action.payload;
    },
    setPealSelected: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
    setEvaluacionSelected: (
      state,
      action: PayloadAction<EvaluacionProps | undefined>,
    ) => {
      state.evaluacionSelected = action.payload;
    },
    setPuntajes: (
      state,
      action: PayloadAction<Array<PuntajeProps> | undefined>,
    ) => {
      state.puntajes = action.payload;
    },
  },
});

export const {
  setLinkSelected,
  setColaboradorSelected,
  setPealSelected,
  setEvaluacionSelected,
  setPuntajes,
} = participantesEvaluacionSlice.actions;

export default participantesEvaluacionSlice.reducer;
