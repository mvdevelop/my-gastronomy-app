
import styles from './Footer.module.css';
import logo from '../assets/img/icon.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
// import Link from 'react-router-dom';

function Footer() {
  return (
    <div className={styles.footerContainer}>
        <abbr title="MVDev_WebSite">
        <a href="https://mvdevelop.github.io/Portfolio_/" target='_blank'>
            <img src={logo} alt="" />
        </a>
        </abbr>
        
        <h3>My Gastronomy&copy;2024</h3>

        <div className={styles.footerContainerLinks}>
            <a href="" target='_blank'><FaFacebook /></a>
            <a href="" target='_blank'><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/mvdevelop" target='_blank'><FaLinkedin /></a>
            <a href="https://github.com/MvDevelop" target='_blank'><FaGithub /></a>
        </div>
    </div>
  )
}

export default Footer;
