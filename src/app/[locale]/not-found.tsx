import { useTranslations } from 'next-intl';

import styles from './not-found.module.scss';

import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFoundTitle}>
        {t('404')} <span>😕</span>
      </h1>
      <Link href="/" className={styles.notFoundBtn}>
        {t('home')}
      </Link>
    </div>
  );
}
