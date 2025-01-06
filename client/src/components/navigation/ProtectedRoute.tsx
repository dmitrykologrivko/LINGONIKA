import { PropsWithChildren } from 'react';
import { useLoggedIn, useRedirectWhen } from '@/hooks';

type ProtectedRouteProps = {
  redirectTo: string;
};

function ProtectedRoute({ children, redirectTo }: PropsWithChildren<ProtectedRouteProps>) {
  const isLoggedIn = useLoggedIn();
  useRedirectWhen(!isLoggedIn, redirectTo);
  return (
    <>
      {isLoggedIn && children}
    </>
  );
}

export default ProtectedRoute;
