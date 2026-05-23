import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import Header from './Header';

import { ThemeContext } from '@/context/ThemeContext';

describe('Footer component', () => {
  const mockToggleTheme = vi.fn();
  const theme = 'dark';

  it('should render link in Footer', () => {
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme: mockToggleTheme }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeContext.Provider>
    );
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/'
    );

    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });
});
