import { createBrowserRouter, RouteObject } from 'react-router';
import {
  ProtectedRoute,
  PublicOnlyRoute,
  ProtectedLayout,
  PublicLayout,
  LoadingOverlay,
} from '@/components';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { DashboardPage } from '@/pages/dashboard';
import { CardsPage } from '@/pages/cards';
import { NotFoundPage } from '@/pages/not-found';
import Boundary from './Boundary';

export const createRouter = () => {
  function createRoute(routeObj: Partial<RouteObject>): RouteObject {
    return {
      ...routeObj,
      errorElement: <Boundary/>,
      hydrateFallbackElement: <LoadingOverlay show={true}/>,
    };
  }

  return createBrowserRouter([
    createRoute({
      path: '/',
      element: (
        <PublicOnlyRoute redirectTo={'/dashboard'}>
          <PublicLayout/>
        </PublicOnlyRoute>
      ),
      children: [
        { index: true, element: <HomePage/> },
        { path: 'login', element: <LoginPage/> },
        { path: 'register', element: <RegisterPage/> }
      ],
    }),

    createRoute({
      path: '/*',
      element: (
        <ProtectedRoute redirectTo={'/login'}>
          <ProtectedLayout/>
        </ProtectedRoute>
      ),
      children: [
        { path: 'dashboard', element: <DashboardPage/> },
        { path: 'cards', element: <CardsPage/> },
        { path: '*', element: <NotFoundPage/> }
      ],
    }),

    createRoute({
      path: '*',
      element: <NotFoundPage/>
    }),
  ]);
};
