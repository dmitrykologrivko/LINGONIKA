import { useTranslation } from 'react-i18next';
import { usePageTitle } from '@/hooks';
import { ProfileForm } from '@/features/profile';

function ProfilePage() {
  const { t } = useTranslation();
  usePageTitle(t('heading', { ns: 'profile' }));

  return (
    <div className='w-lvw flex flex-col'>
      <div className='flex-grow flex justify-center items-center mt-4'>
        <ProfileForm className='min-w-80 md:min-w-96'/>
      </div>
    </div>
  );
}

export default ProfilePage;
