import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function useRedirectWhen(condition: boolean, redirectTo: string) {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) {
      navigate(redirectTo);
    }
  }, [condition, redirectTo, navigate]);
}
