import { AppState } from "@root/modules/store/app-state";
import { GraphViewModel } from "../models/graph.view-model";
import { createSelector } from "@reduxjs/toolkit";

export const selectGraph: (state: AppState) => GraphViewModel.Graph =
  createSelector(
    (state: AppState) => state.graph,
    (graph) => ({
      data: graph.data,
      loading: graph.loading,
    })
  );
