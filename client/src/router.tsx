import { PropsWithChildren } from 'react';
import { createBrowserRouter } from 'react-router';
import { DynamicRedirect, MainLayout } from '@/components';
import { AuthGuard } from '@/features/auth';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { CardsPage } from '@/pages/cards';
import { NotFoundPage } from '@/pages/not-found';
import Boundary from './Boundary';

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ children }: PropsWithChildren) => {
  return (
    <DynamicRedirect redirectTo={'/login'}
                     renderContent={(redirect) => (
                       <AuthGuard onUnauthorized={redirect}>
                         {children}
                       </AuthGuard>
                     )}/>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const PublicOnlyRoute = ({ children }: PropsWithChildren) => {
  return (
    <DynamicRedirect redirectTo={'/cards'}
                     renderContent={(redirect) => (
                       <AuthGuard onAuthorized={redirect}>
                         {children}
                       </AuthGuard>
                     )}/>
  );
};

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <PublicOnlyRoute>
          <HomePage/>
        </PublicOnlyRoute>
      ),
      errorElement: <Boundary/>,
    },
    {
      path: 'login',
      element: (
        <PublicOnlyRoute>
          <LoginPage/>
        </PublicOnlyRoute>
      ),
      errorElement: <Boundary/>
    },
    {
      path: 'register',
      element: (
        <PublicOnlyRoute>
          <RegisterPage/>
        </PublicOnlyRoute>
      ),
      errorElement: <Boundary/>
    },
    {
      path: '/*',
      element: (
        <ProtectedRoute>
          <MainLayout/>
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
