import { useNavigate, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PublicLayout } from '@/components';
import { RegisterForm } from '@/features/auth';
import { usePageTitle } from '@/hooks';

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  usePageTitle(t('heading',  { ns: 'register' }));

  return (
    <PublicLayout>
      <div className='w-lvw h-lvh flex flex-col'>
        <div className='flex-grow flex justify-center items-center'>
          <RegisterForm onSuccessRegistration={() => navigate('/login')}/>
        </div>
        <div className='text-center p-4'>
          <NavLink className='underline' to={'/'}>{t('backToHomePage', {ns: 'labels'})}</NavLink>
        </div>
      </div>
    </PublicLayout>
  );
}

export default RegisterPage;
