'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import styles from './page.module.scss';

import ResultList from '@/components/ResultList';
import SearchSection from '@/components/SearchSection';
import SelectionActionBar from '@/components/SelectionActionBar/SelectionActionBar';

export default function MainPage() {
  const t = useTranslations('Home');
  const [isCrashError, setIsCrashError] = useState<boolean>(false);

  const handleCrashErrorClick = () => {
    setIsCrashError(true);
  };

  if (isCrashError) {
    throw new Error('I crashed!');
  }

  return (
    <div className={styles.mainPageContainer}>
      <SearchSection />
      <button className={styles.crashBtn} onClick={handleCrashErrorClick}>
        {t('error')}
      </button>

      <h1 className={styles.title}>{t('title')}</h1>

      <>
        <div className={styles.outletContainer}>
          <ResultList />
        </div>
      </>

      <SelectionActionBar />
    </div>
  );
}
