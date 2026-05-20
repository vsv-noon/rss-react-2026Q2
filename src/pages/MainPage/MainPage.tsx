import { useEffect, useState } from 'react';

import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { DEFAULT_PAGE } from './constants';
import styles from './MainPage.module.scss';

import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import ResultList from '@/components/ResultList';
import SearchSection from '@/components/SearchSection';
import useLocalStorage from '@/hooks/useLocalStorage';
import { apiFetch } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCharacters } from '@/store/slices/charactersSlice/charactersSlice';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.characters.characters);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState<number>(Number(DEFAULT_PAGE));

  const [persistedSearch, setPersistedSearch] = useLocalStorage(
    'searchTerm',
    ''
  );
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

        dispatch(setCharacters(data));
        setTotalPages(data.info.pages);

        if (!searchParams.has('page')) {
          setSearchParams({ page: DEFAULT_PAGE }, { replace: true });
        }
      } catch (error) {
        const typedError = error as Error;
        throw new Error('Failed to fetch characters', typedError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters(persistedSearch, currentPage);
  }, [persistedSearch, currentPage, dispatch, searchParams, setSearchParams]);

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
      <SearchSection query={persistedSearch} setQuery={setPersistedSearch} />
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
            <ResultList />
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
