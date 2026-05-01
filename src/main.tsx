import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from './pages/MainPage.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  </StrictMode>
);
