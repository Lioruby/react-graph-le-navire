import { InMemoryAnalyticsGateway } from "@root/modules/global/gateways-impl/in-memory-analytics.gateway";
import { LocalStorageProvider } from "@root/modules/global/providers-impl/local-storage.provider";
import { Dependencies } from "@root/modules/store/dependencies";
import { AppStore, createStore } from "@root/modules/store/store";
import axios, { AxiosInstance } from "axios";
import { HttpGraphDataGateway } from "../graph/gateways-impl/http-graph-data.gateway";

export class App {
  public dependencies: Dependencies;
  public store: AppStore;
  public httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://inner-api-04d97b97193c.herokuapp.com/",
    });
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      analyticsGateway: new InMemoryAnalyticsGateway(),
      storageProvider: new LocalStorageProvider(),
      graphDataGateway: new HttpGraphDataGateway(this.httpClient),
    };
  }
}

export const app = new App();
