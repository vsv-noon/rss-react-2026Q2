import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useTheme } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';

const TestConsumer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    vi.clearAllMocks();
  });

  it('should initialize with light theme by default and update the DOM and localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('light');

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should toggle theme from light to dark and update dependencies', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle/i });

    expect(screen.getByTestId('theme-value').textContent).toBe('light');

    await user.click(toggleButton);

    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(toggleButton);

    expect(screen.getByTestId('theme-value').textContent).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
