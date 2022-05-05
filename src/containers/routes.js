import { Redirect, Route, Switch } from "react-router-dom";

import React from "react";
import Bond from "../pages/Bond";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Bond} />
      <Route exact path="/swap" component={Bond} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}
