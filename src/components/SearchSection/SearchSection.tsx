import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { apiFetch } from '@/services/api';
import type { FetchedCharacter } from '@/types/types';
import useLocalStorage from '@/hooks/useLocalStorage';

import styles from './SearchSection.module.scss';

type SearchSectionProps = {
  setFetchedCharacter: (response: FetchedCharacter) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const SearchSection: React.FC<SearchSectionProps> = ({
  setFetchedCharacter,
  setIsLoading,
}) => {
  const [query, setQuery] = useLocalStorage('searchTerm', '');
  const [inputValue, setInputValue] = useState<string>(query);

  useEffect(() => {
    const handleSearch = async (searchQuery: string) => {
      try {
        setIsLoading(true);

        const fetchedCharacter = await apiFetch({ searchString: searchQuery });

        setFetchedCharacter(fetchedCharacter);

        setIsLoading(false);
      } catch (error) {
        const typedError = error as Error;
        throw new Error('Failed to fetch characters', typedError);
      }
    };

    handleSearch(query);
  }, [query, setFetchedCharacter, setIsLoading]);

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
