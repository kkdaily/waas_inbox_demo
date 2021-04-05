import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Inbox from '../containers/Inbox';
import PrivateRoute from "./PrivateRoute";
import SignIn from "../containers/SignIn";

function App() {
  return (
    <>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <PrivateRoute path="/conversations">
          <Inbox />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/conversations" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
