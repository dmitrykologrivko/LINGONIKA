import { ServiceModule } from './service-module.type';
import { ServiceProvider } from './service-provider.type';

export function combineServiceModules(...modules: ServiceModule[]) {
  const providers: ServiceProvider[] = [];
  for (const module of modules) {
    providers.push(...Object.values(module));
  }
  return providers;
}
