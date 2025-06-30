import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth(); 
    const location = useLocation();

    if (isLoading) {
        return <div>Loading authentication...</div>; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userHasRequiredRole = user.roles && user.roles.some(role => allowedRoles.includes(role));

    if (!userHasRequiredRole) {
        // Nếu không có quyền, chuyển hướng đến trang unauthorized
        return <Navigate to="/unauthorized" replace />;
    }

    // Nếu có quyền, hiển thị component con
    return children;
};

export default ProtectedRoute;