import { InjectionToken } from './injection-token.type';

export type ServiceProvider<T = unknown> = {
  token: InjectionToken;
  useValue: T
};
