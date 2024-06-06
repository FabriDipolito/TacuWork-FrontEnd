import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColaboradorProps, colaboradorState, PealProps } from "@types";

const initialState: colaboradorState = {
  colaboradorSelected: undefined,
  pealSelected: undefined,
  edit: true,
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
    setEditColaborador: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
  },
});

export const { setColaboradorSelected, setPealSelected, setEditColaborador } =
  colaboradoresSlice.actions;

export default colaboradoresSlice.reducer;
