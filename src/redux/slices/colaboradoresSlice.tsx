import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColaboradorProps, colaboradorState, PealProps } from "@types";

const initialState: colaboradorState = {
  colaboradorSelected: undefined,
  pealSelected: undefined,
};

export const colaboradoresSlice = createSlice({
  name: "colaboradores",
  initialState,
  reducers: {
    setColaboradorSelected: (
      state,
      action: PayloadAction<ColaboradorProps | undefined>,
    ) => {
      state.colaboradorSelected = action.payload;
    },
    setPealSelected: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
  },
});

export const { setColaboradorSelected, setPealSelected } =
  colaboradoresSlice.actions;

export default colaboradoresSlice.reducer;
