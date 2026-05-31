import { render, screen } from '@testing-library/react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { describe, it, vi, expect, beforeEach } from 'vitest';

import { routesConfig } from './router';

vi.mock('@/services/api', () => ({
  apiFetch: vi.fn(),
}));

vi.mock('@/pages/MainPage', () => ({
  default: () => (
    <div data-testid="main-page">
      <h1>Main Page Content </h1>
      <Outlet />
    </div>
  ),
}));

vi.mock('@/components/CharacterDetails', () => ({
  default: () => <div data-testid="details-page">Character Details Panel</div>,
}));

vi.mock('@/layouts/RootLayout', () => ({
  default: () => (
    <div data-testid="root-layout">
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  ),
}));

vi.mock('@/pages/NotFound', () => ({
  default: () => <div data-testid="not-found">Page Not Found</div>,
}));

describe('Application Routing Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render RootLayout and MainPage when navigating to root "/"', async () => {
    const testRouter = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={testRouter} />);

    const mainPage = await screen.findByTestId('main-page');

    expect(screen.getByTestId('root-layout')).toBeInTheDocument();
    expect(mainPage).toBeInTheDocument();
  });

  it('should render CharacterDetails inside the Main view when navigating to "/details/42"', async () => {
    const testRouter = createMemoryRouter(routesConfig, {
      initialEntries: ['/details/42'],
    });

    render(<RouterProvider router={testRouter} />);

    const mainPage = await screen.findByTestId('main-page');
    const detailsPage = await screen.findByTestId('details-page');

    expect(mainPage).toBeInTheDocument();
    expect(detailsPage).toBeInTheDocument();
  });

  it('should render NotFound view when an invalid route is requested', async () => {
    const testRouter = createMemoryRouter(routesConfig, {
      initialEntries: ['/some/broken/link'],
    });

    render(<RouterProvider router={testRouter} />);

    const notFoundPage = await screen.findByTestId('not-found');
    expect(notFoundPage).toBeInTheDocument();
  });
});
