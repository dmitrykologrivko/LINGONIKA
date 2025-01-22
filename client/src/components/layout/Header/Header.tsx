import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, NavLink } from 'react-router';
import { Modal, Button, Dropdown } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { useApiClient } from '@/hooks';
import { getProfileOptions, clearAuthenticationToken } from '@/api';
import logoWhite from '@/assets/logo-white.svg';
import downChevronIcon from '@/assets/down-chevron-white.svg';
import profileIcon from '@/assets/profile-round-black.svg';
import logoutIcon from '@/assets/logout-black.svg';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Dialog, handleShow } = Modal.useDialog();

  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const profile = useQuery(getProfileOptions(apiClient));

  function navigateToProfile() {
    navigate('/profile');
  }

  function logout() {
    clearAuthenticationToken();
    queryClient.removeQueries();
    navigate('/');
  }

  return (
    <div className='w-full p-4 bg-primary flex items-center justify-between'>
      <NavLink className='flex items-center gap-2' to={'/'}>
        <img src={logoWhite} alt='logo' className='w-10 h-10'/>
        <span className='text-white uppercase font-bold'>Lingonika</span>
      </NavLink>

      {profile.isSuccess && (
        <Dropdown hover end>
          <Dropdown.Toggle button={false}>
            <div className='flex items-center gap-2 cursor-pointer'>
              <a className='text-white'>
                {profile.data?.firstName + ' ' + profile.data?.lastName}
              </a>
              <img src={downChevronIcon} alt='Chevron Down Icon' className='w-6 h-6'/>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className='w-40'>
            <Dropdown.Item className='flex justify-between' onClick={navigateToProfile}>
              {t('editProfile', {ns: 'actions'})}
              <img src={profileIcon} alt='Profile Icon' className='w-4 h-4'/>
            </Dropdown.Item>
            <Dropdown.Item className='flex justify-between' onClick={handleShow}>
              {t('logout', {ns: 'actions'})}
              <img src={logoutIcon} alt='Logout Icon' className='w-4 h-4'/>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <Dialog>
        <Modal.Header className="font-bold">{t('logoutTitle', {ns: 'modals'})}</Modal.Header>
        <Modal.Body>{t('logoutMessage', {ns: 'modals'})}</Modal.Body>
        <Modal.Actions>
          <form method="dialog" className='flex gap-2'>
            <Button color='neutral'>{t('cancel', { ns: 'actions' })}</Button>
            <Button color='error' onClick={logout}>{t('ok', { ns: 'actions' })}</Button>
          </form>
        </Modal.Actions>
      </Dialog>
    </div>
  );
}

export default Header;
