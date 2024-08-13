export const GENERIC_TECHNICAL_ERROR_MESSAGE = 'TECHNICAL ERROR';

// NOTE: This should use the same enum in the server side app
export enum BookingRequestErrorCode {
  IncorrectSecurityCode = 'INCORRECT_SECURITY_CODE',
  StaffCannotDoSelectedServices = 'STAFF_CANNOT_DO_SELECTED_SERVICES',
  StaffUnavailableOnSelectedDateAndTime = 'STAFF_UNAVAILABLE_ON_SELECTED_DATE_AND_TIME',
  TimeslotOverlapping = 'TIMESLOT_OVERLAPPING',
  TimeslotTooShortForSelectedServices = 'TIMESLOT_TOO_SHORT_FOR_SELECTED_SERVICES',
}

export const BOOKING_ERROR_MESSAGE = {
  [BookingRequestErrorCode.IncorrectSecurityCode]: 'Wrong security code was provided.',
  [BookingRequestErrorCode.StaffCannotDoSelectedServices]:
    'Due to real-time availability, the staff is no longer available for the selected service(s).',
  [BookingRequestErrorCode.TimeslotOverlapping]:
    'Due to real-time availability, the staff is no longer available for the selected timeslot.',
  [BookingRequestErrorCode.StaffUnavailableOnSelectedDateAndTime]:
    'Due to real-time availability, the staff is no longer available for the timeslot.',
  [BookingRequestErrorCode.TimeslotTooShortForSelectedServices]:
    'Due to real-time availability, your request is no longer available. Please choose a different timeslot.',
};

export const staffAvailabilityErrors = [
  BookingRequestErrorCode.StaffCannotDoSelectedServices,
  BookingRequestErrorCode.StaffUnavailableOnSelectedDateAndTime,
  BookingRequestErrorCode.TimeslotOverlapping,
];
