import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GetDetailsPage from './pages/GetDetailsPage';
import GenderRevealerPage from './pages/GenderRevealerPage';
import ContextRoute from './hoc/ContextRoute';

function App() {

  return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <ContextRoute exact path='/getDetails'component={ GetDetailsPage } />
        <ContextRoute exact path='/revealIt' component={ GenderRevealerPage } />
      </Switch>
  );
}
/* <Route exact path="/getDetails" component={GetDetailsPage} />
        <Route exact path="/revealIt" component={GenderRevealerPage} /> */
export default App;
