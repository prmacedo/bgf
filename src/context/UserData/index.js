import React, { createContext, useContext, useEffect, useState } from 'react';
import API_URL from '../../config/api';

const UserDataContext = createContext();

export default function UserDataContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});
   
  const login = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken({ authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` });
    
    API_URL.defaults.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`;
  }

  const logout = () => {
    setUser({});
    setToken({});
    localStorage.removeItem("user");

    API_URL.defaults.headers.authorization = '';
  }

  // try {
  //   API_URL.defaults.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;      
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <UserDataContext.Provider
      value={{
        user: user,
        headers: token,
        login,
        logout
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  const { user, headers, login, logout } = context;
  return { user, headers, login, logout };
}