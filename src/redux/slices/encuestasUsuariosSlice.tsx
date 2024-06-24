import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { encuestasUsuariosState, PealProps } from "@types";

const initialState: encuestasUsuariosState = {
  id: undefined,
  pealSelected: undefined,
  nombre: undefined,
  respuesta1: undefined,
  respuesta2: undefined,
  respuesta3: undefined,
  comentario: undefined,
};

export const encuestasUsuariosSlice = createSlice({
  name: "encuestasUsuario",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number | undefined>) => {
      state.id = action.payload;
    },
    setPealSelected: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
    setNombre: (state, action: PayloadAction<string | undefined>) => {
      state.nombre = action.payload;
    },
    setRespuesta1: (
      state,
      action: PayloadAction<
        "Excelente" | "Buena" | "Regular" | "Mala" | "Muy mala" | undefined
      >,
    ) => {
      state.respuesta1 = action.payload;
    },
    setRespuesta2: (
      state,
      action: PayloadAction<
        | "Siempre"
        | "La mayor parte del tiempo"
        | "A veces"
        | "Rara vez"
        | "Nunca"
        | undefined
      >,
    ) => {
      state.respuesta2 = action.payload;
    },
    setRespuesta3: (
      state,
      action: PayloadAction<
        | "Muy positivo"
        | "Positivo"
        | "Neutral"
        | "Negativo"
        | "Muy negativo"
        | undefined
      >,
    ) => {
      state.respuesta3 = action.payload;
    },
    setComentario: (state, action: PayloadAction<string | undefined>) => {
      state.comentario = action.payload;
    },
  },
});

export const {
  setId,
  setPealSelected,
  setNombre,
  setRespuesta1,
  setRespuesta2,
  setRespuesta3,
  setComentario,
} = encuestasUsuariosSlice.actions;

export default encuestasUsuariosSlice.reducer;
