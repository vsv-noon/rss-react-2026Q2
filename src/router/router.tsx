import CharacterDetails from '@/components/CharacterDetails';
import ErrorBoundary from '@/components/ErrorBoundary';
import RootLayout from '@/layouts/RootLayout';
import About from '@/pages/About';
import MainPage from '@/pages/MainPage';
import NotFound from '@/pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <RootLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <MainPage />,
        children: [
          {
            path: 'details/:id',
            element: <CharacterDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
