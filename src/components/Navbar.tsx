import { useState } from 'react';
import { Drawer } from '@mui/material';
import { LuMenu, LuShoppingCart, LuUserCircle } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/img/icon.png';

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu((open) => !open);

  return (
    <nav className={styles.navbarContainer} aria-label="Main navigation">
      <div className={styles.navbarItems}>
        <Link to="/" aria-label="My Gastronomy home"><img src={logo} alt="My Gastronomy" /></Link>
        <h2>My Gastronomy</h2>
        <div className={styles.navbarLinksContainer}>
          <Link to="/" className={styles.navbarLink}>Home</Link>
          <Link to="/plates" className={styles.navbarLink}>Plates</Link>
          <Link to="/cart" aria-label="Shopping cart"><LuShoppingCart className={styles.navbarLink} /></Link>
          <Link to="/profile" aria-label="Profile"><LuUserCircle className={styles.navbarLink} /></Link>
        </div>
      </div>
      <div className={styles.mobileNavbarItems}>
        <Link to="/" aria-label="My Gastronomy home"><img src={logo} alt="My Gastronomy" /></Link>
        <h2>My Gastronomy</h2>
        <div className={styles.mobileNavbarBtns}>
          <Link to="/cart" aria-label="Shopping cart"><LuShoppingCart className={styles.navbarLink} /></Link>
          <button type="button" aria-label="Open menu" onClick={toggleMenu}>
            <LuMenu className={styles.navbarLink} aria-hidden="true" />
          </button>
        </div>
      </div>
      <Drawer anchor="right" open={openMenu} onClose={toggleMenu}>
        <div className={styles.drawer} aria-label="Mobile navigation">
          <Link to="/" className={styles.navbarLink} onClick={toggleMenu}>Home</Link>
          <Link to="/plates" className={styles.navbarLink} onClick={toggleMenu}>Plates</Link>
          <Link to="/profile" className={styles.navbarLink} onClick={toggleMenu}>Profile</Link>
        </div>
      </Drawer>
    </nav>
  );
}

export default Navbar;
