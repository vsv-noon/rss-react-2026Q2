import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.spinner} role="status" aria-label="Loading"></div>
  );
};

export default Loader;
