import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColaboradorProps,
  EvaluacionProps,
  PealProps,
  searchBoxState,
} from "@types";

const initialState: searchBoxState = {
  filter: [],
  filterSelected: undefined,
  groupFilter: [],
  groupFilterSelected: undefined,
  searchFilterSelected: undefined,
  filterArray: undefined,
};

export const searchBoxSlice = createSlice({
  name: "searchBox",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Array<string> | undefined>) => {
      state.filter = action.payload;
    },
    setFilterSelected: (state, action: PayloadAction<string | undefined>) => {
      state.filterSelected = action.payload;
    },
    setGroupFilter: (
      state,
      action: PayloadAction<Array<string> | undefined>,
    ) => {
      state.groupFilter = action.payload;
    },
    setGroupFilterSelected: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.groupFilterSelected = action.payload;
    },
    setSearchFilterSelected: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.searchFilterSelected = action.payload;
    },
    setFilterArray: (
      state,
      action: PayloadAction<
        | Array<ColaboradorProps>
        | Array<PealProps>
        | Array<EvaluacionProps>
        | undefined
      >,
    ) => {
      state.filterArray = action.payload;
    },
  },
});

export const {
  setFilter,
  setFilterSelected,
  setGroupFilter,
  setGroupFilterSelected,
  setSearchFilterSelected,
  setFilterArray,
} = searchBoxSlice.actions;

export default searchBoxSlice.reducer;
