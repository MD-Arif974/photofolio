import photoIcon from '../../images/album.png';
import styles from './navbar.module.css';

const Navbar = () => {

    return(
         <>
            <div className={styles.nav}>
                 <img src={photoIcon} alt="photofolio-icon" />
                 <h3>PhotoFolio</h3>
            </div>
         </>
    )
}

export default Navbar;