import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";

export const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role && user.role !== 'admin') {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
};
