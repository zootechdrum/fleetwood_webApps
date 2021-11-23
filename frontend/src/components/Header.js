import React from 'react';
import styles from '../css/header.module.css';
import fleet_logo from '../images/Fleetwood.png';
import { Link } from "react-router-dom";
import Session from 'react-session-api';

const Header = () => {
const isLoggedIn = Session.get('login') === 'success' ? '/menu' : "/";
return (
    <div className={styles['header-container']}>
       <Link to={isLoggedIn}><img className = {styles['fleetwood-logo']} src={fleet_logo} alt="fleetwood-logo"/></Link>
    </div>
    )
}

export default Header;