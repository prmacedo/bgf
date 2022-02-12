import React, { createContext, useContext, useState, useEffect } from 'react';

const UserDataContext = createContext();

export default function UserDataContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [headers, setHeaders] = useState({});
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setHeaders({ authorization: `Bearer ${userData?.token}` });
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        user,
        headers
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  const { user, headers } = context;
  return { user, headers };
}