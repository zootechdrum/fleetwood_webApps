import React from 'react';
import grid from '../css/numberPad.module.css';


const NumberPad = ({display, getValue, innerRef}) => {
return (
    <>
        {display ? 
        <div ref={innerRef} className={grid['grid-container']}>
        <button value='1' onClick={getValue} className={grid['grid-item']}>1</button>
        <button value='2' onClick={getValue} className={grid['grid-item']}>2</button>
        <button value='3' onClick={getValue} className={grid['grid-item']}>3</button>
        <button value="4" onClick={getValue} className={grid['grid-item']}>4</button>
        <button value="5" onClick={getValue} className={grid['grid-item']}>5</button>
        <button value="6" onClick={getValue} className={grid['grid-item']}>6</button>
        <button value="7" onClick={getValue} className={grid['grid-item']}>7</button>
        <button value="8" onClick={getValue} className={grid['grid-item']}>8</button>
        <button value="9" onClick={getValue} className={grid['grid-item']}>9</button>
        <button value="reset"onClick={getValue} className={grid['grid-item']}>AC</button>
        <button value= "0" className={grid['grid-item']}>0</button>
        </div>
        : ""}
        </>
    )
}

export default NumberPad;