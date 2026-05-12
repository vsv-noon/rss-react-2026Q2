import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>
        404 - Page Not Found <span>😕</span>
      </h1>
      <Link to="/" className={styles.button}>
        Home
      </Link>
    </div>
  );
};

export default NotFound;
