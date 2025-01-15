import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getGroups } from '@/api';

export function useInvalidateGroupsList() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [getGroups.name],
    });
  }, [queryClient]);
}
