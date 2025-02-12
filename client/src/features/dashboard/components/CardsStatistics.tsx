import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useApiClient, useHandleQueryError } from '@/hooks';
import { getCardsStatisticsOptions } from '@/api';
import { Panel, Divider, Skeleton, ErrorView } from '@/components';

type CardsStatisticsProps = {
  className?: string;
};

function CardsStatistics({ className }: CardsStatisticsProps) {
  const { t } = useTranslation();

  const apiClient = useApiClient();
  const { isLoading, error, data, refetch } = useQuery(
    getCardsStatisticsOptions({}, apiClient),
  );
  const errorMessage = useHandleQueryError(error);

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
        <ErrorView errorMessage={errorMessage} handleRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={className}>
      <Panel rounded shadow>
        <div className='flex flex-col gap-1 md:gap-0 md:flex-row md:justify-evenly md:items-center'>
          <div className='flex justify-between md:block'>
            {t('learnedWords', { ns: 'dashboard' })}: <span className='text-success font-bold'>{data?.countLearned}</span>
          </div>
          <Divider horizontal/>
          <div className='flex justify-between md:block'>
            {t('notLearnedWords', { ns: 'dashboard' })}: <span className='text-error font-bold'>{data?.countNotLearned}</span>
          </div>
          <Divider horizontal/>
          <div className='flex justify-between md:block'>
            {t('totalWords', { ns: 'dashboard' })}: <span className='text-info font-bold'>{data?.totalCount}</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default CardsStatistics;
