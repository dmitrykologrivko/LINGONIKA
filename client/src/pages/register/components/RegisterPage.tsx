import { useNavigate, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RegisterForm } from '@/features/auth';
import { usePageTitle } from '@/hooks';

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  usePageTitle(t('heading',  { ns: 'register' }));

  return (
    <div className='w-lvw h-lvh flex flex-col'>
      <div className='flex-grow flex justify-center items-center'>
        <RegisterForm onSuccessRegistration={() => navigate('/login')}/>
      </div>
      <div className='text-center p-4'>
        <NavLink className='underline' to={'/'}>{t('backToHomePage', {ns: 'actions'})}</NavLink>
      </div>
    </div>
  );
}

export default RegisterPage;
