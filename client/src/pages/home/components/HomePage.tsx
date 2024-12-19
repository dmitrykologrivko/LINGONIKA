import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, DefaultHeading, LogoBanner } from '@/components';

function HomePage() {
  const { t } = useTranslation();
  return (
    <div className='w-lvw h-lvh flex justify-center items-center flex-col border-2 border-primary text-center sm:border-4'>
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
