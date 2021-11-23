import React from 'react';
import {Navigate} from 'react-router-dom';
import Session from 'react-session-api';

const ProtectedRoute = ({children}) => {
    const auth = Session.get('login') !== "success" ? false : true
    return auth ? children : <Navigate to="/" />
}

export default ProtectedRoute 
