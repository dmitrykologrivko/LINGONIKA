import { ServiceProvider } from './service-provider.type.ts';
import { InjectionToken } from './injection-token.type';
import { ServiceModule } from './service-module.type';

export class ServiceRegistry {
  private services: Map<string, unknown>;

  constructor() {
    this.services = new Map();
  }

  registerModule(module: ServiceModule) {
    this.registerProviders(Object.values(module));
  }

  registerProviders(providers: ServiceProvider[]): void {
    providers.forEach(provider => this.registerProvider(provider));
  }

  registerProvider<T>(provider: ServiceProvider<T>): void {
    this.register(provider.token, provider.useValue);
  }

  register<T>(token: InjectionToken, instance: T): void {
    this.services.set(token.toString(), instance);
  }

  get<T>(token: InjectionToken): T | undefined {
    return this.services.get(token.toString()) as T;
  }
}
