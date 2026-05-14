import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '.';

describe('Loader', () => {
  it('should renders without crashing', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
