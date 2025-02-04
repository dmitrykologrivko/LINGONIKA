import { createBrowserRouter, RouteObject } from 'react-router';
import {
  ProtectedRoute,
  PublicOnlyRoute,
  ProtectedLayout,
  PublicLayout,
  LoadingOverlay,
  RouteErrorBoundary,
} from '@/components';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { DashboardPage } from '@/pages/dashboard';
import { CardsPage } from '@/pages/cards';
import { DictionaryPage } from '@/pages/dictionary';
import { ProfilePage } from '@/pages/profile';
import { NotFoundPage } from '@/pages/not-found';

export const createRouter = () => {
  function createRoute(routeObj: Partial<RouteObject>): RouteObject {
    return {
      ...routeObj,
      errorElement: <RouteErrorBoundary loginRoute='/login' notFoundRoute='/not-found'/>,
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
        { path: 'profile', element: <ProfilePage/> },
        { path: 'dictionary/:languageFrom/:languageTo/', element: <DictionaryPage/> },
        { path: 'cards/language/:languageFrom/:languageTo/', element: <CardsPage/> },
        { path: 'cards/group/:groupId/', element: <CardsPage/> },
        { path: 'not-found', element: <NotFoundPage/> },
        { path: '*', element: <NotFoundPage/> }
      ],
    }),

    createRoute({
      path: '*',
      element: <NotFoundPage/>
    }),
  ]);
};
