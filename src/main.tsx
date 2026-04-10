import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ProfileProvider } from './hooks/useProfile';
import { SavedProvider } from './hooks/useSaved';
import { ToastProvider } from './hooks/useToast';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ProfileProvider>
          <SavedProvider>
            <App />
          </SavedProvider>
        </ProfileProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
