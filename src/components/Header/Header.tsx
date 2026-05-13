import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.isActive : styles.navLink
          }
          viewTransition
        >
          Home
        </NavLink>{' '}
        |{' '}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.isActive : styles.navLink
          }
          viewTransition
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
