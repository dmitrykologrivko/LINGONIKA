import { useState } from 'react';

export type AsyncMutationResult<T> = {
  value: T | undefined;
  error: Error | unknown;
};

export function useAsyncMutation<T = any, K = any>(
  mutationFn: (arg: T) => Promise<K>,
  onSuccess?: () => Promise<void>,
  onError?: (error: Error | unknown) => Promise<void>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  async function mutate(arg: T): Promise<AsyncMutationResult<K>> {
    let value: K | undefined = undefined;
    let error: Error | unknown = undefined;

    setIsLoading(true);
    setError(null);

    try {
      value = await mutationFn(arg);
    } catch (e) {
      error = e;
      setError(error);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);

    if (!error && onSuccess) {
      await onSuccess();
    }
    if (error && onError) {
      await onError(error);
    }

    return {
      value,
      error,
    }
  }

  return {
    isLoading,
    error,
    mutate
  }
}
