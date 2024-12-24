import { AppState } from "@root/modules/store/app-state";
import { AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { selectGraph } from "./graph-data.selector";

describe("Graph Data Selector", () => {
  let state: AppState;
  let store: AppStore;

  beforeEach(() => {
    store = createTestStore({
      initialState: {
        graph: {
          data: { nodes: [], links: [] },
          loading: false,
        },
      },
    });
    state = store.getState();
  });

  it("should select the graph data", () => {
    const graph = selectGraph(state);

    expect(graph.data.nodes).toEqual([]);
    expect(graph.data.links).toEqual([]);
    expect(graph.loading).toEqual(false);
  });
});
