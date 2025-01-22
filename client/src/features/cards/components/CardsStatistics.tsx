import { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useApiClient, useInvalidateQueries, useHandleQueryError } from '@/hooks';
import { getCardsStatisticsOptions } from '@/api';
import { Panel, Skeleton, ErrorView } from '@/components';
import rightArrowIcon from '@/assets/right-arrow-black.svg';

type CardsStatisticsProps = {
  className?: string;
  languageFrom: string;
  languageTo: string;
  renderLink: (children: ReactElement) => ReactElement;
  invalidationKey?: string;
};

function CardsStatistics({ className,
                           languageFrom,
                           languageTo,
                           renderLink,
                           invalidationKey }: CardsStatisticsProps) {
  const { t } = useTranslation();

  const apiClient = useApiClient();
  const queryOptions = getCardsStatisticsOptions({ languageFrom, languageTo }, apiClient);
  const { isLoading, error, data, refetch } = useQuery(queryOptions);
  const errorMessage = useHandleQueryError(error);

  useInvalidateQueries(invalidationKey, queryOptions);

  if (isLoading) {
    return (
      <div className={className}>
        <Skeleton className='h-14'/>
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
      {renderLink(
        <Panel rounded shadow>
          <div className='flex'>
            <div className='font-bold grow'>{t('allFlashCards', { ns: 'cards' })}</div>

            <div className='font-bold'>
              <span className='text-success'>{`${data?.countLearned}`}</span>
              <span> {t('of', { ns: 'labels' })} </span>
              <span className='text-info'>{`${data?.totalCount}`}</span>
              <img className='w-6 h-6 inline-block' src={rightArrowIcon} alt='Right Arrow'/>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}

export default CardsStatistics;
