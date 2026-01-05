import { useServices } from './ServiceContainer';
import type {
  IIdentificationService,
  ICatalogService,
  IHealthService,
  IResultStore,
  IImageStore,
} from '@/services/interfaces';

export function useIdentificationService(): IIdentificationService {
  return useServices().identification;
}

export function useCatalogService(): ICatalogService {
  return useServices().catalog;
}

export function useHealthService(): IHealthService {
  return useServices().health;
}

export function useResultStore(): IResultStore {
  return useServices().resultStore;
}

export function useImageStore(): IImageStore {
  return useServices().imageStore;
}
