import React from 'react';
import { Route, Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Switch>
      <Route path="/signin">
        <SignIn />
      </Route>
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
