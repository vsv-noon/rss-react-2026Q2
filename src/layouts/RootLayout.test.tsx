import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';

import RootLayout from './RootLayout';

vi.mock('@/components/Header', () => ({
  default: () => <header data-testid="mock-header">Mocked Header</header>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <footer data-testid="mock-footer">Mocked Footer</footer>,
}));

describe('RootLayout Component Suite', () => {
  it('should render the layout skeleton with Header and Footer components', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should apply the correct SCSS style class names to the containers', () => {
    const { container } = render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    const mainContainerElement = screen.getByRole('main');
    expect(mainContainerElement).toHaveClass(/mainContent/);
    expect(container.firstChild).toHaveClass(/rootLayout/);
  });

  it('should correctly render nested child route nodes through the Outlet component slot', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route
              index
              element={
                <div data-testid="test-child-view">Home Sub-View Content</div>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const childViewMode = screen.getByTestId('test-child-view');
    expect(childViewMode).toBeInTheDocument();
    expect(screen.getByRole('main')).toContainElement(childViewMode);
  });
});
