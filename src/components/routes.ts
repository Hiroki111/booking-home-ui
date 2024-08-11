type Layout = 'split' | 'fullwidth';

export interface Route {
  path: string;
  component?: React.FC;
  layout: Layout;
  exact?: boolean;
}

const service: Route = {
  path: '/',
  //   component: Service,
  component: undefined,
  layout: 'split',
  exact: true,
};

const staff: Route = {
  path: '/staff',
  // component: StaffComponent,
  component: undefined,
  layout: 'split',
};

const availability: Route = {
  path: '/availability',
  // component: Availability,
  component: undefined,
  layout: 'split',
};

const customerInfoForm: Route = {
  path: '/customer-info-form',
  // component: CustomerInfoForm,
  component: undefined,
  layout: 'split',
};

const bookingConfirmation: Route = {
  path: '/booking-confirmation',
  // component: BookingConfirmation,
  component: undefined,
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
