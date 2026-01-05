import { createApiClient } from '@/api';
import { RestIdentificationService } from './implementations/rest/RestIdentificationService';
import { RestCatalogService } from './implementations/rest/RestCatalogService';
import { RestHealthService } from './implementations/rest/RestHealthService';
import { BrowserImageStore } from './implementations/storage/BrowserImageStore';
import { NoOpResultStore } from './implementations/storage/NoOpResultStore';
import {
  MockIdentificationService,
  MockCatalogService,
  MockHealthService,
} from './implementations/mock';
import type {
  IIdentificationService,
  ICatalogService,
  IHealthService,
  IResultStore,
  IImageStore,
} from './interfaces';

export interface Services {
  identification: IIdentificationService;
  catalog: ICatalogService;
  health: IHealthService;
  resultStore: IResultStore;
  imageStore: IImageStore;
}

export interface ServiceConfig {
  apiBaseUrl: string;
  useMocks?: boolean;
}

export function createServices(config: ServiceConfig): Services {
  if (config.useMocks) {
    return {
      identification: new MockIdentificationService(),
      catalog: new MockCatalogService(),
      health: new MockHealthService(),
      resultStore: new NoOpResultStore(),
      imageStore: new BrowserImageStore(),
    };
  }

  const apiClient = createApiClient({ baseUrl: config.apiBaseUrl });

  return {
    identification: new RestIdentificationService(apiClient),
    catalog: new RestCatalogService(apiClient),
    health: new RestHealthService(apiClient),
    resultStore: new NoOpResultStore(),
    imageStore: new BrowserImageStore(),
  };
}
