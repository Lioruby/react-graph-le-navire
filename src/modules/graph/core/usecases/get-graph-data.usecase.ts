import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const getGraphDataUsecase = createAppAsyncThunk(
  "graphData/getGraphData",
  async (_, { extra }) => {
    const { graphDataGateway } = extra;

    const graphData = await graphDataGateway.getData();

    return graphData;
  }
);
