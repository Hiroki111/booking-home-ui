import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { Home } from './Home';
import { ROUTES } from '../routes';

export function RootRouter() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={[
            ROUTES.service,
            ROUTES.staff,
            ROUTES.availability,
            ROUTES.customerInfoForm,
            ROUTES.bookingConfirmation,
          ]}
          component={Home}
        />
        <Redirect to={ROUTES.service} />
      </Switch>
    </Router>
  );
}
