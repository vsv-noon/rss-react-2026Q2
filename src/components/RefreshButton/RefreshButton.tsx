'use client';

import { useTranslations } from 'next-intl';

import styles from './RefreshButton.module.scss';

import { refreshCharacters } from '@/actions/refreshCharacters';

export default function RefreshButton() {
  const t = useTranslations('RefreshButton');

  return (
    <button
      className={styles.refreshButton}
      onClick={() => refreshCharacters()}
    >
      {t('refresh')}
    </button>
  );
}
