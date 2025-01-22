import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useApiClient, useInvalidateQueries, useHandleQueryError } from '@/hooks';
import { getGroupsOptions } from '@/api';
import { Skeleton, Card, Dropdown, Heading5, ErrorView } from '@/components';
import dotsMenuIcon from '@/assets/dots-menu-black.svg';

const GROUPS_LIMIT = 1000;

type GroupsListProps = {
  className?: string;
  languageFrom: string;
  languageTo: string;
  renderLink: (children: ReactElement, groupId: number) => ReactElement;
  onRenameGroupClick: (groupId: number) => void;
  onDeleteGroupClick: (groupId: number) => void;
  onAddCardToGroupClick: (groupId: number) => void;
  invalidationKey?: string;
}

function GroupsList({ className,
                      languageFrom,
                      languageTo,
                      renderLink,
                      onRenameGroupClick,
                      onDeleteGroupClick,
                      onAddCardToGroupClick,
                      invalidationKey }: GroupsListProps) {
  const { t } = useTranslation();

  const apiClient = useApiClient();
  const queryOptions = getGroupsOptions({ languageFrom, languageTo, limit: GROUPS_LIMIT }, apiClient);
  const { isLoading, error, data, refetch } = useQuery(queryOptions);
  const errorMessage = useHandleQueryError(error);

  useInvalidateQueries(invalidationKey, queryOptions);

  if (isLoading) {
    return (
      <div className={className}>
        <Skeleton className='h-32'/>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <ErrorView errorMessage={errorMessage} handleRetry={refetch}/>
      </div>
    );
  }

  return (
    <div className={className}>
      {(data!.count === 0) && (
        <div className='text-center pt-4'>{t('noGroups', { ns: 'groups' })}</div>
      )}

      {(data!.count > 0) && (
        <ul>
          {data?.results.map((group) => (
            <li key={group.id} className='pb-2'>
              <Card className='bg-white'>
                <Card.Body className='pl-6 pr-6 pt-0 pb-0'>
                  <div className='flex justify-between items-center'>
                    <div className='flex-grow'>
                      {renderLink(<Heading5 className='mt-6 mb-6'>{group.name}</Heading5>, group.id)}
                    </div>

                    <div className='font-bold'>
                      <span className='text-success'>{`${group.learnedCards}`}</span>
                      <span> {t('of', { ns: 'labels' })} </span>
                      <span className='text-info'>{`${group.totalCards}`}</span>

                      <Dropdown end>
                        <Dropdown.Toggle button={false}>
                          <img className='w-6 h-6 inline-block cursor-pointer' src={dotsMenuIcon}
                               alt='Dots Menu Icon'/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='w-44 z-10'>
                          <Dropdown.Item onClick={() => onRenameGroupClick(group.id)}>
                            <div className='w-32 text-right'>{t('renameGroup', { ns: 'groups' })}</div>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onDeleteGroupClick(group.id)}>
                            <div className='w-32 text-right text-error'>{t('deleteGroup', { ns: 'groups' })}</div>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onAddCardToGroupClick(group.id)}>
                            <div className='w-32 text-right'>{t('addCardToGroup', { ns: 'groups' })}</div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroupsList;
