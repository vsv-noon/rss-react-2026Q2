import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '@/pages/About';

describe('About component', () => {
  it('should render the RS School React course link with correct href and text', () => {
    render(<About />, { wrapper: MemoryRouter });
    const rsLink = screen.getByRole('link', {
      name: /RS School React course/i,
    });
    expect(rsLink).toBeInTheDocument();
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
