import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, appState, ...rest } = props;


  function routeRenderFunction(param) {
    return (
      <Layout appState={appState}>
        <Component appState={appState} {...param} />
      </Layout>);
  }
  return (
    <Route
      {...rest}
      render={routeRenderFunction}
    />
  );

};



RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  appState: PropTypes.object,
  path: PropTypes.string
};

export default RouteWithLayout;


