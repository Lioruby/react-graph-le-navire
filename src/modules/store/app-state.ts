import { GraphDomainModel } from "@root/modules/graph/core/models/graph.domain-model";

export interface AppState {
  graph: {
    data: {
      nodes: GraphDomainModel.Node[];
      links: GraphDomainModel.Link[];
    };
    loading: boolean;
  };
}
