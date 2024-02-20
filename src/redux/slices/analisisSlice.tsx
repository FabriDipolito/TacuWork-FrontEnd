import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { analisisState, PealProps, TrabajadorProps } from "@types";

const initialState: analisisState = {
  linkSelected: "TRABAJADOR",
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
    setTrabajadorSelected: (
      state,
      action: PayloadAction<TrabajadorProps | undefined>,
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
  setTrabajadorSelected,
  setPrimerPealSelected,
  setSegundoPealSelected,
} = analisisSlice.actions;

export default analisisSlice.reducer;
