import { configureStore } from "@reduxjs/toolkit";
import generalVariableSlice from "./slices/generalVariableSlice";
import evaluacionesSlice from "./slices/evaluacionesSlice";
import analisisSlice from "./slices/analisisSlice";
import colaboradoresSlice from "./slices/colaboradoresSlice";
import searchBoxSlice from "./slices/searchBoxSlice";
import modalSlice from "./slices/modalSlice";
import proyectosSlice from "./slices/proyectosSlice";
import participantesEvaluacionSlice from "./slices/participantesEvaluacionSlice";
import perfilColaboradoresSlice from "./slices/perfilColaboradoresSlice";
import perfilProyectoSlice from "./slices/perfilProyectosSlice";
import modalDeleteSlice from "./slices/modalDeleteSlice";

const store = configureStore({
  reducer: {
    general: generalVariableSlice,
    colaborador: colaboradoresSlice,
    proyecto: proyectosSlice,
    evaluacion: evaluacionesSlice,
    perfil: perfilColaboradoresSlice,
    perfilProyecto: perfilProyectoSlice,
    participantesEvaluacion: participantesEvaluacionSlice,
    searchBox: searchBoxSlice,
    modal: modalSlice,
    modalDelete: modalDeleteSlice,
    analisis: analisisSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
