import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <p>Loading...</p>
      <img src="./spinner.png" alt="loading..." />
    </div>
  );
};

export default Loader;
