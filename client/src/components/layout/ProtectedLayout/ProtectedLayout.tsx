import { Outlet } from 'react-router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { any } from '@/utils';
import Header from '../Header/Header';
import Spinner from '../../ui/Spinner/Spinner';

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
      <Spinner show={shouldShowSpinner}/>
    </>
  );
}

export default ProtectedLayout;
