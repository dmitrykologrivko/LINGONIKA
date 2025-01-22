import { useMemo, useRef, useEffect } from 'react';
import { AxiosError } from 'axios';
import { resolveErrorMessage } from '@/utils';

type UseHandleQueryErrorOptions = {
  throwOn400?: boolean;
  throwOn401?: boolean;
  throwOn403?: boolean;
  throwOn404?: boolean;
  throwOnAny400?: boolean;
  throwOnAny500?: boolean;
  throwOnNetworkError?: boolean;
  throwOnUnknownError?: boolean;
};

export function useHandleQueryError(error: unknown, options?: UseHandleQueryErrorOptions) {
  const optionsRef = useRef<UseHandleQueryErrorOptions | undefined>(options);

  useEffect(() => {
    function handleError(error: unknown) {
      if (!error) return;

      const opts = optionsRef.current;

      if (error instanceof AxiosError) {
        const { status, code } = error;

        if (status !== undefined) {
          const shouldThrowError =
            (status === 400 && opts?.throwOn400) ||
            (status === 401 && (opts?.throwOn401 || opts?.throwOn401 === undefined)) ||
            (status === 403 && opts?.throwOn403) ||
            (status === 404 && opts?.throwOn404) ||
            (status >= 400 && status < 500 && opts?.throwOnAny400) ||
            (status >= 500 && opts?.throwOnAny500) ||
            (code === 'ERR_NETWORK' && opts?.throwOnNetworkError);

          if (shouldThrowError) {
            throw error;
          }
        }

        if (code !== undefined) {
          if (code === 'ERR_NETWORK' && opts?.throwOnNetworkError) {
            throw error;
          }
        }
        return;
      }

      console.error(error);

      if (opts?.throwOnUnknownError) {
        throw error;
      }
    }

    handleError(error);
  }, [error]);

  return useMemo(() => resolveErrorMessage(error), [error]);
}
