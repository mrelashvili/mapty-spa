import Logo from './Logo';
import AppNav from './AppNav';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <footer className={styles.footer}>
        <p className={styles.copyright}>&coy: Copyright</p>
      </footer>
    </div>
  );
};

export default Sidebar;
