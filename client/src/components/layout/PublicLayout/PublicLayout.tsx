import { Outlet } from 'react-router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { any } from '@/utils';
import { Spinner } from '@/components';

function PublicLayout() {
  const shouldShowSpinner = any(
    useIsFetching(),
    useIsMutating(),
  );

  return (
    <>
      <main>
        <Outlet/>
      </main>
      <Spinner show={shouldShowSpinner}/>
    </>
  );
}

export default PublicLayout;
