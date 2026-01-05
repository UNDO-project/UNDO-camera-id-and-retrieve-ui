import { AxiosError, AxiosInstance } from 'axios';

export function addRetryInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // Simple retry logic example:
      // If needed, we can expand this to retry on 503 or network errors
      // For now, we just pass through the error
      if (error.response?.status === 503 || !error.response) {
        // Placeholder for retry logic
      }
      return Promise.reject(error);
    }
  );
}
