import SearchSection from '@/components/SearchSection';
import ResultList from '@/components/ResultList';
import { useEffect, useState } from 'react';
import type { ApiResponse } from '@/types/types';

import styles from './MainPage.module.scss';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { apiFetch } from '@/services/api';
import Pagination from '@/components/Pagination';
import { DEFAULT_PAGE } from './constants';
import Loader from '@/components/Loader';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [characters, setCharacters] = useState<ApiResponse | null>(null);

  const [query, setQuery] = useLocalStorage('searchTerm', '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCharacters = async (searchQuery: string, page: number) => {
      try {
        setIsLoading(true);

        const data = await apiFetch({
          searchString: searchQuery,
          page: String(page),
        });

        setCharacters(data);
        setTotalPages(data.info.pages);

        if (!searchParams.has('page')) {
          setSearchParams({ page: '1' }, { replace: true });
        }
      } catch (error) {
        const typedError = error as Error;
        throw new Error('Failed to fetch characters', typedError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters(query, currentPage);
  }, [query, currentPage, setCharacters, searchParams, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    const searchString = `?page=${newPage}`;

    navigate(`/${searchString}`);
  };

  const handleCloseCharacterDetails = () => {
    navigate(`/?${searchParams}`);
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

      <h1 className={styles.title}>Rick and Morty</h1>

      {isLoading && <Loader />}
      {!isLoading && !characters?.error && (
        <>
          <div className={styles.paginationBlock}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div className={styles.outletContainer}>
            <ResultList characters={characters} />
            <div onClick={(e) => e.stopPropagation()}>
              <Outlet context={{ handleCloseCharacterDetails }} />
            </div>
          </div>
        </>
      )}
      {!isLoading && characters?.error && <h3>{`${characters.error}`}</h3>}
    </div>
  );
};

export default MainPage;
