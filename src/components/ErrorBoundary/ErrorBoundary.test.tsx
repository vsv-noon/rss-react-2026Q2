import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

const BuggyComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  test('renders children when no errors occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Child')).toBeInTheDocument();
  });

  test('renders fallback UI when an error is throw', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Go to the home page, please')).toBeInTheDocument();
    expect(screen.getByAltText('error')).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  test('calls console.error when an error is caught', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
