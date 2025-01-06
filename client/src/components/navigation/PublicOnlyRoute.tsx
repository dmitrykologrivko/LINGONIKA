import { PropsWithChildren } from 'react';
import { useLoggedIn, useRedirectWhen } from '@/hooks';

type PublicRouteProps = {
  redirectTo: string;
};

function PublicOnlyRoute({ children, redirectTo }: PropsWithChildren<PublicRouteProps>) {
  const isLoggedIn = useLoggedIn();
  useRedirectWhen(isLoggedIn, redirectTo);
  return (
    <>
      {!isLoggedIn && children}
    </>
  );
}

export default PublicOnlyRoute;
