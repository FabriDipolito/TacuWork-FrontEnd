import { configureStore } from "@reduxjs/toolkit";
import generalVariableSlice from "./slices/generalVariableSlice";
import evaluacionesSlice from "./slices/evaluacionesSlice";
import analisisSlice from "./slices/analisisSlice";
import colaboradoresSlice from "./slices/colaboradoresSlice";
import searchBoxSlice from "./slices/searchBoxSlice";
import modalSlice from "./slices/modalSlice";
import proyectosSlice from "./slices/proyectosSlice";
import participantesEvaluacionSlice from "./slices/participantesEvaluacionSlice";

const store = configureStore({
  reducer: {
    general: generalVariableSlice,
    colaborador: colaboradoresSlice,
    proyecto: proyectosSlice,
    evaluacion: evaluacionesSlice,
    participantesEvaluacion: participantesEvaluacionSlice,
    searchBox: searchBoxSlice,
    modal: modalSlice,
    analisis: analisisSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
