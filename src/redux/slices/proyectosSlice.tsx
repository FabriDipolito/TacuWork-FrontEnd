import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PealProps, proyectoState } from "@types";

const initialState: proyectoState = {
  pealSelected: undefined,
  edit: true,
};

export const proyectosSlice = createSlice({
  name: "proyectos",
  initialState,
  reducers: {
    setPealSelected: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
    setEditProyecto: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
  },
});

export const { setPealSelected, setEditProyecto } = proyectosSlice.actions;

export default proyectosSlice.reducer;
