import ErrorBoundary from '@/components/ErrorBoundary';
import RootLayout from '@/layouts/RootLayout';
import MainPage from '@/pages/MainPage';
import NotFound from '@/pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
