import { AxiosInstance } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { createServiceModule, ServiceProvider } from '@/utils/di';
import { createApiClient } from './api-client';
import { createQueryClient } from './query-client';

export const API_CLIENT_INJECTION_TOKEN = 'api-client';
export const QUERY_CLIENT_INJECTION_TOKEN = 'query-client';

type ApiModule = {
  apiClient: ServiceProvider<AxiosInstance>;
  queryClient: ServiceProvider<QueryClient>;
};

type ApiModuleConfig = {
  unauthorizedHandler?: () => Promise<void>;
};

type ApiModuleRequiredServices = {
  config?: ApiModuleConfig;
};

export const createApiModule = createServiceModule<ApiModule, ApiModuleRequiredServices>(
  (requiredServices) => ({
    apiClient: {
      token: API_CLIENT_INJECTION_TOKEN,
      useValue: createApiClient(requiredServices.config?.unauthorizedHandler)
    },
    queryClient: {
      token: QUERY_CLIENT_INJECTION_TOKEN,
      useValue: createQueryClient()
    }
  })
);
