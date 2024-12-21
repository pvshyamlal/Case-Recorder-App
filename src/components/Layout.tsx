import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

export function Layout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}