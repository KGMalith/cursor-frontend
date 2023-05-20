import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

// Check if the user is authenticated
const isAuthenticated = () => {
    return true
};

  const ProtectedRoute: React.FC<RouteProps> = (props) => {
    // Redirect to the login page if the user is not authenticated
    if (!isAuthenticated()) {
      return <Navigate to="/" />;
    }
  
    // Render the protected route
    return <Route {...props} />;
  };
  
  export default ProtectedRoute;