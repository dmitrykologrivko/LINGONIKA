import { useMemo } from 'react';
import { isAuthenticated } from '@/api';

export function useLoggedIn() {
  return useMemo(() => isAuthenticated(), []);
}
