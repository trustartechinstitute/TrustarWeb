import * as React from "react";
import { useState, useEffect, createContext, useContext } from 'react';

/**
 * UI-ONLY AUTH MOCKUP
 * ------------------
 * This hook simulates authentication to allow you to navigate the UI
 * and develop pages without a backend.
 */

const AuthContext = createContext<any>(null);

const STORAGE_KEY = 'trustar_mock_user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking session locally
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    // Mock login logic - automatically succeeds for anyone
    // You can customize the mock user object here
    const mockUser = {
      id: "mock_id_123",
      email: email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'student',
      points: 120,
      coinBalance: 450,
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const signup = async (email: string, password: string) => {
    return login(email, password);
  };

  const refreshUser = async () => {
    // Boilerplate for refreshing state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
