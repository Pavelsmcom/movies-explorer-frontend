import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ loggedIn, isBlockedForAuthUser = false, children }) => {
  return loggedIn ? !isBlockedForAuthUser ? children : <Navigate to="/" replace /> : isBlockedForAuthUser ? children : <Navigate to="/" replace />;
};

export default ProtectedRouteElement;
