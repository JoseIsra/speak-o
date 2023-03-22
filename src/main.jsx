import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DialogueGame } from './pages/DialogueGame';
import { GameLayout } from './layouts/GameLayout';
import { SpeechProvider } from '@speechly/react-client';

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
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpeechProvider appId={import.meta.env.VITE_SPEECHLY_KEY}>
      <RouterProvider router={router} />
    </SpeechProvider>
  </React.StrictMode>
);
