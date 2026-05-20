import { useState, type ChangeEvent, type SubmitEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './SearchSection.module.scss';

import type { SearchSectionProps } from './types';

const SearchSection: React.FC<SearchSectionProps> = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>(query);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate('/?page=1');
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
