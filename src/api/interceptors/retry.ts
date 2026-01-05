import { AxiosError, AxiosInstance } from 'axios';

interface RetryConfig {
  retries: number;
  retryDelay: (retryCount: number) => number;
  shouldRetry: (error: AxiosError) => boolean;
}

const defaultConfig: RetryConfig = {
  retries: 3,
  retryDelay: (retryCount) => {
    return Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
  },
  shouldRetry: (error) => {
    // Retry on 503 Service Unavailable or network errors
    if (!error.response) return true; // Network error
    return error.response.status === 503;
  },
};

export function addRetryInterceptor(
  instance: AxiosInstance,
  config: Partial<RetryConfig> = {}
): void {
  const retryConfig = { ...defaultConfig, ...config };

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as any;

      if (!config || !retryConfig.shouldRetry(error)) {
        return Promise.reject(error);
      }

      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= retryConfig.retries) {
        return Promise.reject(error);
      }

      config.__retryCount += 1;

      const delay = retryConfig.retryDelay(config.__retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return instance(config);
    }
  );
}
