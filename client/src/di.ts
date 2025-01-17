import { combineServiceModules } from '@/utils/di';
import { createApiModule } from '@/api';
import { createAlertsModule } from '@/utils/alerts';
import { createRouter } from './router';

const alertsModule = createAlertsModule({});
const apiModule = createApiModule({});
const router = createRouter();

export default {
  serviceProviders: combineServiceModules(alertsModule, apiModule),
  queryClient: apiModule.queryClient.useValue,
  router,
};
