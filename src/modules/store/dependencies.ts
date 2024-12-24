import { IAnalyticsGateway } from "@root/modules/global/core/gateways/analytics.gateway";
import { IStorageProvider } from "@root/modules/global/core/providers/storage.provider";
import { IGraphDataGateway } from "../graph/core/gateways/graph-data.gateway";

export type Dependencies = {
  /* PROVIDERS */
  storageProvider: IStorageProvider;

  /* GATEWAYS */
  analyticsGateway: IAnalyticsGateway;
  graphDataGateway: IGraphDataGateway;
};
