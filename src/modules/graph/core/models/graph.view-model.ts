import { GraphDomainModel } from "./graph.domain-model";

export namespace GraphViewModel {
  export type Graph = {
    data: {
      nodes: GraphDomainModel.Node[];
      links: GraphDomainModel.Link[];
    };
    loading: boolean;
  };
}
