import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/authentication';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = getCurrentUser();
    const location = useLocation();

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Role not authorized, redirect to dashboard or home
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
