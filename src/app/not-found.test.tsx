import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import NotFound from '@/app/not-found';

describe('NotFound Component', () => {
  it('should render the NotFound component with correct text', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/😕/i)).toBeInTheDocument();
  });

  it('should render a link to the home page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
