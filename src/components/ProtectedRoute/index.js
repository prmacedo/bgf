import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component, path }) {
  const isAuthenticated = JSON.parse(localStorage.getItem('user'))?.token;

  return (
    <>
      {
        isAuthenticated ?
        <Route 
          path={ path }
          component={ component }
        />
        :
        <Redirect to={'/'} />
      }

    </>
  )
}