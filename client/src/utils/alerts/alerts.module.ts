import { createServiceModule } from '../di/create-service-module.util';
import { ServiceProvider } from '../di/service-provider.type';
import { AlertsManager } from './alerts-manager.service';

export const ALERTS_MANAGER_INJECTION_TOKEN = AlertsManager;

type AlertsModule = {
  alertsManager: ServiceProvider<AlertsManager>;
};

type AlertsModuleConfig = {
  autoClearTimout?: number;
};

type AlertsModuleRequiredServices = {
  config?: AlertsModuleConfig;
}

export const createAlertsModule = createServiceModule<AlertsModule, AlertsModuleRequiredServices>((requiredServices) => ({
  alertsManager: {
    token: ALERTS_MANAGER_INJECTION_TOKEN,
    useValue: new AlertsManager(requiredServices.config?.autoClearTimout),
  }
}));
