
import styles from './Navbar.module.css';
import logo from '../assets/img/icon.png';
import { LuMenu, LuShoppingCart, LuUserCircle } from 'react-icons/lu';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [ openMenu, setOpenMenu ] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarItems}>
          <Link to={'/'}>
            <img src={logo} alt="" />
          </Link>
          <h2>My Gastronomy</h2>
          <div className={styles.navbarLinksContainer}>
            <Link to={'/'} className={styles.navbarLink}>Home</Link>
            <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
            <Link to={'/cart'}>
              <LuShoppingCart className={styles.navbarLink}/>
            </Link>
            <Link to={'/profile'}>
              <LuUserCircle className={styles.navbarLink}/>
            </Link>
          </div>
      </div>

      <div className={styles.mobileNavbarItems}>
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
        <h2>My Gastronomy</h2>
          <div className={styles.mobileNavbarBtns}>
            <Link to={'/cart'}>
              <LuShoppingCart className={styles.navbarLink}/>
            </Link>
            <LuMenu className={styles.navbarLink} onClick={handleOpenMenu}/>
          </div>
      </div>
      <Drawer
      anchor='right'
      open={openMenu}
      onClose={handleOpenMenu}>
      <div className={styles.drawer}>
        <Link to={'/'} className={styles.navbarLink} onClick={handleOpenMenu}>Home</Link>
        <Link to={'/plates'} className={styles.navbarLink} onClick={handleOpenMenu}>Plates</Link>
        <Link to={'/profile'} className={styles.navbarLink} onClick={handleOpenMenu}>Profile</Link>
      </div>
      </Drawer>
    </nav>
  )
}

export default Navbar;
