import { AppState } from "@root/modules/store/app-state";
import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { getGraphData } from "./get-graph-data.usecase";

describe("Get Graph Data Usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let appState: AppState;

  beforeEach(() => {
    store = createTestStore({
      initialState: {
        graph: {
          data: {
            nodes: [],
            links: [],
          },
          loading: false,
        },
      },
    });
    dispatch = store.dispatch;
    appState = store.getState();
  });

  test("Initially, the graph data is empty", () => {
    expect(appState.graph.data.nodes).toEqual([]);
    expect(appState.graph.data.links).toEqual([]);
  });

  it("should get the graph data", async () => {
    await dispatch(getGraphData());

    appState = store.getState();

    expect(appState.graph.data.nodes).toEqual([
      {
        id: "1",
        name: "Node 1",
      },
      {
        id: "2",
        name: "Node 2",
      },
    ]);
    expect(appState.graph.data.links).toEqual([
      {
        source: "1",
        target: "2",
      },
      {
        source: "2",
        target: "1",
      },
    ]);
  });

  it("should handle the loading state", async () => {
    appState = store.getState();

    expect(appState.graph.loading).toBe(false);

    const promise = dispatch(getGraphData());

    appState = store.getState();

    expect(appState.graph.loading).toBe(true);

    await promise;

    appState = store.getState();

    expect(appState.graph.loading).toBe(false);
  });
});
