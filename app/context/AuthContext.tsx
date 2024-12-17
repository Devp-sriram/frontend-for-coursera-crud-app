'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

export interface Data{
  firstname : string,
  lastname : string,
  dep : string,
  _id : string,
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

  

  const login = (user: any) :void => {
    setAuthState(prevState => ({
      ...prevState,
      isAuthenticated: true,
      user
    }));
    localStorage.setItem('user', JSON.stringify(user));
  };



const create = (newData: Data[]) => {
  const updatedUser = {
    ...authState.user,
    data: [...authState.user.data, ...newData.filter(item => 
      !authState.user.data.some((existingItem : Data) => existingItem._id === item._id)
    )]
  };

  setAuthState(prevState => ({
    ...prevState,
    user: updatedUser
  }));

};



useEffect(() => {
      if(authState.user !== null || "" || false){
          localStorage.setItem('user', JSON.stringify(authState.user));
      }
  }, [authState]);


  {/*const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem('user');
  };*/}

  return (
    <AuthContext.Provider value={{ ...authState, login , create }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

