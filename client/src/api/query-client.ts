import { AxiosError } from 'axios';
import { QueryClient } from '@tanstack/react-query';

const MAX_RETRIES = 2;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (failureCount === MAX_RETRIES) {
            return false;
          }

          if (error instanceof AxiosError) {
            const { status } = error;
            if (status && status < 500) {
              return false;
            }
          }

          return true;
        },
      },
    },
  });
}
