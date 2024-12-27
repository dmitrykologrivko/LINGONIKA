import { useCallback } from 'react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, DefaultHeading, LogoBanner } from '@/components';
import { getLanguages } from '@/api';
import { useAsyncQuery, useApiClient, AsyncQueryConfig } from '@/hooks';
import { Language } from '@/types';

function HomePage() {
  const { t } = useTranslation();
  const apiClient = useApiClient();

  const queryFn = useCallback((config: AsyncQueryConfig)=> {
    return getLanguages({}, config.signal, apiClient);
  }, [apiClient]);

  const { data } = useAsyncQuery<Language[]>(queryFn);

  return (
    <div className='w-lvw h-lvh flex justify-center items-center flex-col border-2 border-primary text-center sm:border-4'>
      <div>{JSON.stringify(data)}</div>

      <LogoBanner/>

      <DefaultHeading>{t('heading', { ns: 'home' })}</DefaultHeading>
      <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
        {t('description', { ns: 'home' })}
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button color='primary' wide={true} variant='outline'>
          <NavLink to={'login'}>{t('signIn')}</NavLink>
        </Button>
        <Button color='primary' wide={true} variant='outline'>
          <NavLink to={'register'}>{t('signUp')}</NavLink>
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
