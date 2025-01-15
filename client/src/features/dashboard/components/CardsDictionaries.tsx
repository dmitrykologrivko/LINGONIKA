import { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useApiClient } from '@/hooks';
import { getCardsDictionariesOptions } from '@/api';
import { Skeleton, Card, Heading5 } from '@/components';

import rightArrowIcon from '@/assets/right-arrow-black.svg';
import bookBookmarkIcon from '@/assets/book-bookmark-minimalistic-black.svg';

type CardsDictionariesProps = {
  className?: string;
  renderLink: (children: ReactElement, languageFrom: string, languageTo: string) => ReactElement;
};

function CardsDictionaries(
  { className, renderLink }: CardsDictionariesProps
) {
  const { t } = useTranslation();

  const apiClient = useApiClient();
  const { isFetching, isFetched, data } = useQuery(getCardsDictionariesOptions(apiClient));

  return (
    <div className={className}>
      {isFetching && (
        <Skeleton className='h-32'/>
      )}

      {(isFetched && data!.length === 0) && (
        <div className='text-center pt-4'>{t('noDictionaries', { ns: 'dashboard' })}</div>
      )}

      {(isFetched && data!.length > 0) && (
        <ul>
          {data?.map((dictionary, index) => (
            <li key={index} className='pb-2'>
              {renderLink(
                (
                  <Card className='bg-white'>
                    <Card.Body className='p-6'>
                      <div className='flex justify-between items-center'>
                        <Heading5>
                          <img className='w-6 h-6 inline-block mr-4' src={bookBookmarkIcon} alt='Book Bookmark Icon'/>
                          {`${t(dictionary.languageFrom, { ns: 'labels' })} - ${t(dictionary.languageTo, { ns: 'labels' })}`}
                        </Heading5>

                        <div className='font-bold'>
                          <span className='text-success'>{`${dictionary.countLearned}`}</span>
                          <span> {t('of', { ns: 'labels' })} </span>
                          <span className='text-info'>{`${dictionary.totalCount}`}</span>
                          <img className='w-6 h-6 inline-block' src={rightArrowIcon} alt='Right Arrow'/>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ),
                dictionary.languageFrom,
                dictionary.languageTo,
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CardsDictionaries;
