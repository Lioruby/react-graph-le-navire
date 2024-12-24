import { createReducer } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { getGraphDataUsecase } from "../usecases/get-graph-data.usecase";

export const graphDataReducer = createReducer<AppState["graph"]>(
  {
    data: {
      nodes: [],
      links: [],
    },
    loading: false,
  },
  (builder) => {
    builder.addCase(getGraphDataUsecase.fulfilled, (state, action) => {
      state.data.nodes = action.payload.nodes;
      state.data.links = action.payload.links;
      state.loading = false;
    });
    builder.addCase(getGraphDataUsecase.pending, (state) => {
      state.loading = true;
    });
  }
);
