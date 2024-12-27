import { useState, useEffect, useCallback } from 'react';

export type AsyncQueryConfig = {
  signal: AbortSignal;
}

export function useAsyncQuery<T>(
  queryFn: (queryOptions: AsyncQueryConfig) => Promise<T>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);
  const [data, setData] = useState<T | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchData = useCallback(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setIsLoading(true);
    setError(null);

    queryFn({ signal })
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [queryFn]);

  const refetch = useCallback(() => {
    setShouldRefetch(prev => !prev);
  }, []);

  useEffect(fetchData, [fetchData, shouldRefetch]);

  return {
    isLoading,
    error,
    data,
    refetch
  };
}
