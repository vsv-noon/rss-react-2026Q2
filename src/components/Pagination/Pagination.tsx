import { useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';

import type { PaginationProps } from './types';

import { DEFAULT_PAGE } from '@/constants/constants';
import { useNavigateWithParams } from '@/hooks/useNavigateWithParams';

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams] = useSearchParams();
  const { navigateToPage } = useNavigateWithParams();
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    navigateToPage(validPage);
  };

  if (totalPages <= 0) return null;

  return (
    <div className={styles.pagination} onClick={(e) => e.stopPropagation()}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(DEFAULT_PAGE)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <span>
        Page {currentPage} from {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
