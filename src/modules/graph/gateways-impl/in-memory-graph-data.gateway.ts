import { GraphDomainModel } from "@root/modules/graph/core/models/graph.domain-model";
import { IGraphDataGateway } from "@root/modules/graph/core/gateways/graph-data.gateway";

export class InMemoryGraphDataGateway implements IGraphDataGateway {
  async getData(): Promise<GraphDomainModel.GraphData> {
    return {
      nodes: [
        {
          id: "1",
          name: "Node 1",
        },
        {
          id: "2",
          name: "Node 2",
        },
      ],
      links: [
        {
          source: "1",
          target: "2",
        },
        {
          source: "2",
          target: "1",
        },
      ],
    };
  }
}
