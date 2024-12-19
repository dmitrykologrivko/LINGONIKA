import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Provider from './Provider';
import { router } from './Router';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider router={router}/>
  </StrictMode>,
);
