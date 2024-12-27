import { ServiceModule } from './service-module.type';

export function createServiceModule<T extends ServiceModule, K extends object = object>(
  fn: (requiredServices: K) => T
) {
  return (requiredServices: K) => fn(requiredServices);
}
