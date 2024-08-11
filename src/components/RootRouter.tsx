import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import { Home } from './Home/Home';
import { ROUTES } from './routes';

export function RootRouter() {
  return (
    <Router>
      <Routes>
        {[ROUTES.service, ROUTES.staff, ROUTES.availability, ROUTES.customerInfoForm, ROUTES.bookingConfirmation].map(
          (path) => (
            <Route path={path} key={path} element={<Home />} />
          ),
        )}
      </Routes>
      <Navigate to={ROUTES.service} replace />
    </Router>
  );
}
