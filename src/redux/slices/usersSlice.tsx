import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data, usersState } from "@types";

const initialState: usersState = {
  data: undefined,
  moduleSelected: "",
  moduleKeySelected: "",
  userSelected: ""
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<Data | undefined>
    ) => {
      state.data = action.payload;
    },
    setModuleSelected: (
      state,
      action: PayloadAction<string>
    ) => {
      state.moduleSelected = action.payload;
    },
    setModuleKeySelected: (
      state,
      action: PayloadAction<string>
    ) => {
      state.moduleKeySelected = action.payload;
    },
    setUserSelected: (
      state,
      action: PayloadAction<string>
    ) => {
      state.userSelected = action.payload;
    },
  },
});

export const {
  setData,
  setModuleSelected,
  setModuleKeySelected,
  setUserSelected
} = usersSlice.actions;

export default usersSlice.reducer;
