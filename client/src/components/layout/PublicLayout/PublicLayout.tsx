import { PropsWithChildren } from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { any } from '@/utils';
import { Spinner } from '@/components';

function PublicLayout({ children }: PropsWithChildren) {
  const shouldShowSpinner = any(
    useIsFetching(),
    useIsMutating(),
  );

  return (
    <>
      <main>
        {children}
      </main>
      <Spinner show={shouldShowSpinner}/>
    </>
  );
}

export default PublicLayout;
