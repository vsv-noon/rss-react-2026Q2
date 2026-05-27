import { useState } from 'react';

import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './MainPage.module.scss';

import ResultList from '@/components/ResultList';
import SearchSection from '@/components/SearchSection';
import SelectionActionBar from '@/components/SelectionActionBar/SelectionActionBar';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

      <>
        <div className={styles.paginationBlock}>{/* <Pagination /> */}</div>
        <div className={styles.outletContainer}>
          <ResultList />
          <div onClick={(e) => e.stopPropagation()}>
            <Outlet context={{ handleCloseCharacterDetails }} />
          </div>
        </div>
      </>

      <SelectionActionBar />
    </div>
  );
};

export default MainPage;
