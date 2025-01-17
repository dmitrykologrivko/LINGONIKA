import { AlertsManager } from '@/utils/alerts';
import { useServiceRegistry } from '@/utils/di';

export function useAlertsManager() {
  const serviceRegistry = useServiceRegistry()!;
  return serviceRegistry.get<AlertsManager>(AlertsManager)!;
}
