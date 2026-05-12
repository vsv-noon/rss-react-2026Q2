import { useEffect, useState } from 'react';

const useLocalStorage = (
  key: string,
  initialValue: string = ''
): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? item : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, storedValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
