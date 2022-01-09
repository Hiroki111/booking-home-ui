import { RouteComponentProps } from 'react-router-dom';
import { Availability } from './pages/Home/HomeContent/Body/Availability';
import { BookingConfirmation } from './pages/Home/HomeContent/Body/BookingConfirmation';
import { CustomerInfoForm } from './pages/Home/HomeContent/Body/CustomerInfoForm';
import { Service } from './pages/Home/HomeContent/Body/Service';
import { Staff as StaffComponent } from './pages/Home/HomeContent/Body/Staff';

type Layout = 'split' | 'fullwidth';

export interface Route {
  path: string;
  component: React.FC<RouteComponentProps>;
  layout: Layout;
  exact?: boolean;
}

const service: Route = {
  path: '/',
  component: Service,
  layout: 'split',
  exact: true,
};

const staff: Route = {
  path: '/staff',
  component: StaffComponent,
  layout: 'split',
};

const availability: Route = {
  path: '/availability',
  component: Availability,
  layout: 'split',
};

const customerInfoForm: Route = {
  path: '/customer-info-form',
  component: CustomerInfoForm,
  layout: 'split',
};

const bookingConfirmation: Route = {
  path: '/booking-confirmation',
  component: BookingConfirmation,
  layout: 'fullwidth',
};

const frontEndRoutes = [service, staff, availability, customerInfoForm, bookingConfirmation];

export const splitComponentRoutes = frontEndRoutes.filter((route) => route.layout === 'split');

export const fullWidthComponentRoutes = frontEndRoutes.filter((route) => route.layout === 'fullwidth');

export const ROUTES = {
  service: service.path,
  staff: staff.path,
  availability: availability.path,
  customerInfoForm: customerInfoForm.path,
  bookingConfirmation: bookingConfirmation.path,
  login: '/login',
  backoffice: '/backoffice',
};
