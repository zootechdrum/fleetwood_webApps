import React, {useEffect} from 'react';
import Header from '../components/Header';
import style from '../css/menu.module.css';

import {useNavigate} from 'react-router-dom';
    


import 'bootstrap/dist/css/bootstrap.min.css';

const MenuScreen = () => {
      let navigate = useNavigate();

    useEffect(() => {
        fetch("/auth", {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("rememberMe")
            }
        })
        .then(resp => resp.json())
        .then(data => console.log(data));
    },[])

    const logoutUser = () => {
     localStorage.setItem("rememberMe", "") 
              navigate('/');
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
          <button class={style['menuItems']} type="">Receiving</button>  
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
