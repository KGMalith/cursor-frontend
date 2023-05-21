import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../services/utils/auth';

// Check if the user is authenticated
const isAuthenticated = () => {
  return getAccessToken() ? true : false
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated() ? children : <Navigate to="/" />;
}

export default ProtectedRoute;