import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isAuthenticated } from '@/api';

type ProtectedRouteProps = {
  redirectPath?: string;
} & PropsWithChildren;

function ProtectedRoute({ children, redirectPath }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(redirectPath || '/login');
    }
  }, [navigate, redirectPath]);

  return (
    <>
      {isAuthenticated() && children}
    </>
  );
}

export default ProtectedRoute;
