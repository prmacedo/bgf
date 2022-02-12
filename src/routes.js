import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ClientsLists from './pages/Client/ClientsList';
import AddClient from './pages/Client/AddClient';
import EditClient from './pages/Client/EditClient';
import Proposal from './pages/Client/Proposal';
import EditProposal from './pages/Client/EditProposal';
import Contract from './pages/Client/Contract';
import ContractRevision from './pages/Client/ContractRevision';
import AssigneeList from './pages/Assignee/AssigneeList';
import AddAssignee from './pages/Assignee/AddAssignee';
import EditAssignee from './pages/Assignee/EditAssignee';
import ManagersList from './pages/Manager/ManagersList';
import AddManager from './pages/Manager/AddManager';
import EditManager from './pages/Manager/EditManager';
import Settings from './pages/Settings';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <ProtectedRoute component={ForgotPassword} path="/forgotPassword" />
        <ProtectedRoute component={ClientsLists} path="/clients" />
        <ProtectedRoute component={AddClient} path="/addClient" />
        <ProtectedRoute component={EditClient} path="/client/:id" exact />
        <ProtectedRoute component={Proposal} path="/client/:id/new/proposal" />
        <ProtectedRoute component={EditProposal} path="/client/:id/edit/proposal/:proposalId" />
        <ProtectedRoute component={Contract} path="/client/:id/:action/contract/:documentId" exact />
        <ProtectedRoute component={ContractRevision} path="/client/:id/contract/:documentId/revision" />
        <ProtectedRoute component={AssigneeList} path="/assignees" />
        <ProtectedRoute component={AddAssignee} path="/addAssignee" />
        <ProtectedRoute component={EditAssignee} path="/assignee/:id" />
        <ProtectedRoute component={ManagersList} path="/managers" />
        <ProtectedRoute component={AddManager} path="/addManager" />
        <ProtectedRoute component={EditManager} path="/manager/:id" />
        <ProtectedRoute component={Settings} path="/settings" />
      </Switch>
    </BrowserRouter>
  )
}