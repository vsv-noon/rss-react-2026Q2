import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import type { SearchSectionProps } from './types';
import styles from './SearchSection.module.scss';

const SearchSection: React.FC<SearchSectionProps> = ({ query, setQuery }) => {
  const [inputValue, setInputValue] = useState<string>(query);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchButton = () => {
    setQuery(inputValue.trim());
    setInputValue(inputValue.trim());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setQuery(inputValue.trim());
      setInputValue(inputValue.trim());
    }
  };

  return (
    <div className={styles.searchSection}>
      <input
        className={styles.input}
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        autoComplete="off"
      />
      <button className={styles.button} onClick={handleSearchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchSection;
