import type { PaginationProps } from './types';
import styles from './Pagination.module.scss';
import { DEFAULT_PAGE } from '@/pages/MainPage/constants';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination} onClick={(e) => e.stopPropagation()}>
      <button
        className={styles.button}
        onClick={() => onPageChange(+DEFAULT_PAGE)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <span>
        Page {currentPage} from {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button
        className={styles.button}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
