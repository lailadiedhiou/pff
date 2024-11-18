import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, allowedRoles, children }) => {
    const userRole = localStorage.getItem('role');

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
