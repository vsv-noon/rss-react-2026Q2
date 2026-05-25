import { useState } from 'react';

import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './MainPage.module.scss';

import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import ResultList from '@/components/ResultList';
import SearchSection from '@/components/SearchSection';
import SelectionActionBar from '@/components/SelectionActionBar/SelectionActionBar';
import { useAppSelector } from '@/store/hooks';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { characters, isLoading, error } = useAppSelector(
    (state) => state.characters
  );
  const [isCrashError, setIsCrashError] = useState<boolean>(false);

  const handleCloseCharacterDetails = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  const handleCrashErrorClick = () => {
    setIsCrashError(true);
  };

  if (isCrashError) {
    throw new Error('I crashed!');
  }

  return (
    <div
      className={styles.mainPageContainer}
      onClick={handleCloseCharacterDetails}
    >
      <SearchSection />
      <button className={styles.crashBtn} onClick={handleCrashErrorClick}>
        Create an error!
      </button>

      <h1 className={styles.title}>Rick and Morty</h1>

      {isLoading && <Loader />}
      {!isLoading && !error && !characters?.error && (
        <>
          <div className={styles.paginationBlock}>
            <Pagination />
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
      {!isLoading && error && <h3>{`${error}`}</h3>}
      <SelectionActionBar />
    </div>
  );
};

export default MainPage;
