import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewIncident from './pages/NewIncident';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/incident/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
