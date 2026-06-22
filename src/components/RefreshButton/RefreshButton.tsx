'use client';

import styles from './RefreshButton.module.scss';

import { refreshCharacters } from '@/actions/refreshCharacters';

export default function RefreshButton() {
  return (
    <button
      className={styles.RefreshButton}
      onClick={() => refreshCharacters()}
    >
      RefreshButton
    </button>
  );
}
