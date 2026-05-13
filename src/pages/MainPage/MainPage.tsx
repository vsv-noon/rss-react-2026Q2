import SearchSection from '@/components/SearchSection';
import ResultList from '@/components/ResultList';
import { useState } from 'react';
import type { FetchedCharacter } from '@/types/types';

import styles from './MainPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [fetchedCharacter, setFetchedCharacter] =
    useState<FetchedCharacter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

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
      <SearchSection
        setIsLoading={setIsLoading}
        setFetchedCharacter={setFetchedCharacter}
      />
      <button className={styles.button} onClick={handleErrorClick}>
        Create an error!
      </button>
      <div className={styles.outletContainer}>
        <ResultList isLoading={isLoading} fetchedCharacter={fetchedCharacter} />
        <div onClick={(e) => e.stopPropagation()}>
          <Outlet context={{handleCloseCharacterDetails}} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
