import React from 'react';
import Header from '../components/Header';
import style from '../css/menu.module.css';
import Session from 'react-session-api';

import {
  Link
} from "react-router-dom";

import {useNavigate} from 'react-router-dom';
    


import 'bootstrap/dist/css/bootstrap.min.css';

const MenuScreen = () => {
      let navigate = useNavigate();

      const logoutUser = () => {
      navigate('/');
      Session.clear()
    }

    return (
        <>
        <Header />
        <div class={style['menu-container']}>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Shop Floor(Auto Scan)</button>  
        </div>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Shipping</button>  
        </div>
        <div className={style['btn-container']}>
          <Link to="/receivingStage"><button class={style['menuItems']} type="">Receiving Stage</button></Link>  
        </div>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Inventory</button>  
        </div>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Quote / Orders</button>  
        </div>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Material Request</button>  
        </div>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Production Staging</button>  
        </div>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Production Monitor</button>  
        </div>
        <div className={style['btn-container']}>
          <button class={style['menuItems']} type="">Material Request Monitor</button>  
        </div>
        <div className={style['btn-container']}>
          <button value="reset" class={style['menuItems']} onClick={logoutUser}type="">Logout</button>  
        </div>
        </div>
        </>
    )
}

export default MenuScreen
