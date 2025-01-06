import { Outlet } from 'react-router';
import Header from '../Header/Header';
import Spinner from '../../ui/Spinner/Spinner';

function MainLayout() {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Spinner show={false} />
    </>
  );
}

export default MainLayout;
