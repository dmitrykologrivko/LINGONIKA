import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '@/api';

type AuthGuardProps = {
  onAuthorized?: () => void;
  onUnauthorized?: () => void;
};

function AuthGuard({ children, onAuthorized, onUnauthorized }: PropsWithChildren<AuthGuardProps>) {
  const { t } = useTranslation();
  const isLoggedIn = useMemo(() => isAuthenticated(), []);

  useEffect(() => {
    if (isLoggedIn && onAuthorized) {
      onAuthorized();
    }
    if (!isLoggedIn && onUnauthorized) {
      onUnauthorized();
    }
  }, [isLoggedIn, onAuthorized, onUnauthorized]);

  return (
    <>
      {isLoggedIn && children}
      {!isLoggedIn && !onUnauthorized && (
        <div className='text-error'>{t('unauthorizedAccess', {ns: 'errors'})}</div>
      )}
    </>
  );
}

export default AuthGuard;
