import { Outlet } from 'react-router';
import Header from '../Header/Header';

function MainLayout() {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
