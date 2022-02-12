import React from 'react';

import Routes from './routes';
import HiddenSidebarContextProvider from './context/HiddenSidebar';
import UserDataContextProvider from './context/UserData';

import './global.css';

function App() {
  return (
    <UserDataContextProvider>
      <HiddenSidebarContextProvider>
        <Routes />
      </HiddenSidebarContextProvider>
    </UserDataContextProvider>
  );
}

export default App;