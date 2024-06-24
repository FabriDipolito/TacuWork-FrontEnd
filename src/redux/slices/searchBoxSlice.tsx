import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColaboradorProps,
  EvaluacionProps,
  PealProps,
  searchBoxState,
} from "@types";
import { Dayjs } from "dayjs";

const initialState: searchBoxState = {
  filter: [],
  filterSelected: undefined,
  groupFilter: [],
  groupFilterSelected: undefined,
  searchFilterSelected: undefined,
  comienzoFilter: undefined,
  finalizacionFilter: undefined,
  filterArray: undefined,
  arrayRanking: undefined,
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
    setComienzoFilterSelected: (
      state,
      action: PayloadAction<Dayjs | null | undefined>,
    ) => {
      state.comienzoFilter = action.payload;
    },
    setFinalizacionFilterSelected: (
      state,
      action: PayloadAction<Dayjs | null | undefined>,
    ) => {
      state.finalizacionFilter = action.payload;
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
    setRankingArray: (
      state,
      action: PayloadAction<Array<ColaboradorProps> | undefined>,
    ) => {
      state.arrayRanking = action.payload;
    },
  },
});

export const {
  setFilter,
  setFilterSelected,
  setGroupFilter,
  setGroupFilterSelected,
  setSearchFilterSelected,
  setComienzoFilterSelected,
  setFinalizacionFilterSelected,
  setFilterArray,
  setRankingArray,
} = searchBoxSlice.actions;

export default searchBoxSlice.reducer;
