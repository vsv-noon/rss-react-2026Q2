'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
// import { Outlet } from 'react-router-dom';

import styles from './page.module.scss';

import ResultList from '@/components/ResultList';
import SearchSection from '@/components/SearchSection';
import SelectionActionBar from '@/components/SelectionActionBar/SelectionActionBar';

export default function MainPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isCrashError, setIsCrashError] = useState<boolean>(false);

  const handleCloseCharacterDetails = () => {
    router.push(`/?${searchParams?.toString()}`);
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
        </div>
      </>

      <SelectionActionBar />
    </div>
  );
}
