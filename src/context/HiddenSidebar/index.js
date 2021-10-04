import React, { createContext, useContext, useState } from 'react';

const HiddenSidebarContext = createContext();

export default function HiddenSidebarContextProvider({ children }) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <HiddenSidebarContext.Provider
      value={{
        isHidden,
        setIsHidden
      }}
    >
      {children}
    </HiddenSidebarContext.Provider>
  );
}

export function useHiddenSidebar() {
  const context = useContext(HiddenSidebarContext);
  const { isHidden, setIsHidden } = context;
  return { isHidden, setIsHidden };
}