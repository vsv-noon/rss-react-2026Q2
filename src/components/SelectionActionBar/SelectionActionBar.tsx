import { createPortal } from 'react-dom';

import styles from './SelectionActionBar.module.scss';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSelection } from '@/store/slices/selectCardsSlice/slice';

const SelectionActionBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCards.selectedItems
  );

  if (selectedCharacters.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(clearSelection());
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
          <button className={styles.downloadBtn}>Download</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SelectionActionBar;
