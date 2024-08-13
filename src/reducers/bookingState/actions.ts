import { AvailableDate, NoPreferenceStaff, StaffDto } from '../../interfaces/staff';
import { ServiceDto } from '../../interfaces/service';
import { AvailableTimeSlotDto } from '../../interfaces/availableTimeSlot';
import { BookingStateActionType } from './types';
export interface BookingStateAction {
  type: BookingStateActionType;
  payload?: any;
}

export const setServices = (services: ServiceDto[]): BookingStateAction => {
  return {
    type: BookingStateActionType.SET_SERVICES,
    payload: services,
  };
};

export const setStaff = (staff: StaffDto | NoPreferenceStaff): BookingStateAction => {
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

export const setTimeslot = (timeslot: AvailableTimeSlotDto): BookingStateAction => {
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
