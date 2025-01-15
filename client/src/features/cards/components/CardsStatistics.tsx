import { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useApiClient } from '@/hooks';
import { getCardsStatisticsOptions } from '@/api';
import { Panel, Skeleton } from '@/components';
import rightArrowIcon from '@/assets/right-arrow-black.svg';

type CardsStatisticsProps = {
  className?: string;
  languageFrom: string;
  languageTo: string;
  renderLink: (children: ReactElement) => ReactElement;
};

function CardsStatistics({ className, languageFrom, languageTo, renderLink }: CardsStatisticsProps) {
  const { t } = useTranslation();

  const apiClient = useApiClient();
  const { isFetching, isFetched, data } = useQuery(getCardsStatisticsOptions({ languageFrom, languageTo }, apiClient));

  return (
    <div className={className}>
      {isFetching && (
        <Skeleton className='h-14'/>
      )}

      {isFetched && (
        renderLink(
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
        )
      )}
    </div>
  );
}

export default CardsStatistics;
