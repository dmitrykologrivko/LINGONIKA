import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-daisyui';
import robotIcon from '@/assets/robot-black.svg';

type ErrorViewProps = {
  errorMessage: string;
  handleRetry?: (...args: any[]) => any;
  bordered?: boolean;
}

function ErrorView({ children, errorMessage, handleRetry, bordered }: PropsWithChildren<ErrorViewProps>) {
  const { t } = useTranslation();
  const borderedClass = `${bordered === false ? '' : 'border rounded'}`;

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center z-10 p-4 ${borderedClass}`}>
      <img src={robotIcon} alt='Robot Icon' className='w-28 h-28'/>
      <span className='p-2 text-center'>{errorMessage}</span>
      {handleRetry && (
        <Button size='sm' onClick={handleRetry}>
          {t('tryAgain', {ns: 'actions'})}
        </Button>
      )}
      <div className='mt-4'>
        {children}
      </div>
    </div>
  );
}

export default ErrorView;
