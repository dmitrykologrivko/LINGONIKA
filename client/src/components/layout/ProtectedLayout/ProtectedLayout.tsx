import { Outlet } from 'react-router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { any } from '@/utils';
import Header from '../Header/Header';
import LoadingOverlay from '../../ui/LoadingOverlay/LoadingOverlay';
import AlertsRenderer from '../AlertsRenderer/AlertsRenderer';

function ProtectedLayout() {
  const shouldShowSpinner = any(
    useIsFetching(),
    useIsMutating(),
  );

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <AlertsRenderer/>
      <LoadingOverlay show={shouldShowSpinner}/>
    </>
  );
}

export default ProtectedLayout;
