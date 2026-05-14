import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [value] = result.current;

    expect(value).toBe('default');
  });

  it('should initialize with value from localStorage if available', () => {
    localStorage.setItem(key, 'storedValue');

    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [value] = result.current;

    expect(value).toBe('storedValue');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'initial'));

    act(() => {
      const [, setValue] = result.current;
      setValue('newValue');
    });

    expect(localStorage.getItem(key)).toBe('newValue');
    const [value] = result.current;
    expect(value).toBe('newValue');
  });
});
