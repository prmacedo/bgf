import React, { createContext, useContext } from 'react';

const UserDataContext = createContext();

export default function UserDataContextProvider({ children }) {

  return (
    <UserDataContext.Provider
      value={{
        user: JSON.parse(localStorage.getItem("user")),
        headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` }
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