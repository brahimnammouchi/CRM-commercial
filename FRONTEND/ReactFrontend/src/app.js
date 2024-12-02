import React from 'react';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './views/login';
import Profile from './Profile';
import Dashboard from 'views/Dashboard';

function App() {
  const token = localStorage.getItem('accessToken');

  if(!token) {
    return <Signin/>
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <Dashboard />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;