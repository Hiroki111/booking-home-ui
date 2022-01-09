import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { Home } from './Home';
import { BackOffice } from './BackOffice';
import { BackOfficeLoginForm } from './BackOfficeLoginForm';
import { withAuth } from '../hoc/withAuth';
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
        <Route path={ROUTES.login} component={BackOfficeLoginForm} />
        <Route path={ROUTES.backoffice} component={withAuth(BackOffice)} />
        <Redirect to={ROUTES.service} />
      </Switch>
    </Router>
  );
}
