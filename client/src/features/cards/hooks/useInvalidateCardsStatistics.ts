import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getCardsStatistics } from '@/api';

export function useInvalidateCardsStatistics() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [getCardsStatistics.name],
    });
  }, [queryClient]);
}
