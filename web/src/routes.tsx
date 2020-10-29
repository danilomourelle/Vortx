import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './pages/Landing';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/simulation" />
        </Route>
        <Route exact path="/simulation" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes
