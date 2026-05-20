import { useState, type ChangeEvent, type SubmitEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './SearchSection.module.scss';

import type { SearchSectionProps } from './types';

import { DEFAULT_PAGE } from '@/pages/MainPage/constants';

const SearchSection: React.FC<SearchSectionProps> = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>(query);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/?page=${DEFAULT_PAGE}`);
    setQuery(inputValue.trim());
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
