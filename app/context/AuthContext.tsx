'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

const AuthContext : any = createContext({ isAuthenticated: false, user: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({ ...authState,isAuthenticated: true, user: JSON.parse(storedUser) });
    }
  }, []);

  const login = (user: any) => {
    setAuthState({...authState,isAuthenticated: true, user });
    console.log(user);
    console.log(authState.isAuthenticated, authState.user)
    
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

