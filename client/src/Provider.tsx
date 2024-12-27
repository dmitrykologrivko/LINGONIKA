import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { ServiceRegistryProvider } from '@/utils/di';
import di from './di';
import { router } from './Router';

function Provider() {
  return (
    <ServiceRegistryProvider providers={di.serviceProviders}>
      <QueryClientProvider client={di.queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </ServiceRegistryProvider>
  );
}

export default Provider;
