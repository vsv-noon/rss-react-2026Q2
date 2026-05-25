import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';

import { DEFAULT_PAGE } from '@/constants/constants';
import { useAppSelector } from '@/store/hooks';

const Pagination: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || DEFAULT_PAGE;
  const totalPages = useAppSelector((state) => state.characters.totalPages);

  const isPageInvalid =
    isNaN(Number(currentPage)) ||
    Number(currentPage) < Number(DEFAULT_PAGE) ||
    Number(currentPage) > totalPages;

  if (isPageInvalid) {
    navigate(`/?page=1`);
  }

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));

    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', String(validPage));

    navigate(`/?${newParams.toString()}`);
  };

  if (totalPages <= 0) return null;

  return (
    <div className={styles.pagination} onClick={(e) => e.stopPropagation()}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(Number(DEFAULT_PAGE))}
        disabled={Number(currentPage) === 1}
      >
        {'<<'}
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(Number(currentPage) - 1)}
        disabled={Number(currentPage) === 1}
      >
        {'<'}
      </button>
      <span>
        Page {Number(currentPage)} from {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(Number(currentPage) + 1)}
        disabled={Number(currentPage) === totalPages}
      >
        {'>'}
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(totalPages)}
        disabled={Number(currentPage) === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
