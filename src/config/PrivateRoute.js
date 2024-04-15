import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = () => {
        // return localStorage.getItem('user') ? true : false;
        return true;
    };

    return isAuthenticated() ? children : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
