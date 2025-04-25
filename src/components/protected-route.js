import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/auth.context';

const ProtectedRoute = () => {
  const auth = useAuth();
  if (!auth.isSignedIn) return <Navigate to='/login' />;

  return <Outlet />;
};

export default ProtectedRoute;
