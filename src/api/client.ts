import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { handleError } from './interceptors/error';
import { addRetryInterceptor } from './interceptors/retry';

export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
}

export interface ApiClient {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

export function createApiClient(config: ApiConfig): ApiClient {
  const instance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout || 30000,
  });

  // Add interceptors
  instance.interceptors.response.use(
    (response) => response,
    (error) => handleError(error)
  );

  addRetryInterceptor(instance);

  return {
    get: instance.get,
    post: instance.post,
    delete: instance.delete,
  };
}
