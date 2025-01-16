import { useEffect, useRef } from 'react';
import { useQueryClient, AnyUseQueryOptions } from '@tanstack/react-query';

export function useInvalidateQueries(invalidationKey: string | undefined, ...queryOptions: AnyUseQueryOptions[]) {
  const queryOptionsRef = useRef(queryOptions);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryOptionsRef.current = queryOptions;
  }, [queryOptions]);

  useEffect(() => {
    if (invalidationKey) {
      queryOptionsRef.current.forEach(item => {
        queryClient.invalidateQueries({ queryKey: item.queryKey });
      });
    }
  }, [invalidationKey, queryOptionsRef, queryClient]);
}
