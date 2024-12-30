import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { CardsPage } from '@/pages/cards';
import { NotFoundPage } from '@/pages/not-found';
import App from './App';
import Boundary from './Boundary';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <PublicRoute>
          <HomePage/>
        </PublicRoute>
      ),
      errorElement: <Boundary/>,
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <LoginPage/>
        </PublicRoute>
      ),
      errorElement: <Boundary/>
    },
    {
      path: 'register',
      element: (
        <PublicRoute>
          <RegisterPage/>
        </PublicRoute>
      ),
      errorElement: <Boundary/>
    },
    {
      path: '/*',
      element: (
        <ProtectedRoute>
          <App/>
        </ProtectedRoute>
      ),
      errorElement: <Boundary/>,
      hydrateFallbackElement: <div>Loading...</div>,
      children: [
        {
          path: 'cards',
          element: <CardsPage/>
        },
        {
          path: '*',
          element: <NotFoundPage/>
        }
      ]
    },
  ]);
};
