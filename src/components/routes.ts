import { Availability } from './Home/HomeContent/Body/Availability';
import { BookingConfirmation } from './Home/HomeContent/Body/BookingConfirmation';
import { CustomerInfoForm } from './Home/HomeContent/Body/CustomerInfoForm';
import { Service } from './Home/HomeContent/Body/Service';
import React from 'react';
import { Staff } from './Home/HomeContent/Body/Staff';

type Layout = 'split' | 'fullwidth';

export interface Route {
  path: string;
  component: React.FC;
  layout: Layout;
}

const root: Route = {
  path: '/',
  component: Service,
  layout: 'split',
};

const service: Route = {
  path: 'service',
  component: Service,
  layout: 'split',
};

const staff: Route = {
  path: 'staff',
  component: Staff,
  layout: 'split',
};

const availability: Route = {
  path: 'availability',
  component: Availability,
  layout: 'split',
};

const customerInfoForm: Route = {
  path: 'customer-info-form',
  component: CustomerInfoForm,
  layout: 'split',
};

const bookingConfirmation: Route = {
  path: 'booking-confirmation',
  component: BookingConfirmation,
  layout: 'fullwidth',
};

const frontEndRoutes = [root, service, staff, availability, customerInfoForm, bookingConfirmation];

export const splitComponentRoutes = frontEndRoutes.filter((route) => route.layout === 'split');

export const fullWidthComponentRoutes = frontEndRoutes.filter((route) => route.layout === 'fullwidth');

export const ROUTES = {
  service: service.path,
  staff: staff.path,
  availability: availability.path,
  customerInfoForm: customerInfoForm.path,
  bookingConfirmation: bookingConfirmation.path,
};
