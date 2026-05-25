import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './SearchSection.module.scss';

import { DEFAULT_PAGE } from '@/constants/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppDispatch } from '@/store/hooks';
import { fetchCharacters } from '@/store/slices/charactersSlice';

const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || DEFAULT_PAGE;
  const [persistedSearch, setPersistedSearch] = useLocalStorage(
    'searchTerm',
    ''
  );
  const [inputValue, setInputValue] = useState<string>(persistedSearch);

  useEffect(() => {
    const promise = dispatch(
      fetchCharacters({ searchQuery: persistedSearch, page: currentPage })
    );

    return () => {
      promise.abort();
    };
  }, [persistedSearch, currentPage, dispatch]);

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: DEFAULT_PAGE }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/?page=${DEFAULT_PAGE}`);
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
