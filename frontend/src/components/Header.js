import React from 'react';
import styles from '../css/header.module.css';
import fleet_logo from '../images/Fleetwood.png'

const Header = () => {
return (
    <div className={styles['header-container']}>
       <img className = {styles['fleetwood-logo']} src={fleet_logo} alt="fleetwood-logo"/> 
    </div>
    )
}

export default Header;