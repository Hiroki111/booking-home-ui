import { ServiceDto } from '../../interfaces/service';
import { AvailableDate, StaffDto } from '../../interfaces/staff';
import { AvailableTimeSlotDto } from '../../interfaces/availableTimeSlot';
import { BookingStateActionType } from './types';
import { BookingStateAction } from './actions';

export interface BookingState {
  services: ServiceDto[];
  staff: StaffDto;
  date: AvailableDate;
  timeslot: AvailableTimeSlotDto;
}

export const initialBookingState = {
  services: [] as ServiceDto[],
  staff: {} as StaffDto,
  date: {} as AvailableDate,
  timeslot: {} as AvailableTimeSlotDto,
};

export function bookingStateReducer(state: BookingState, action: BookingStateAction) {
  const { type, payload } = action;
  switch (type) {
    case BookingStateActionType.SET_SERVICES: {
      return {
        services: payload,
        staff: initialBookingState.staff,
        date: initialBookingState.date,
        timeslot: initialBookingState.timeslot,
      };
    }
    case BookingStateActionType.SET_STAFF:
      return {
        services: state.services,
        staff: payload,
        date: initialBookingState.date,
        timeslot: initialBookingState.timeslot,
      };
    case BookingStateActionType.SET_DATE:
      return {
        services: state.services,
        staff: state.staff,
        date: payload,
        timeslot: initialBookingState.timeslot,
      };
    case BookingStateActionType.SET_TIMESLOT:
      return {
        services: state.services,
        staff: state.staff,
        date: state.date,
        timeslot: payload,
      };
    case BookingStateActionType.RESET_BOOKING_STATE:
      return { ...initialBookingState };
    default:
      return state;
  }
}
