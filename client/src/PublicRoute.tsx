import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isAuthenticated } from '@/api';

type PublicRouteProps = {
  redirectPath?: string;
} & PropsWithChildren;

function PublicRoute({ children, redirectPath }: PublicRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(redirectPath || '/cards');
    }
  }, [navigate, redirectPath]);

  return (
    <>
      {!isAuthenticated() && children}
    </>
  );
}

export default PublicRoute;
