import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColaboradorProps,
  EvaluacionProps,
  modalDeleteState,
  PealProps,
  PuntajeProps,
} from "@types";

const initialState: modalDeleteState = {
  active: undefined,
  colaboradorSelected: undefined,
  pealSelected: undefined,
  evaluacionSelected: undefined,
  puntajeSelected: undefined,
};

export const modalSlice = createSlice({
  name: "modalDelete",
  initialState,
  reducers: {
    setActiveDelete: (state, action: PayloadAction<boolean | undefined>) => {
      state.active = action.payload;
    },
    setColaborador: (
      state,
      action: PayloadAction<ColaboradorProps | undefined>,
    ) => {
      state.colaboradorSelected = action.payload;
    },
    setPeal: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
    setEvaluacion: (
      state,
      action: PayloadAction<EvaluacionProps | undefined>,
    ) => {
      state.evaluacionSelected = action.payload;
    },
    setPuntaje: (state, action: PayloadAction<PuntajeProps | undefined>) => {
      state.puntajeSelected = action.payload;
    },
  },
});

export const {
  setActiveDelete,
  setColaborador,
  setPeal,
  setEvaluacion,
  setPuntaje,
} = modalSlice.actions;

export default modalSlice.reducer;
