import React from "react";
//import Routes from "../routes/Index";

//export default props => <>{Routes}</>;

// //import './styles/App.scss';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Inbox from '../containers/Inbox';

function App() {
  return (
    <>
      <Switch>
        <Route path="/conversations">
          <Inbox />
        </Route>
        <Route path="*">
          <Redirect to="/conversations" />
        </Route>
      </Switch>
    </>
  );
}

export default App;