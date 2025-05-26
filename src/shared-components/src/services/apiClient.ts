// lib/axios.js
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export const baseUrl = 'cute-crayfish-currently.ngrok-free.app';

const baseConfig: AxiosRequestConfig = {
  baseURL: '/', // replace with your base API URL
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'sag',
  },
};
let axiosInstance: AxiosInstance;
export type SwaggerResponse<R> = R;

export interface ApiError {
  isSuccessful: boolean;
  message: string;
  traceId: string;
  errorCode: number;
}

interface ApiResponse {
  isSuccessful: boolean;
  message: string;
  traceId: string;
  result: unknown[];
}

export function getAxiosInstance(): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = axios.create(baseConfig);
    // Response interceptor
    axiosInstance.interceptors.response.use(
      (async (
        response: AxiosResponse<ApiResponse>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Promise<SwaggerResponse<any>> => {
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
      (error: AxiosError<ApiError>) => {
        if (error.response?.data.message) {
          const data = error.response?.data;
          return Promise.reject(data);
        } else {
          const error: ApiError = {
            errorCode: 0,
            isSuccessful: false,
            message: 'خطایی رخ داد',
            traceId: '0',
          };
          return Promise.reject(error);
        }
      }
    );
  }

  // ًًRequest interceptor
  axiosInstance.interceptors.request.use(
    async (requestConfig) => {
      return requestConfig;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
