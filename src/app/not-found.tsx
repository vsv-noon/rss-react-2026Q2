import Link from 'next/link';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFoundTitle}>
        404 - Page Not Found <span>😕</span>
      </h1>
      <Link href="/" className={styles.notFoundBtn}>
        Home
      </Link>
    </div>
  );
}
