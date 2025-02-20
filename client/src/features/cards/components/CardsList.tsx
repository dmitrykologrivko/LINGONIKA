import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getGroupOptions,
  getInfiniteCardsOptions,
  deleteCards,
  DeleteCardsRequest,
} from '@/api';
import {
  useApiClient,
  useHandleQueryError,
  useHandleMutationError,
  useAlertsManager,
  useIntersection,
} from '@/hooks';
import {
  Skeleton,
  Card,
  ErrorView,
  Checkbox,
  InfiniteLoading,
} from '@/components';
import { capitalizeFirstLetter, empty } from '@/utils';
import calendarBlackIcon from '@/assets/calendar-black.svg';
import calendarPrimaryIcon from '@/assets/calendar-primary.svg';
import azSortBlackIcon from '@/assets/az-sort-black.svg';
import azSortPrimaryIcon from '@/assets/az-sort-primary.svg';
import deleteIcon from '@/assets/delete-black.svg';

type CardsListProps = {
  className?: string;
  languageFrom?: string;
  languageTo?: string;
  groupId?: number;
  onAddCardClick: () => void;
  onCardClick: (cardId: number) => void;
  onEmptyGroupDeleted: () => void;
};

const SORT_BY_DATE = '-id';
const SORT_BY_ASCENDING_LETTERS = 'textFrom';

function CardsList({
                     className,
                     languageFrom,
                     languageTo,
                     groupId,
                     onAddCardClick,
                     onCardClick,
                     onEmptyGroupDeleted,
                   }: CardsListProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState(SORT_BY_DATE);
  const [isLearned, setIsLearned] = useState<boolean | undefined>();

  const { t } = useTranslation();
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const alertsManager = useAlertsManager();

  const queryOptions = getInfiniteCardsOptions({
    languageFrom,
    languageTo,
    groupId,
    isLearned,
    sortBy,
  }, apiClient);
  const {
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    data,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(queryOptions);
  const errorMessage = useHandleQueryError(error);
  const infiniteLoadingRef = useIntersection(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  const deleteCardsMutation = useMutation({
    mutationFn: (req: DeleteCardsRequest)=> deleteCards(req, apiClient),
  });
  const handleMutationError = useHandleMutationError();

  function onCardSelected(cardId: number) {
    if (selectedIds.includes(cardId)) {
      setSelectedIds(prevState => [...prevState.filter(id => id !== cardId)]);
    } else {
      setSelectedIds(prevState => [...prevState, cardId]);
    }
  }

  function onBulkSelectCards() {
    if (selectedIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds([...data!.map(card => card.id)]);
    }
  }

  function bulkDeleteCards() {
    deleteCardsMutation.mutate({ ids: selectedIds },  {
      onSuccess: async () => {
        const messageKey = selectedIds.length === 1
          ? 'oneCardDeleted'
          : 'multipleCardsDeleted';
        const message = t(messageKey, { ns: 'cards', count: selectedIds.length });
        alertsManager.addAlert({
          text: message,
          status: 'success'
        });

        queryClient.invalidateQueries({
          queryKey: queryOptions.queryKey,
        });
        setSelectedIds([]);

        // Ensure that group still exists after deletion it's cards
        if (groupId) {
          queryClient.fetchQuery(getGroupOptions(groupId, apiClient))
            .catch(onEmptyGroupDeleted);
        }
      },
      onError: handleMutationError,
    });
  }

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
      <nav className='flex gap-2 mt-2 mb-2 ml-1 mr-1 p-1 border-b'>
        <span className={`${isLearned === undefined ? 'text-primary' : 'cursor-pointer'}`}
              onClick={() => setIsLearned(undefined)}>
          {capitalizeFirstLetter(t('all', { ns: 'labels' }))}
        </span>
        <span className={`${isLearned === true ? 'text-primary' : 'cursor-pointer'}`}
              onClick={() => setIsLearned(true)}>
          {t('learned', { ns: 'cards' })}
        </span>
        <span className='ml-auto text-primary cursor-pointer hover:underline'
              onClick={onAddCardClick}>
          + {t('addCard', { ns: 'cards' })}
        </span>
      </nav>

      {empty(data) && (
        <div className='text-center pt-4'>{t('noCards', { ns: 'cards' })}</div>
      )}

      {!empty(data) && (
        <>
          <Card className='bg-white'>
            <Card.Body className='pl-6 pr-6 pt-4 pb-4'>
              <div className='flex justify-between items-center gap-4'>
                <div>
                  <Checkbox size='sm' color='primary'
                            checked={selectedIds.length > 0}
                            onChange={onBulkSelectCards}/>
                  {selectedIds.length > 0 && (
                    <span className='ml-4'>
                      {selectedIds.length === 1
                        ? t('oneCardSelected', { ns: 'cards', count: selectedIds.length })
                        : t('multipleCardsSelected', { ns: 'cards', count: selectedIds.length })}
                    </span>
                  )}
                </div>

                {selectedIds.length > 0 && (
                  <div className='flex items-center cursor-pointer' onClick={bulkDeleteCards}>
                    <img src={deleteIcon} className='w-6 h-6 inline-block' alt='Delete Icon'/>
                    Delete
                  </div>
                )}

                {selectedIds.length === 0 && (
                  <div className='flex'>
                    <img src={sortBy === SORT_BY_DATE ? calendarPrimaryIcon : calendarBlackIcon} alt='Calendar Icon'
                         className='w-6 h-6 cursor-pointer' onClick={() => setSortBy(SORT_BY_DATE)}/>
                    <img src={sortBy === SORT_BY_ASCENDING_LETTERS ? azSortPrimaryIcon : azSortBlackIcon} alt='AZ Icon'
                         className='w-6 h-6 cursor-pointer' onClick={() => setSortBy(SORT_BY_ASCENDING_LETTERS)}/>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
          <ul>
            {data?.map((card) => (
              <li key={card.id} className='pt-2 pb-2'>
                <Card className='bg-white'>
                  <Card.Body className='pl-6 pr-6 pt-2 pb-2'>
                    <div className='flex justify-between items-center gap-4'>
                      <Checkbox size='sm' color='primary' checked={selectedIds.includes(card.id)}
                                onChange={onCardSelected.bind(null, card.id)}/>

                      <div className='flex-grow cursor-pointer' onClick={() => onCardClick(card.id)}>
                        <div className='text-md font-bold'>{card.textFrom}</div>
                        <div className='text-sm'>{card.textTo}</div>
                      </div>

                      <div className='text-right'>
                        {card.isLearned && (
                          <div className='text-success text-xs md:text-sm'>{t('learned', {ns: 'cards'})}</div>
                        )}
                        {!card.isLearned && (
                          <div className='text-error text-xs md:text-sm'>{t('notLearned', {ns: 'cards'})}</div>
                        )}
                        {!groupId && card.group && (
                          <div className='text-xs md:text-sm'>{card.group?.name}</div>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>

          <InfiniteLoading ref={infiniteLoadingRef} isLoading={isFetchingNextPage}/>
        </>
      )}
    </div>
  );
}

export default CardsList;
