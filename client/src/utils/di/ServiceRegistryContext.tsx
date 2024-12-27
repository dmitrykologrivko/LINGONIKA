import { createContext, useContext, PropsWithChildren } from 'react';
import { ServiceRegistry } from './service-registry.service';
import { ServiceProvider } from './service-provider.type';

const ServiceRegistryContext = createContext<ServiceRegistry | undefined>(undefined);

export const useServiceRegistry = () => useContext(ServiceRegistryContext);

type ServiceRegistryProviderProps = {
  providers: ServiceProvider[];
} & PropsWithChildren;

export const ServiceRegistryProvider = (
  { children, providers }: ServiceRegistryProviderProps
) => {
  const registry = new ServiceRegistry();
  registry.registerProviders(providers);

  return (
    <ServiceRegistryContext.Provider value={registry}>
      {children}
    </ServiceRegistryContext.Provider>
  );
};
