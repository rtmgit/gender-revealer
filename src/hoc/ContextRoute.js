import React from 'react';
import { Route } from 'react-router-dom';
import { StoreUserDataProvider } from '../context/StoreUserDataContext';

const ContextRoute = ({ component, ...rest }) => {
  const ChildComponent = component;

  return (
    <Route {...rest}>
      <StoreUserDataProvider>
        <ChildComponent />
      </StoreUserDataProvider>
    </Route>
  );
};

export default ContextRoute;