import { Link } from 'react-router-dom';
import { GITHUB_LINK } from '@/constants/constants';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      &copy; 2026 by{' '}
      <Link
        className={styles.footerLink}
        to={GITHUB_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        vsv-noon
      </Link>
    </footer>
  );
};

export default Footer;
