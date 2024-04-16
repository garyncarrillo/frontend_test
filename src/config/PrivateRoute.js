import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { getAccessToken } from './libs/user';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = () => {
        return  getAccessToken() ? true : false;
    };

    return isAuthenticated() ? children : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
