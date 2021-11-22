import React, { useState } from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from  '../CSS/scrollButton.module.css'


const ScrollToTopBtn = () => {

    const [visible,setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;

        if(scrolled > 300) {
            setVisible(true);
        }
        else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div>
        {visible && (
            <Button className={styles.btns} variant="primary" onclick={scrollToTop} >
                <FaArrowCircleUp />
            </Button>
        )}
        </div>
    )
}

export default ScrollToTopBtn;