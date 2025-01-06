import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { useApiClient } from '@/hooks';
import { getProfileOptions, clearAuthenticationToken } from '@/api';
import logoWhite from '@/assets/logo-white.svg';
import logoutIcon from '@/assets/logout-white.svg';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Dialog, handleShow } = Modal.useDialog();

  const apiClient = useApiClient();
  const profile = useQuery(getProfileOptions(apiClient));

  function logout() {
    clearAuthenticationToken();
    navigate('/');
  }

  return (
    <div className='w-full p-4 bg-primary flex items-center'>
      <div className='grow flex items-center gap-2'>
        <img src={logoWhite} alt='logo' className='w-10 h-10'/>
        <span className='text-white uppercase font-bold'>Lingonika</span>
      </div>

      {profile.isFetched && (
        <div className='flex items-center gap-2'>
          <a className='text-white underline cursor-pointer'>
            {profile.data?.firstName + ' ' + profile.data?.lastName}
          </a>
          <img src={logoutIcon} alt='Logout' className='w-6 h-6 cursor-pointer' onClick={handleShow}/>
        </div>
      )}

      <Dialog>
        <Modal.Header className="font-bold">{t('logoutTitle', {ns: 'modals'})}</Modal.Header>
        <Modal.Body>{t('logoutMessage', {ns: 'modals'})}</Modal.Body>
        <Modal.Actions>
          <form method="dialog" className='flex gap-2'>
            <Button color='neutral' onClick={logout}>Ok</Button>
            <Button color='error'>Close</Button>
          </form>
        </Modal.Actions>
      </Dialog>
    </div>
  );
}

export default Header;
