import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/Form';
import AlertNotification from '../components/Alert';
import Session from 'react-session-api';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeScreen = () => {
    let navigate = useNavigate();

    const [userName, setUsername]       = useState('');
    const [password, setPassword]       = useState('');
    const [showNumPad, setShowNumPad]   = useState(false);
    const [employeeId, setEmployeeId]   = useState('');
    const [showAlert, setShowAlert]     = useState(false);
    const [textOnAlert, setTextOnAlert] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(userName === "" && password === "" && employeeId === "") {
            setTextOnAlert("Please fill out form to log in")
            return setShowAlert(true);
        }
        setShowAlert(false);
        login();
    }

    const numpadValueKeyPress = (e) => {
        e.preventDefault()
        setEmployeeId(e.target.value)
    }

    const hardSetShowValue = () => {
        setShowNumPad(false)
    }

    const trackUsernameValues = (e) => {
        setUsername(e.target.value)
    }

    const trackPassword = (e) => {
        setPassword(e.target.value)
    }

    const numpadValueClick = (e) => {
        e.preventDefault();
        if(e.target.value === 'reset'){
            return setEmployeeId('');
        } else {
        setEmployeeId(employeeId + e.target.value)
        }
    }


    const numPadViewer = () => {
        setShowNumPad(!showNumPad)
    }

    async function login() {
      const params = {
          username: userName,
          password:password,
          employeeId:employeeId
      };

      let resp = await fetch("/login", {
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(params)
      });

      resp = await resp.json();
      if(resp['token']){
        Session.set("login", "success");
        navigate('/menu')
     } else {
        setShowAlert(true);
        setTextOnAlert(resp['error'])
     }
    }

    return (
        <>
            <Header />
        {showAlert && <AlertNotification color={'danger'} text={textOnAlert} />}
            <LoginForm 
                numpadValueKeyPress={numpadValueKeyPress} 
                numpadClick={numpadValueClick} 
                handleSubmit={handleSubmit} 
                userName={userName}
                password={password}
                showNumPad={showNumPad}
                employeeId={employeeId}
                numPadViewer={numPadViewer}
                setUsername={trackUsernameValues}
                setPassword={trackPassword}
                employeeId={employeeId}
                hardSetNumPadView={hardSetShowValue}
                 />
        </>
    )
}

export default HomeScreen
