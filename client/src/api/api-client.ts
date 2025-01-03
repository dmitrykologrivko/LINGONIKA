import axios, { AxiosInstance } from 'axios';
import {
  addAuthorizationInterceptor,
  addUnauthorizedInterceptor,
  addBadRequestInterceptor,
} from './interceptors';

export function createApiClient(): AxiosInstance {
  const apiClient = axios.create({
    //baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000',
    baseURL: 'http://localhost:8000',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  addAuthorizationInterceptor(apiClient);
  addUnauthorizedInterceptor(apiClient);
  addBadRequestInterceptor(apiClient);

  return apiClient;
}
