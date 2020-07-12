import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  NotFound as NotFoundView,
  SendRequest as SendRequestView,
} from './views';

const Routes = (props) => {
  const { appState } = props;
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sendrequest"
      />

      <RouteWithLayout
        appState={appState}
        component={SendRequestView}
        exact={true}
        layout={MainLayout}
        path="/sendrequest"
      />

      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
