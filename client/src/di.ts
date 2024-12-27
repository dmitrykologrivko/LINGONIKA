import { combineServiceModules } from '@/utils/di';
import { createApiModule } from '@/api';

const apiModule = createApiModule({});

export default {
  serviceProviders: combineServiceModules([apiModule]),
  queryClient: apiModule.queryClient.useValue,
};
