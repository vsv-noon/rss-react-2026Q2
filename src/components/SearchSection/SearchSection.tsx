import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from './SearchSection.module.scss';

import { DEFAULT_PAGE } from '@/constants/constants';
import useLocalStorage from '@/hooks/useLocalStorage';

const SearchSection: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [persistedSearch, setPersistedSearch] = useLocalStorage(
    'searchTerm',
    ''
  );
  const [inputValue, setInputValue] = useState<string>(persistedSearch);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (!searchParams.has('page')) {
      newParams.set('page', String(DEFAULT_PAGE));
    }

    if (persistedSearch) {
      newParams.set('name', persistedSearch);
    }

    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParams = new URLSearchParams(searchParams);
    if (inputValue) {
      newParams.set('name', inputValue);
    } else {
      newParams.delete('name');
    }
    newParams.set('page', String(DEFAULT_PAGE));

    setSearchParams(newParams);

    setPersistedSearch(inputValue.trim());
    setInputValue(inputValue.trim());
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
