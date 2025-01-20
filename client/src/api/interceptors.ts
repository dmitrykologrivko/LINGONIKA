import { AxiosInstance } from 'axios';
import { translate, capitalizeFirstLetter } from '@/utils';
import { BadRequestApiError } from './types';
import { ValidationError } from './validation.error';
import { getAuthenticationToken, clearAuthenticationToken } from './utils';

export function addAuthorizationInterceptor(apiClient: AxiosInstance) {
  apiClient.interceptors.request.use(
    (config) => {
      const accessToken = getAuthenticationToken();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => error
  );
}

export function addUnauthorizedInterceptor(
  apiClient: AxiosInstance,
  unauthorizedHandler?: () => Promise<void>,
) {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const statusCode = error.response?.status;
      if (statusCode !== 401) {
        return Promise.reject(error);
      }

      clearAuthenticationToken();
      if (unauthorizedHandler) {
        await unauthorizedHandler();
      }

      return Promise.reject(error);
    }
  );
}

export function addBadRequestInterceptor(apiClient: AxiosInstance) {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error.response?.status;
      if (statusCode !== 400) {
        return Promise.reject(error);
      }

      const data = error.response?.data as BadRequestApiError;
      const validationError = new ValidationError();

      for (const message of data.message) {
        const messages: string[] = [];
        for (const constraint of Object.keys(message.constraints)) {
          messages.push(
            translate(constraint, { ns: 'apiErrors' }) || capitalizeFirstLetter(message.constraints[constraint])
          );
        }

        const fieldName = message.property === 'nonFieldErrors'
          ? 'root'
          : message.property;
        validationError.fieldErrors[fieldName] = {
          type: 'api-error',
          message: messages.join(', '),
        };
      }

      return Promise.reject(validationError);
    }
  );
}
