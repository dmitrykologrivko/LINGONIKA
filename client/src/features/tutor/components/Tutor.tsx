import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useMutation, useQueries, useQueryClient,} from '@tanstack/react-query';
import {Card, ErrorView, Progress, Skeleton,} from '@/components';
import {
  getGroupOptions,
  learnCardsByGroupOptions,
  learnCardsByLanguagesOptions,
  updateCard,
  UpdateCardRequest,
} from '@/api';
import {useApiClient, useHandleMutationError, useHandleQueryError, useQueriesState,} from '@/hooks';
import {Card as CardType} from '@/types';
import {TutorMode} from '../tutor-mode.enum';
import chevronRight from '@/assets/chevron-right-black.svg';
import chevronLeft from '@/assets/chevron-left-black.svg';

type TutorProps = {
  className?: string;
  languageFrom?: string;
  languageTo?: string;
  groupId?: number;
  mode: TutorMode;
};

const MAX_PROGRESS_VALUE = 100;

function Tutor({
                 className,
                 languageTo,
                 languageFrom,
                 groupId,
                 mode,
               }: TutorProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [openedCards, setOpenedCards] = useState<number[]>([]);

  const { t } = useTranslation();
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const cardsByLanguagesOptions = {
    ...learnCardsByLanguagesOptions(languageFrom!, languageTo!, apiClient),
    enabled: languageFrom !== undefined && languageTo !== undefined,
  };
  const cardsByGroupOptions = {
    ...learnCardsByGroupOptions(groupId!, apiClient),
    enabled: groupId !== undefined,
  };
  const cardsQueryKey = (cardsByLanguagesOptions.enabled && cardsByLanguagesOptions.queryKey)
    || (cardsByGroupOptions.enabled && cardsByGroupOptions.queryKey)
    || [];
  const queries = useQueries({
    queries: [
      cardsByLanguagesOptions,
      cardsByGroupOptions,
      {
        ...getGroupOptions(groupId!, apiClient),
        enabled: groupId !== undefined,
      },
    ],
  });
  const queriesState = useQueriesState(queries);
  const cards = queries[0].data || queries[1].data;
  const group = queries[2].data;
  const errorMessage = useHandleQueryError(queriesState.firstError);

  const updateCardMutation = useMutation({
    mutationFn: (req: UpdateCardRequest) => updateCard(req, apiClient),
    meta: {
      isOptimistic: true,
    },
    onMutate: async (updatedCard) => {
      await queryClient.cancelQueries({ queryKey: cardsByLanguagesOptions.queryKey });
      await queryClient.cancelQueries({ queryKey: cardsByGroupOptions.queryKey });

      const previousCards = queryClient.getQueryData<CardType[]>(cardsQueryKey);

      queryClient.setQueryData<CardType[]>(cardsQueryKey, (old) => old?.map(card => (
        card.id === updatedCard.id ? updatedCard : card
      )));

      return { previousCards };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData<CardType[]>(cardsQueryKey, context!.previousCards);
    },
    // Do not refetch onSettled because we need to keep current cards on the screen, the user can undo the operation
  });
  const handleMutationError = useHandleMutationError();

  const hasPreviousCard = currentCardIndex > 0;
  const hasNextCard = cards && (cards.length - 1) > currentCardIndex;
  const progressValue = cards ? ((currentCardIndex + 1) / cards.length) * MAX_PROGRESS_VALUE : 0;

  function learnCard(card: CardType) {
    updateCardMutation.mutate({
      ...card,
      isLearned: !card.isLearned,
    }, {
      onError: handleMutationError,
    });
  }

  function previousCard() {
    if (!hasPreviousCard) {
      return;
    }
    setCurrentCardIndex(prevState => prevState - 1);
  }

  function nextCard() {
    if (!hasNextCard) {
      return;
    }
    setCurrentCardIndex(prevState => prevState + 1);
  }

  function openCard(index: number) {
    setOpenedCards(prevState => [...prevState, index]);
  }

  if (queriesState.isLoading) {
    return (
      <div className={className}>
        <Skeleton className='h-32'/>
      </div>
    );
  }

  if (queriesState.isError) {
    return (
      <div className={className}>
        <ErrorView errorMessage={errorMessage} handleRetry={queriesState.referch}/>
      </div>
    );
  }

  return (
    <div className={className}>
      {cards!.length === 0 && (
        <div className='flex justify-center'>{t('noCards', { ns: 'tutor' })}</div>
      )}

      {cards!.length > 0 && (
        <>
          <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-4'>
            <span className='text-xl font-bold'>
              {group ? group.name : t('allCards', {ns: 'tutor'})}
            </span>
            <span className='font-bold'>
              {`${currentCardIndex + 1} / ${cards?.length}`}
            </span>
            <Progress className='w-1/2' color='success' value={progressValue} max={MAX_PROGRESS_VALUE}/>
          </div>

          <div className='flex gap-2'>
            {hasPreviousCard ? (
              <div className='flex items-center cursor-pointer' onClick={previousCard}>
                <img src={chevronLeft} className='w-8 h-8' alt='Chevron Left'/>
              </div>
            ) : (
              <div className='w-8'></div>
            )}

            <div className='flex flex-grow'>
              {cards?.map((card, index) => (
                <Card key={card.id} className='bg-white w-full min-h-96'
                      style={{display: currentCardIndex === index ? 'initial' : 'none'}}>
                  <Card.Body className='h-full'>
                    <div className='flex flex-col items-center justify-center flex-grow text-center'>
                      <span className='text-2xl font-bold'>
                        {mode === TutorMode.WORD_TRANSLATION ? card.textFrom : card.textTo}
                      </span>
                      {openedCards.includes(index) ? (
                        <span className='text-xl font-bold p-4'>
                          {mode === TutorMode.WORD_TRANSLATION ? card.textTo : card.textFrom}
                        </span>
                      ) : (
                        <div className='relative cursor-pointer text-center p-4 min-w-36'
                             onClick={() => openCard(index)}>
                          <span className='text-xl font-bold blur'>
                            {mode === TutorMode.WORD_TRANSLATION ? card.textTo : card.textFrom}
                          </span>
                          <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold'>
                            {t('clickToSee', {ns: 'tutor'})}
                          </span>
                        </div>
                      )}
                    </div>

                    {card.isLearned ? (
                      <div className='text-center font-bold text-success cursor-pointer hover:underline'
                           onClick={() => learnCard(card)}>
                        {t('learned', {ns: 'tutor'})}
                      </div>
                    ) : (
                      <div className='text-center text-primary underline cursor-pointer'
                           onClick={() => learnCard(card)}>
                        {t('markAsLearned', {ns: 'tutor'})}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>

            {hasNextCard ? (
              <div className='flex items-center cursor-pointer' onClick={nextCard}>
                <img src={chevronRight} className='w-8 h-8' alt='Chevron Right'/>
              </div>
            ) : (
              <div className='w-8'></div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Tutor;
