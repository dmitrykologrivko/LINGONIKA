import { useTranslation } from 'react-i18next';
import { Button } from '@/components';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className='mt-48 p-4 flex flex-col gap-2 justify-center items-center'>
      <div className='w-20 h-20 bg-primary text-white text-2xl font-bold flex justify-center items-center rounded-full'>
        404
      </div>
      <div className='font-bold'>{t('notFound', { ns: 'errors' })}</div>
      <Button onClick={() => history.back()}>{t('goBack', { ns: 'actions' })}</Button>
    </div>
  );
}

export default NotFoundPage;
