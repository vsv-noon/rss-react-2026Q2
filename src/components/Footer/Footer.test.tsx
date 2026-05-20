import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import Footer from './Footer';

describe('Footer component', () => {
  it('should render link in Footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /vsv-noon/i });
    expect(link).toHaveAttribute('href', 'https://github.com/vsv-noon');
  });
});
