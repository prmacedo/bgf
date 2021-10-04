import React from 'react';

import Routes from './routes';
import HiddenSidebarContextProvider from './context/HiddenSidebar';

import './global.css';

function App() {
  return (
    <HiddenSidebarContextProvider>
      <Routes />
    </HiddenSidebarContextProvider>
  );
}

export default App;