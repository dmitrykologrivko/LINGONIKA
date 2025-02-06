import { ForwardedRef, forwardRef } from 'react';
import { Loading } from 'react-daisyui';
import { useTranslation } from 'react-i18next';

type InfiniteLoadingProps = {
  isLoading: boolean;
};

const InfiniteLoading = forwardRef(function InfiniteLoading(
  props: InfiniteLoadingProps,
  ref: ForwardedRef<HTMLDivElement>
){
  const { t } = useTranslation();

  return (
    <div ref={ref} className='flex items-center justify-center gap-2'>
      {props.isLoading && (
        <>
          <Loading variant='spinner' color='primary'/>
          {t('loadingMore', { ns: 'labels' })}
        </>
      )}
      {!props.isLoading && (
        <>
          <hr/>
        </>
      )}
    </div>
  );
});

export default InfiniteLoading;
