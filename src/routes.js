import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ClientsLists from './pages/Client/ClientsList';
import ManagersList from './pages/Manager/ManagersList';
import AddManager from './pages/Manager/AddManager';
import EditManager from './pages/Manager/EditManager';
import Settings from './pages/Settings';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={ForgotPassword} path="/forgotPassword" />
        <Route component={ClientsLists} path="/clients" />
        <Route component={ManagersList} path="/managers" />
        <Route component={AddManager} path="/addManager" />
        <Route component={EditManager} path="/manager" />
        <Route component={Settings} path="/settings" />
      </Switch>
    </BrowserRouter>
  )
}