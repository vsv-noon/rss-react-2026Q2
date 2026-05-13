import SearchSection from '@/components/SearchSection';
import ResultList from '@/components/ResultList';
import { useEffect, useState } from 'react';
import type { ApiResponse } from '@/types/types';

import styles from './MainPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { apiFetch } from '@/services/api';

const MainPage: React.FC = () => {
  const [query, setQuery] = useLocalStorage('searchTerm', '');
  const [characters, setCharacters] = useState<ApiResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSearch = async (searchQuery: string) => {
      try {
        setIsLoading(true);

        const data = await apiFetch({ searchString: searchQuery });

        setCharacters(data);

        setIsLoading(false);
      } catch (error) {
        const typedError = error as Error;
        throw new Error('Failed to fetch characters', typedError);
      }
    };

    handleSearch(query);
  }, [query, setCharacters, setIsLoading]);

  const handleCloseCharacterDetails = () => {
    navigate(`/`);
  };

  const handleErrorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('I crashed!');
  }

  return (
    <div
      className={styles.mainPageContainer}
      onClick={handleCloseCharacterDetails}
    >
      <SearchSection query={query} setQuery={setQuery} />
      <button className={styles.button} onClick={handleErrorClick}>
        Create an error!
      </button>
      <div className={styles.outletContainer}>
        <ResultList isLoading={isLoading} characters={characters} />
        <div onClick={(e) => e.stopPropagation()}>
          <Outlet context={{ handleCloseCharacterDetails }} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
