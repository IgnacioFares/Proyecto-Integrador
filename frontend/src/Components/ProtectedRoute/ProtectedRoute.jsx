// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../Utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;