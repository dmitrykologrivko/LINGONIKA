import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { AlertsProvider } from '@/components';
import { ServiceRegistryProvider } from '@/utils/di';
import di from './di';

function Provider() {
  return (
    <ServiceRegistryProvider providers={di.serviceProviders}>
      <QueryClientProvider client={di.queryClient}>
        <AlertsProvider>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          <RouterProvider router={di.router}/>
        </AlertsProvider>
      </QueryClientProvider>
    </ServiceRegistryProvider>
  );
}

export default Provider;
