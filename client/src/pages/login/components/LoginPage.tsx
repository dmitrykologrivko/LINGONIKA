import { useNavigate, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/auth';
import { usePageTitle } from '@/hooks';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  usePageTitle(t('heading',  { ns: 'login' }));

  return (
    <div className='w-lvw h-lvh flex flex-col'>
      <div className='flex-grow flex justify-center items-center'>
        <LoginForm onSuccessLogin={() => navigate('/dashboard')}/>
      </div>
      <div className='text-center p-4'>
        <NavLink className='underline' to={'/'}>{t('backToHomePage', {ns: 'actions'})}</NavLink>
      </div>
    </div>
  );
}

export default LoginPage;
