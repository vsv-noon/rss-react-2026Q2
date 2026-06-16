'use client';

import { useRef } from 'react';

import { createPortal } from 'react-dom';

import styles from './SelectionActionBar.module.scss';

import type { FileItem } from './types';
import type { CSVColumnConfig } from '@/utils/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSelection } from '@/store/slices/selectCardsSlice/slice';
import { downloadCSV } from '@/utils/csvDownloader';

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
    const csvConfig: CSVColumnConfig<FileItem>[] = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status' },
      { key: 'species', label: 'Species' },
      { key: 'url', label: 'url' },
    ];

    downloadCSV(
      selectedCharacters,
      csvConfig,
      `${selectedCharacters.length}_selectedCharacters.csv`,
      linkRef
    );
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
