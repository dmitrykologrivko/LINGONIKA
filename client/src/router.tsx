import { createBrowserRouter, RouteObject } from 'react-router';
import {
  ProtectedRoute,
  PublicOnlyRoute,
  ProtectedLayout,
  PublicLayout,
  Spinner,
} from '@/components';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { CardsPage } from '@/pages/cards';
import { NotFoundPage } from '@/pages/not-found';
import Boundary from './Boundary';

export const createRouter = () => {
  function createRoute(routeObj: Partial<RouteObject>): RouteObject {
    return {
      ...routeObj,
      errorElement: <Boundary/>,
      hydrateFallbackElement: <Spinner show={true}/>,
    };
  }

  return createBrowserRouter([
    createRoute({
      path: '/',
      element: (
        <PublicOnlyRoute redirectTo={'/cards'}>
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
