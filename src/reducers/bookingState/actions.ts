import { AvailableDate, NoPreferenceStaff, Staff } from '../../interfaces/staff';
import { Service } from '../../interfaces/service';
import { AvailableTimeSlot } from '../../interfaces/availableTimeSlot';
import { BookingStateActionType } from './types';
export interface BookingStateAction {
  type: BookingStateActionType;
  payload?: any;
}

export const setServices = (services: Service[]): BookingStateAction => {
  return {
    type: BookingStateActionType.SET_SERVICES,
    payload: services,
  };
};

export const setStaff = (staff: Staff | NoPreferenceStaff): BookingStateAction => {
  return {
    type: BookingStateActionType.SET_STAFF,
    payload: staff,
  };
};

export const setDate = (date: AvailableDate): BookingStateAction => {
  return {
    type: BookingStateActionType.SET_DATE,
    payload: date,
  };
};

export const setTimeslot = (timeslot: AvailableTimeSlot): BookingStateAction => {
  return {
    type: BookingStateActionType.SET_TIMESLOT,
    payload: timeslot,
  };
};

export const resetBookingState = (): BookingStateAction => {
  return {
    type: BookingStateActionType.RESET_BOOKING_STATE,
  };
};
