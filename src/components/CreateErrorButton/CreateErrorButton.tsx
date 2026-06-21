'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import styles from './CreateErrorButton.module.scss';

function CreateErrorButton() {
  const t = useTranslations('CreateErrorButton');
  const [isCrashError, setIsCrashError] = useState<boolean>(false);

  const handleCrashErrorClick = () => {
    setIsCrashError(true);
  };

  if (isCrashError) {
    throw new Error(`${t('message')}`);
  }
  return (
    <div>
      <button className={styles.crashBtn} onClick={handleCrashErrorClick}>
        {t('error')}
      </button>
    </div>
  );
}

export default CreateErrorButton;
