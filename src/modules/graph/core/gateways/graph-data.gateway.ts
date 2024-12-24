import { GraphDomainModel } from "@root/modules/graph/core/models/graph.domain-model";

export interface IGraphDataGateway {
  getData(): Promise<GraphDomainModel.GraphData>;
}
