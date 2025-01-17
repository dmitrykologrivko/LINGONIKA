import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidationError } from '@/api';
import { useAlertsManager } from './useAlertsManager';

export function useHandleMutationError() {
  const { t } = useTranslation();
  const alertsManager = useAlertsManager();

  return useCallback((error: Error | null) => {
    if (error instanceof ValidationError) {
      return;
    }

    alertsManager.addAlert({
      text: t('unableToProcessRequest', { ns: 'errors' }),
      status: 'error',
    });

    console.error(error);
  }, [alertsManager, t]);
}
