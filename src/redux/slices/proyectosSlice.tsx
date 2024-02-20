import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PealProps, proyectoState } from "@types";

const initialState: proyectoState = {
  pealSelected: undefined,
};

export const proyectosSlice = createSlice({
  name: "proyectos",
  initialState,
  reducers: {
    setPealSelected: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
  },
});

export const { setPealSelected } = proyectosSlice.actions;

export default proyectosSlice.reducer;
