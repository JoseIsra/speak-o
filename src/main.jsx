import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DialogueGame } from './pages/DialogueGame';
import { GameReport } from './pages/GameReport';
import { GameLayout } from './layouts/GameLayout';
import { SpeechProvider } from '@speechly/react-client';
import { GameProvider } from './context/GameProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './i18n';
import { getClientLanguage } from './helpers/language';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/game',
    element: <GameLayout />,
    children: [
      {
        path: 'dialogue',
        element: <DialogueGame />,
      },
    ],
  },
  {
    path: 'report',
    element: <GameReport />,
  },
]);
i18n.use(initReactI18next).init({
  resources: translations,
  lng: getClientLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpeechProvider appId={import.meta.env.VITE_SPEECHLY_KEY}>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </SpeechProvider>
  </React.StrictMode>
);
