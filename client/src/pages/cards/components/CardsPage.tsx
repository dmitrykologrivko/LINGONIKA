import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Heading1, Skeleton } from '@/components';
import { CardsList, CardFormModal } from '@/features/cards';
import { TutorBanner, TutorMode } from '@/features/tutor';
import { useApiClient, usePageTitle } from '@/hooks';
import { getGroupOptions } from '@/api';

function CardsPage() {
  const [shouldShowCardForm, setShouldShowCardForm] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number | undefined>();

  const { t } = useTranslation();
  const apiClient = useApiClient();

  const params = useParams();
  const languageFrom = params.languageFrom ? (params.languageFrom as string).toUpperCase() : undefined;
  const languageTo = params.languageTo ? (params.languageTo as string).toUpperCase() : undefined;
  const groupId = params.groupId ? Number(params.groupId) : undefined;
  const languageFromLabel = languageFrom ? t(languageFrom, { ns: 'labels' }) : undefined;
  const languageToLabel = languageTo ? t(languageTo, { ns: 'labels' }) : undefined;

  const groupQuery = useQuery({
    ...getGroupOptions(groupId!, apiClient),
    enabled: groupId !== undefined,
  });

  const renderTutorLink = useCallback((mode: TutorMode) => {
    const selectedMode = mode.toLowerCase();

    if (groupQuery.data?.id) {
      return (
        <NavLink to={`/tutor/group/${groupQuery.data.id}?mode=${selectedMode}`}>
          {t('startLearning', { ns: 'tutor' })}
        </NavLink>
      );
    }

    return (
      <NavLink to={`/tutor/language/${languageFrom?.toLowerCase()}/${languageTo?.toLowerCase()}?mode=${selectedMode}`}>
        {t('startLearning', { ns: 'tutor' })}
      </NavLink>
    );
  }, [t, groupQuery, languageFrom, languageTo]);

  function onCloseModal() {
    setShouldShowCardForm(false);
  }

  function onAddCardClick() {
    setActiveCardId(undefined);
    setShouldShowCardForm(true);
  }

  function onCardClick(cardId: number) {
    setActiveCardId(cardId);
    setShouldShowCardForm(true);
  }

  function getHeading() {
    if (groupQuery.isLoading) {
      return t('defaultHeading', { ns: 'cards' });
    }

    return groupId && groupQuery.data
      ? t('groupCardsHeading', { ns: 'cards', groupName: groupQuery.data.name })
      : t('allCardsHeading', { ns: 'cards', languageFrom: languageFromLabel, languageTo: languageToLabel })
  }

  usePageTitle(getHeading());

  return (
    <div className='p-4'>
      <Heading1 className='mb-4'>{getHeading()}</Heading1>

      <div className='flex flex-col-reverse md:flex-row gap-4'>
        <div className='w-full md:w-8/12'>
          <CardsList groupId={groupId} languageFrom={languageFrom} languageTo={languageTo}
                     onAddCardClick={onAddCardClick} onCardClick={onCardClick}/>
        </div>

        <div className='w-full md:w-4/12'>
          {groupQuery.isLoading ? (
            <Skeleton className='h-32'/>
          ) : (
            <TutorBanner languageFrom={(languageFrom || groupQuery.data?.languageFrom)!}
                         languageTo={(languageTo || groupQuery.data?.languageTo)!}
                         renderLink={renderTutorLink}/>
          )}
        </div>
      </div>

      <CardFormModal show={shouldShowCardForm} cardId={activeCardId}
                     languageFrom={languageFrom} languageTo={languageTo}
                     onClose={onCloseModal}/>
    </div>
  );
}

export default CardsPage;
