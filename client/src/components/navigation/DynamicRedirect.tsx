import { ReactElement, useCallback } from 'react';
import { useNavigate } from 'react-router';

type DynamicRedirectProps = {
  redirectTo: string;
  renderContent: (redirectFn: () => void) => ReactElement;
};

function DynamicRedirect({ redirectTo, renderContent }: DynamicRedirectProps) {
  const navigate = useNavigate();
  const redirectFn = useCallback(() => navigate(redirectTo), [redirectTo]);
  return (
    <>
      {renderContent(redirectFn)}
    </>
  );
}

export default DynamicRedirect;
