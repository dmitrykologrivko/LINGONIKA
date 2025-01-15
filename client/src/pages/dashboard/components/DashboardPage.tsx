import { useCallback, useState, ReactElement } from 'react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Heading1, Heading3 } from '@/components';
import { usePageTitle } from '@/hooks';
import {
  CardsStatistics,
  CardsDictionaries,
  useInvalidateDashboard,
} from '@/features/dashboard';
import { CardFormModal } from '@/features/cards';

function DashboardPage() {
  const [shouldShowCardForm, setShouldShowCardForm] = useState(false);

  const { t } = useTranslation();
  usePageTitle(t('heading', { ns: 'dashboard' }));
  const invalidateDashboard = useInvalidateDashboard();

  const onCloseModal = useCallback(() => setShouldShowCardForm(false), []);
  const onCardCreated = useCallback(() => {
    invalidateDashboard();
    setShouldShowCardForm(false);
  }, [invalidateDashboard]);

  const renderLink = useCallback((children: ReactElement, languageFrom: string, languageTo: string): ReactElement => {
    return (
      <NavLink to={`/dictionary/${languageFrom.toLowerCase()}/${languageTo.toLowerCase()}`}>{children}</NavLink>
    );
  }, []);

  return (
    <div className='p-4'>
      <Heading1 className='pb-4'>{t('heading', { ns: 'dashboard' })}</Heading1>

      <CardsStatistics/>

      <div className='pt-4 pb-4 flex justify-between'>
        <Heading3>{t('yourDictionaries', { ns: 'dashboard' })}</Heading3>
        <span className='text-primary cursor-pointer hover:underline' onClick={() => setShouldShowCardForm(true)}>
          + {t('addCard', { ns: 'dashboard' })}
        </span>
      </div>
      <CardsDictionaries renderLink={renderLink}/>

      <CardFormModal show={shouldShowCardForm}
                     onClose={onCloseModal}
                     onSuccessSubmission={onCardCreated}/>
    </div>
  );
}

export default DashboardPage;
