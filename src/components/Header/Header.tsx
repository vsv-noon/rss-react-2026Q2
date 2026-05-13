import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.isActive : styles.navLink)}
        >
          Home
        </NavLink>{' '}
        | <NavLink to="/about" className={({ isActive }) => (isActive ? styles.isActive : styles.navLink)}>About</NavLink>
      </nav>
    </header>
  );
};

export default Header;
