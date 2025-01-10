import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getCardsStatistics, getCardsDictionaries } from '@/api';

export function useInvalidateDashboard() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [getCardsStatistics.name],
    });
    queryClient.invalidateQueries({
      queryKey: [getCardsDictionaries.name],
    });
  }, [queryClient]);
}
