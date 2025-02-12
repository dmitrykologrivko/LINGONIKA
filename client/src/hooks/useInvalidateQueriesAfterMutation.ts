import { useEffect, useRef } from 'react';
import {
  useQueryClient,
  AnyUseQueryOptions,
  useMutationState,
} from '@tanstack/react-query';

export function useInvalidateQueriesAfterMutation(mutationKey: string, ...queryOptions: AnyUseQueryOptions[]) {
  const queryOptionsRef = useRef(queryOptions);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryOptionsRef.current = queryOptions;
  }, [queryOptions]);

  const mutationData = useMutationState({
    filters: {
      mutationKey: [mutationKey],
      status: 'success',
    },
  });

  const mutationDataLength = mutationData?.length || 0;
  const prevLengthRef = useRef(mutationDataLength);

  useEffect(() => {
    if (mutationDataLength > 0 && mutationDataLength !== prevLengthRef.current) {
      queryOptionsRef.current.forEach(item => {
        queryClient.invalidateQueries({ queryKey: item.queryKey });
      });

      prevLengthRef.current = mutationDataLength;
    }
  }, [mutationDataLength, queryClient]);
}
