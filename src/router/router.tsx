import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import Loader from '@/components/Loader';
import RootLayout from '@/layouts/RootLayout';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <RootLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '',
        lazy: async () => {
          const MainPage = await import('@/pages/MainPage');
          return { Component: MainPage.default };
        },
        HydrateFallback: () => <Loader variant="fullscreen" />,
        children: [
          {
            path: 'details/:id',
            lazy: async () => {
              const CharacterDetails =
                await import('@/components/CharacterDetails');
              return { Component: CharacterDetails.default };
            },
            HydrateFallback: () => <Loader variant="fullscreen" />,
          },
        ],
      },
      {
        path: 'about',
        lazy: async () => {
          const About = await import('@/pages/About');
          return { Component: About.default };
        },
        HydrateFallback: () => <Loader variant="fullscreen" />,
      },
      {
        path: '*',
        lazy: async () => {
          const NotFound = await import('@/pages/NotFound');
          return { Component: NotFound.default };
        },
        HydrateFallback: () => <Loader variant="fullscreen" />,
      },
    ],
  },
];

export const router = createBrowserRouter(routesConfig);
