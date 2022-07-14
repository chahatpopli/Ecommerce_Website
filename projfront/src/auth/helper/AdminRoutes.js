import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ component: Component, ...rest }) => {
    return ( <
        Route {...rest }
        render = {
            props => (
                isAuthenticated() && isAuthenticated().user.role === 1 ?
                <
                Component {...props }
                /> : <
                Navigate to = "/signin" / >
            )
        }
        />
    );
};

export default AdminRoute;