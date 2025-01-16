import { useState } from 'react';

export function useInvalidationKey() {
  const [invalidationKey, setInvalidationKey] = useState<string | undefined>(undefined);
  return {
    invalidationKey,
    invalidate: () => setInvalidationKey((performance.now() * 1e6).toString()),
  }
}
