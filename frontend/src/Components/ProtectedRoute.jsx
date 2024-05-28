// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

