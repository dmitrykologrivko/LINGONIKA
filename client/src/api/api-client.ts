import axios, { AxiosInstance } from 'axios';
import {
  addAuthorizationInterceptor,
  addUnauthorizedInterceptor,
  addBadRequestInterceptor,
} from './interceptors';

export function createApiClient(
  unauthorizedHandler?: () => Promise<void>,
): AxiosInstance {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === 'production' ? window.location.href : 'http://localhost:8000',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  addAuthorizationInterceptor(apiClient);
  addUnauthorizedInterceptor(apiClient, unauthorizedHandler);
  addBadRequestInterceptor(apiClient);

  return apiClient;
}
