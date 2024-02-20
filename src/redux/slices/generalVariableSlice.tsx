import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColaboradorProps, generalState, PealProps } from "@types";

const initialState: generalState = {
  colaboradores: [],
  peales: [],
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
  },
});

export const { setColaboradores, setPeales } = generalVariableSlice.actions;

export default generalVariableSlice.reducer;
