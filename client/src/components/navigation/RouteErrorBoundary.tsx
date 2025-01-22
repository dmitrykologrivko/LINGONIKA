import { useEffect, useMemo } from 'react';
import { useRouteError, useNavigate, isRouteErrorResponse } from 'react-router';
import { AxiosError } from 'axios';
import { resolveErrorMessage } from '@/utils';
import ErrorView from '../ui/ErrorView/ErrorView';

type RouteErrorBoundaryProps = {
  loginRoute: string;
  notFoundRoute: string;
};

function RouteErrorBoundary({ loginRoute, notFoundRoute }: RouteErrorBoundaryProps) {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleRetry = () => window.location.reload();

  useEffect(() => {
    const shouldNavigateLoginPage = (isRouteErrorResponse(error) && error.status === 401)
      || (error instanceof AxiosError && error.status && error.status === 401);
    if (shouldNavigateLoginPage) {
      navigate(loginRoute);
    }

    const shouldNavigateNotFoundPage = (isRouteErrorResponse(error) && error.status === 404)
      || (error instanceof AxiosError && error.status && error.status === 404);
    if (shouldNavigateNotFoundPage) {
      navigate(notFoundRoute);
    }
  }, [error, navigate, loginRoute, notFoundRoute]);

  const errorMessage = useMemo(() => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    }
    return resolveErrorMessage(error);
  }, [error]);

  const handleError = () => {
    if (isRouteErrorResponse(error)) {
      return;
    }
    if (error instanceof AxiosError) {
      return;
    }
    throw error;
  };

  handleError();

  return (
    <div className='w-lvw h-lvh'>
      <ErrorView errorMessage={errorMessage}
                 handleRetry={handleRetry} bordered={false}/>
    </div>
  );
}

export default RouteErrorBoundary;
