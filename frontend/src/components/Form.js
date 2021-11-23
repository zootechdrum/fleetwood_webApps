import React, {useRef, useEffect} from 'react';
import NumberPad from '../components/NumberPad';
import styles from '../css/homeScreen.module.css';
import icon from '../css/fontIcon.module.css';
import {Row , Form, Button} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({
    numpadValueKeyPress, 
    numpadClick, 
    handleSubmit, 
    password,
    userName,
    numPadViewer,
    showNumPad,
    setUsername,
    setPassword,
    employeeId,
    hardSetNumPadView}) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleOutSideClick, false);
        return () => {
            document.removeEventListener("click", handleOutSideClick, false);
        }
    }, [])


    const handleOutSideClick = event => {
        if(wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            hardSetNumPadView();
        }
    }


return (
    <div  className={styles['login-card']}>
        <Form ref={wrapperRef}  className={styles['form-width']} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="text-center" controlId="exampleForm.ControlInput1">
                <Form.Label column sm="12" className="text-center">SCAN EMPLOYEE BADGE:</Form.Label>
                <Form.Control value={employeeId} onChange={numpadValueKeyPress} type="number" placeholder="Scan Badge"></Form.Control>
            </Form.Group>
            <FontAwesomeIcon className = {icon['fa-keyboards']} size='2x' icon={faKeyboard} onClick={numPadViewer} />
            <NumberPad display={showNumPad} getValue={numpadClick} />
            <p className="mt-3 text-center">OR</p> 
            <Form.Group as={Row} className="text-center" controlId="exampleForm.ControlInput1">
                <Form.Label column sm="12" className="text-center">USER LOGIN:</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" value = {userName} onChange={setUsername}></Form.Control>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 text-center" controlId="exampleForm.ControlInput1">
                <Form.Label column sm="12" className="text-center">ENTER PASSWORD:</Form.Label>
                <Form.Control type="text" placeholder="Enter Password" value={password} onChange={setPassword}></Form.Control>
            </Form.Group>
            <Form.Group as={Row} className="text-center">
                <Button variant="primary" size="lg" type="submit">Submit</Button>
            </Form.Group>
        </Form> 
    </div>
    )
}

export default LoginForm;