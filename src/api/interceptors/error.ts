import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleError(error: AxiosError): Promise<never> {
  if (error.response) {
    throw new ApiError(
      error.message,
      error.response.status,
      error.config?.url || '',
      error.response.data
    );
  }
  throw error;
}
