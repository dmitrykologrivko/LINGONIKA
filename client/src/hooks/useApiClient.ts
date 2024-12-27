import { AxiosInstance } from 'axios';
import { API_CLIENT_INJECTION_TOKEN } from '@/api';
import { useServiceRegistry } from '@/utils/di';

export function useApiClient() {
  const registry = useServiceRegistry()!;
  return registry.get<AxiosInstance>(API_CLIENT_INJECTION_TOKEN)!;
}
