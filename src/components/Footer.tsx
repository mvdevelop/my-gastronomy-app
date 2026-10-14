import styles from './Footer.module.css';
import logo from '../assets/img/icon.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <abbr title="MVDev_WebSite">
        <a href="https://mvdevelop.github.io/Portfolio_/" target="_blank" rel="noreferrer">
          <img src={logo} alt="MVDev portfolio" />
        </a>
      </abbr>
      <h3>My Gastronomy&copy;2024</h3>
      <div className={styles.footerContainerLinks}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/mvdevelop" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="https://github.com/MvDevelop" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
      </div>
    </footer>
  );
}

export default Footer;
