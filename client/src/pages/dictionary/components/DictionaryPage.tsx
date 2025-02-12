import { ReactElement, useCallback, useState } from 'react';
import { NavLink, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Heading1, Heading3 } from '@/components';
import { usePageTitle } from '@/hooks';
import { CardsStatistics, CardFormModal } from '@/features/cards';
import { GroupsList, GroupFormModal, GroupDeleteDialog } from '@/features/groups';

function DictionaryPage() {
  const [activeGroupId, setActiveGroupId] = useState<number | undefined>(undefined);
  const [shouldShowGroupForm, setShouldShowGroupForm] = useState(false);
  const [shouldShowGroupDeleteDialog, setShouldShowGroupDeleteDialog] = useState(false);
  const [shouldShowCardForm, setShouldShowCardForm] = useState(false);

  const params = useParams();
  const { t } = useTranslation();

  const languageFrom = (params.languageFrom as string).toUpperCase();
  const languageTo = (params.languageTo as string).toUpperCase();
  const languageFromLabel = t(languageFrom, { ns: 'labels' });
  const languageToLabel = t(languageTo, { ns: 'labels' });
  usePageTitle(t('heading', { ns: 'dictionaries', languageFrom: languageFromLabel, languageTo: languageToLabel }));

  const renderLink = useCallback((children: ReactElement): ReactElement => {
    return (
      <NavLink to={`/cards/language/${languageFrom.toLowerCase()}/${languageTo.toLowerCase()}`}>{children}</NavLink>
    );
  }, [languageFrom, languageTo]);

  const renderGroupLink = useCallback((children: ReactElement, id: number): ReactElement => {
    return (
      <NavLink to={`/cards/group/${id}`}>{children}</NavLink>
    );
  }, []);

  const onCloseGroupForm = useCallback(() => {
    setActiveGroupId(undefined);
    setShouldShowGroupForm(false);
  }, []);

  const onCloseGroupDeleteDialog = useCallback(() => {
    setActiveGroupId(undefined);
    setShouldShowGroupDeleteDialog(false);
  }, []);

  const onCloseCardForm = useCallback(() => {
    setActiveGroupId(undefined);
    setShouldShowCardForm(false);
  }, []);

  const onRenameGroupClick = (groupId: number): void => {
    setActiveGroupId(groupId);
    setShouldShowGroupForm(true);
  };
  const onDeleteGroupClick = (groupId: number): void => {
    setActiveGroupId(groupId);
    setShouldShowGroupDeleteDialog(true);
  };
  const onAddCardToGroupClick = (groupId: number): void => {
    setActiveGroupId(groupId);
    setShouldShowCardForm(true);
  };

  return (
    <div className='p-4'>
      <Heading1>
        {t('dictionary', {ns: 'dictionaries', languageFrom: languageFromLabel, languageTo: languageToLabel})}
      </Heading1>

      <CardsStatistics className='mt-4 mb-4' renderLink={renderLink}
                       languageFrom={languageFrom} languageTo={languageTo}/>

      <div className='pt-4 pb-4 flex justify-between'>
        <Heading3>{t('groups', { ns: 'dictionaries' })}</Heading3>
        <span className='text-primary cursor-pointer hover:underline' onClick={() => setShouldShowGroupForm(true)}>
          + {t('addGroup', { ns: 'dictionaries' })}
        </span>
      </div>
      <GroupsList languageFrom={languageFrom} languageTo={languageTo} renderLink={renderGroupLink}
                  onRenameGroupClick={onRenameGroupClick} onDeleteGroupClick={onDeleteGroupClick}
                  onAddCardToGroupClick={onAddCardToGroupClick}/>

      <GroupFormModal show={shouldShowGroupForm} groupId={activeGroupId}
                      languageFrom={languageFrom} languageTo={languageTo}
                      onClose={onCloseGroupForm}/>

      <GroupDeleteDialog show={shouldShowGroupDeleteDialog} groupId={activeGroupId!}
                         onClose={onCloseGroupDeleteDialog}/>

      <CardFormModal show={shouldShowCardForm} groupId={activeGroupId}
                     languageFrom={languageFrom} languageTo={languageTo}
                     onClose={onCloseCardForm}/>
    </div>
  );
}

export default DictionaryPage;
