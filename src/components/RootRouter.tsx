import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home } from './Home';
import { ROUTES } from './routes';
import { NoMatch } from './Home/HomeContent/Body/NoMatch ';

export function RootRouter() {
  return (
    <Router>
      <Routes>
        {[ROUTES.service, ROUTES.staff, ROUTES.availability, ROUTES.customerInfoForm, ROUTES.bookingConfirmation].map(
          (path) => (
            <Route path={path} key={path} element={<Home />} />
          ),
        )}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}
