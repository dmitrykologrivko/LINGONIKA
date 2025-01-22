import { AxiosError } from 'axios';
import { translate } from './translate.util';

export function resolveErrorMessage(error: unknown) {
  if (error instanceof AxiosError && error.status) {
    const { status } = error;

    const errorMappings: Record<number, { messageKey: string; }> = {
      400: { messageKey: 'invalidRequest' },
      401: { messageKey: 'authenticationRequired' },
      403: { messageKey: 'accessDenied' },
      404: { messageKey: 'notFound' },
    };

    if (errorMappings[status]) {
      return translate(errorMappings[status].messageKey, { ns: 'errors' });
    }
    if (status >= 400 && status < 500) {
      return `${translate('unableToProcessRequest', { ns: 'errors' })} (HTTP Code ${status})`;
    }
    if (status >= 500) {
      return `${translate('serverError', { ns: 'errors' })} (HTTP Code ${status})`;
    }
  }

  if (error instanceof AxiosError && error.code) {
    if (error.code === 'ERR_NETWORK') {
      return translate('networkError', { ns: 'errors' });
    }
  }

  return translate('unknownError', { ns: 'errors' });
}
