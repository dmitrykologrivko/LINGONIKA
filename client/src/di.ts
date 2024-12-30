import { combineServiceModules } from '@/utils/di';
import { createApiModule } from '@/api';
import { createRouter } from './router';

const apiModule = createApiModule({});
const router = createRouter();

export default {
  serviceProviders: combineServiceModules([apiModule]),
  queryClient: apiModule.queryClient.useValue,
  router,
};
