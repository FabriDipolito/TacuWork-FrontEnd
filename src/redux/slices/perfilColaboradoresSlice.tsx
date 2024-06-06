import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColaboradorProps, perfilState } from "@types";

const initialState: perfilState = {
  linkSelected: "PERFIL",
  colaboradorSelected: undefined,
  srcImage: null,
  banco: undefined,
  sucursal: undefined,
  numero_cuenta: undefined,
  nombre_emergencia: undefined,
  telefono_emergencia: undefined,
};

export const colaboradoresSlice = createSlice({
  name: "colaboradores",
  initialState,
  reducers: {
    setLinkSelected: (state, action: PayloadAction<"PERFIL" | "PERSONAL">) => {
      state.linkSelected = action.payload;
    },
    setColaboradorPerfil: (
      state,
      action: PayloadAction<ColaboradorProps | undefined>,
    ) => {
      state.colaboradorSelected = action.payload;
    },
    setSrcImage: (state, action: PayloadAction<string | null>) => {
      state.srcImage = action.payload;
    },
    setBanco: (state, action: PayloadAction<string | undefined | null>) => {
      state.banco = action.payload;
    },
    setSucursal: (state, action: PayloadAction<string | undefined | null>) => {
      state.sucursal = action.payload;
    },
    setNumeroCuenta: (
      state,
      action: PayloadAction<string | undefined | null>,
    ) => {
      state.numero_cuenta = action.payload;
    },
    setNombreEmergencia: (
      state,
      action: PayloadAction<string | undefined | null>,
    ) => {
      state.nombre_emergencia = action.payload;
    },
    setTelefonoEmergencia: (
      state,
      action: PayloadAction<string | undefined | null>,
    ) => {
      state.telefono_emergencia = action.payload;
    },
  },
});

export const {
  setColaboradorPerfil,
  setLinkSelected,
  setSrcImage,
  setBanco,
  setSucursal,
  setNumeroCuenta,
  setNombreEmergencia,
  setTelefonoEmergencia,
} = colaboradoresSlice.actions;

export default colaboradoresSlice.reducer;
