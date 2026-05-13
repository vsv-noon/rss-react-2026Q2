import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { GITHUB_LINK } from '@/constants/constants';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      &copy; 2026 by{' '}
      <Link to={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
        vsv-noon
      </Link>
    </footer>
  );
};

export default Footer;
