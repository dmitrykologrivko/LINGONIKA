import { createBrowserRouter, RouteObject } from 'react-router';
import {
  ProtectedRoute,
  PublicOnlyRoute,
  ProtectedLayout,
  Spinner,
} from '@/components';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { CardsPage } from '@/pages/cards';
import { NotFoundPage } from '@/pages/not-found';
import Boundary from './Boundary';

const PUBLIC_ROUTE_REDIRECT = '/cards';
const PROTECTED_ROUTE_REDIRECT = '/login';

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
        <PublicOnlyRoute redirectTo={PUBLIC_ROUTE_REDIRECT}>
          <HomePage/>
        </PublicOnlyRoute>
      ),
    }),

    createRoute({
      path: 'login',
      element: (
        <PublicOnlyRoute redirectTo={PUBLIC_ROUTE_REDIRECT}>
          <LoginPage/>
        </PublicOnlyRoute>
      ),
    }),

    createRoute({
      path: 'register',
      element: (
        <PublicOnlyRoute redirectTo={PUBLIC_ROUTE_REDIRECT}>
          <RegisterPage/>
        </PublicOnlyRoute>
      ),
    }),

    createRoute({
      path: '/*',
      element: (
        <ProtectedRoute redirectTo={PROTECTED_ROUTE_REDIRECT}>
          <ProtectedLayout/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'cards',
          element: <CardsPage/>,
        },
        {
          path: '*',
          element: <NotFoundPage/>
        }
      ],
    }),
  ]);
};
