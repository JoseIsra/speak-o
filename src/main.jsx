import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DialogueGame } from './pages/DialogueGame';
import { ParagraphGame } from './pages/ParagraphGame';
import { GameLayout } from './layouts/GameLayout';

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
      {
        path: 'paragraph',
        element: <ParagraphGame />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
