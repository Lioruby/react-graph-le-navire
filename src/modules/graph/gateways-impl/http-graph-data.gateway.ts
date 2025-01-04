import { AxiosInstance } from "axios";
import { IGraphDataGateway } from "../core/gateways/graph-data.gateway";
import { GraphDomainModel } from "../core/models/graph.domain-model";

export class HttpGraphDataGateway implements IGraphDataGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getData(): Promise<GraphDomainModel.GraphData> {
    const response =
      await this.httpClient.get<GraphDomainModel.GraphData>("/graph");
    console.log(response.data);
    return response.data;
  }
}
