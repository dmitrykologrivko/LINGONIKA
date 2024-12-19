import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { CardsPage } from '@/pages/cards';
import { NotFoundPage } from '@/pages/not-found';
import App from './App.jsx';
import Boundary from './Boundary.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <Boundary/>,
  },
  {
    path: 'login',
    element: <LoginPage/>,
    errorElement: <Boundary/>
  },
  {
    path: 'register',
    element: <RegisterPage/>,
    errorElement: <Boundary/>
  },
  {
    path: '/*',
    element: <App/>,
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
