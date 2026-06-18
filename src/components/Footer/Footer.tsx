import styles from './Footer.module.scss';

import { GITHUB_LINK } from '@/constants/constants';
import { Link } from '@/i18n/navigation';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      &copy; 2026{' '}
      <Link
        className={styles.footerLink}
        href={GITHUB_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        vsv-noon
      </Link>
    </footer>
  );
};

export default Footer;
