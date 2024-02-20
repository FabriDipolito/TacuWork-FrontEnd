import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EvaluacionProps, evaluacionState, PealProps } from "@types";

const initialState: evaluacionState = {
  pealSelected: undefined,
  evaluacionesHechas: [],
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
  },
});

export const { setPealSelected, setEvaluacionesHechas } =
  evaluacionesSlice.actions;

export default evaluacionesSlice.reducer;
