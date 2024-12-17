'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchData } from '../login/page';

// D types
export interface Data{
  firstname : string,
  lastname : string,
  dep : string,
  _id : string,
}

export interface User{
    _id: string,
    email: string,
    password: string,
    company: string,
    data: [Data],
    createdAt: string,
    updatedAt:string,
    __v: number 
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

const AuthContext : any = createContext({ isAuthenticated: false, user: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: "",
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

  const update = async (id : string)=>{
    try{
      const response = await fetchData(authState.user.email,authState.user.password)
      if(response){
        let updatedEmployee = response.data.data.find( (data : Data) => data._id === id)
        if (updatedEmployee){
          setAuthState(prevState => ({
            ...prevState,
            user: {
              ...prevState.user,
              data: prevState.user.data.map((item : Data) => 
                item._id === id ? updatedEmployee : item
              )
            }
          })
          )
        };
        localStorage.setItem('user', JSON.stringify(response.data));  
      }
    }catch(error: any){
      console.log(error)
    }
  };
    
  const deleteData = async (id : string)=>{
    setAuthState(prev => ({
      ...prev,
      user : {
        ...prev.user,
        data: prev.user.data.filter((data : Data) => data._id !== id)
      }
    }))
  } 

  useEffect(() => {
      if(authState.user.data){
          localStorage.setItem('user', JSON.stringify(authState.user));
      }
  }, [authState]);


  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login , logout , create , update , deleteData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

