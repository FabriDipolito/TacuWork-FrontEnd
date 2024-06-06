import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EvaluacionProps, evaluacionState, PealProps } from "@types";

const initialState: evaluacionState = {
  pealSelected: undefined,
  evaluacionesHechas: [],
  edit: true,
};

export const evaluacionesSlice = createSlice({
  name: "evaluaciones",
  initialState,
  reducers: {
    setPealSelected: (state, action: PayloadAction<PealProps | undefined>) => {
      state.pealSelected = action.payload;
    },
    setEvaluacionesHechas: (
      state,
      action: PayloadAction<Array<EvaluacionProps>>,
    ) => {
      state.evaluacionesHechas = action.payload;
    },
    setEditEvaluacion: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
  },
});

export const { setPealSelected, setEvaluacionesHechas, setEditEvaluacion } =
  evaluacionesSlice.actions;

export default evaluacionesSlice.reducer;
