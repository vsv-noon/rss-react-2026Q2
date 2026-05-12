import SearchSection from '@/components/SearchSection';
import ResultList from '@/components/ResultList';
import { useState } from 'react';
import type { FetchedCharacter } from '@/types/types';

import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const [fetchedCharacter, setFetchedCharacter] =
    useState<FetchedCharacter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleErrorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('I crashed!');
  }

  return (
    <div className={styles.mainPageContainer}>
      <SearchSection
        setIsLoading={setIsLoading}
        setFetchedCharacter={setFetchedCharacter}
      />
      <button
        className={styles.button}
        onClick={handleErrorClick}
      >
        Create an error!
      </button>
      <ResultList isLoading={isLoading} fetchedCharacter={fetchedCharacter} />
    </div>
  );
};

export default MainPage;
