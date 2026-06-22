'use client';

import { useRef } from 'react';

import { createPortal } from 'react-dom';

import styles from './SelectionActionBar.module.scss';

import { userCsvConfig } from '@/features/users/csvConfig';
import { downloadCsvFile } from '@/lib/client/downloadCSV';
import { convertToCsv } from '@/lib/utils/csv';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSelection } from '@/store/slices/selectCardsSlice/slice';

const SelectionActionBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCards.selectedItems
  );
  const linkRef = useRef<HTMLAnchorElement>(null);

  if (selectedCharacters.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(clearSelection());
  };

  const handleDownload = (): void => {
    const csv = convertToCsv(selectedCharacters, userCsvConfig);

    if (csv) {
      downloadCsvFile(
        csv,
        `${selectedCharacters.length}_selectedCharacters.csv`
      );
    }
  };

  return createPortal(
    <div className={styles.selectionActionBar}>
      <div className={styles.barContent}>
        <div className={styles.barText}>
          Selected items: <span>{selectedCharacters.length}</span>
        </div>

        <div className={styles.barActions}>
          <button className={styles.unselectBtn} onClick={handleUnselectAll}>
            Unselect all
          </button>
          <button className={styles.downloadBtn} onClick={handleDownload}>
            Download
          </button>
          <a className={styles.hidden} ref={linkRef}></a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SelectionActionBar;
