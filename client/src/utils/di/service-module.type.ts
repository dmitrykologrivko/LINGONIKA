import { ServiceProvider } from './service-provider.type';

export type ServiceModule = {
  [key: string]: ServiceProvider;
};
