import { Outlet } from 'react-router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { any } from '@/utils';
import LoadingOverlay from '../../ui/LoadingOverlay/LoadingOverlay';

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
      <LoadingOverlay show={shouldShowSpinner}/>
    </>
  );
}

export default PublicLayout;
