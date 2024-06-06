import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PealProps, perfilProyectoState } from "@types";

const initialState: perfilProyectoState = {
  linkSelected: "PROYECTO",
  pealSelected: undefined,
};

export const perfilProyectoSlice = createSlice({
  name: "perfilProyecto",
  initialState,
  reducers: {
    setLinkSelected: (
      state,
      action: PayloadAction<"PROYECTO" | "PARTICIPANTES">,
    ) => {
      state.linkSelected = action.payload;
    },
    setProyectoPerfil: (
      state,
      action: PayloadAction<PealProps | undefined>,
    ) => {
      state.pealSelected = action.payload;
    },
  },
});

export const { setProyectoPerfil, setLinkSelected } =
  perfilProyectoSlice.actions;

export default perfilProyectoSlice.reducer;
