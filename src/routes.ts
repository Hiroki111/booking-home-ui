import { Availability } from './components/Home/Body/Availability';
import { BookingConfirmation } from './components/Home/Body/BookingConfirmation';
import { CustomerInfoForm } from './components/Home/Body/CustomerInfoForm';
import { Service } from './components/Home/Body/Service';
import { Staff } from './components/Home/Body/Staff';

type Layout = 'split' | 'fullwidth';

export interface Route {
  path: string;
  component: React.FC;
  layout: Layout;
}

const service: Route = {
  path: '/',
  component: Service,
  layout: 'split',
};

const staff: Route = {
  path: '/staff',
  component: Staff,
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
};
