import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './SearchSection.module.scss';

import { DEFAULT_PAGE } from '@/constants/constants';
import useLocalStorage from '@/hooks/useLocalStorage';

const SearchSection: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [persistedSearch, setPersistedSearch] = useLocalStorage(
    'searchTerm',
    ''
  );
  const [inputValue, setInputValue] = useState<string>(persistedSearch);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    let hasChanged = false;

    if (!currentParams.has('page')) {
      currentParams.set('page', String(DEFAULT_PAGE));
      hasChanged = true;
    }

    if (!currentParams.has('name') && persistedSearch) {
      currentParams.set('name', persistedSearch);
    }

    if (hasChanged) {
      router.push(`${pathname}?${currentParams.toString()}`);
    }
  }, [persistedSearch, pathname, router]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentParams = new URLSearchParams(searchParams?.toString());
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      currentParams.set('name', trimmedValue);
    } else {
      currentParams.delete('name');
    }
    currentParams.set('page', String(DEFAULT_PAGE));

    router.push(`${pathname}?${currentParams.toString()}`);

    setPersistedSearch(trimmedValue);
    setInputValue(trimmedValue);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchSection}>
      <input
        className={styles.input}
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        autoComplete="off"
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchSection;
