import React, { createContext, Dispatch, useReducer, useState, useEffect } from 'react';

import { Customer } from './interfaces/customer';
import { ServiceDto } from '../interfaces/service';
import { AvailableDate, NoPreferenceStaff, StaffDto } from '../interfaces/staff';
import { AvailableTimeSlotDto } from '../interfaces/availableTimeSlot';
import { useSessionStorage } from '../services/sessionStorage';
import { BookingState, bookingStateReducer, initialBookingState } from '../reducers/bookingState';
import { setDate, setServices, setStaff, setTimeslot, resetBookingState } from '../reducers/bookingState/actions';

interface Props {
  children: JSX.Element | JSX.Element[];
}
export interface BookingCompletionState {
  HAS_SELECTED_SERVICES: boolean;
  HAS_SELECTED_STAFF: boolean;
  HAS_SELECTED_DATE: boolean;
  HAS_SELECTED_TIMESLOT: boolean;
}
export interface HomePageContextInterface {
  serviceTypeRefs: React.RefObject<any>[];
  selectedServices: ServiceDto[];
  selectedStaff: StaffDto | NoPreferenceStaff;
  selectedDate: AvailableDate;
  selectedTimeSlot: AvailableTimeSlotDto;
  customer: Customer;
  showBookingConfirmation: boolean;
  bookingCompletionState: BookingCompletionState;
  setServiceTypeRefs: Dispatch<React.SetStateAction<React.RefObject<any>[]>>;
  setSelectedServices: (value: ServiceDto[]) => void;
  setSelectedStaff: (value: StaffDto | NoPreferenceStaff) => void;
  setSelectedDate: (value: AvailableDate) => void;
  setSelectedTimeSlot: (value: AvailableTimeSlotDto) => void;
  setCustomer: (value: Customer) => void;
  setShowBookingConfirmation: (value: boolean) => void;
  resetAppointmentData: () => void;
}

export const INITIAL_CUSTOMER_DATA = {
  firstName: '',
  lastName: '',
  countryPhoneCode: '',
  phoneNumber: '',
  email: '',
} as Customer;

const BOOKING_STATE_STORAGE_KEY = 'bookingState';

export const HomePageContext = createContext<HomePageContextInterface | undefined>(undefined);

export function HomePageContextProvider({ children }: Props) {
  const [serviceTypeRefs, setServiceTypeRefs] = useState<React.RefObject<any>[]>([]);
  const [bookingState, dispatchBookingState] = useReducer(
    bookingStateReducer,
    initialBookingState,
    (initialState: BookingState) =>
      JSON.parse(sessionStorage.getItem(BOOKING_STATE_STORAGE_KEY) || JSON.stringify(initialState)),
  );
  const [customer, setCustomer] = useState<Customer>(INITIAL_CUSTOMER_DATA);
  const [showBookingConfirmation, setShowBookingConfirmation] = useSessionStorage<boolean>(
    'showBookingConfirmation',
    false,
  );
  const bookingCompletionState = {
    HAS_SELECTED_SERVICES: bookingState.services?.length > 0,
    HAS_SELECTED_STAFF: !!bookingState?.staff?.id,
    HAS_SELECTED_DATE: !!bookingState?.date?.date,
    HAS_SELECTED_TIMESLOT: !!bookingState?.timeslot?.startTime,
  };

  useEffect(() => {
    sessionStorage.setItem(BOOKING_STATE_STORAGE_KEY, JSON.stringify(bookingState));
  }, [bookingState]);

  function resetAppointmentData() {
    dispatchBookingState(resetBookingState());
    setCustomer(INITIAL_CUSTOMER_DATA);
  }

  const contextValue: HomePageContextInterface = {
    serviceTypeRefs,
    selectedServices: bookingState.services,
    selectedStaff: bookingState.staff,
    selectedDate: bookingState.date,
    selectedTimeSlot: bookingState.timeslot,
    customer,
    showBookingConfirmation,
    bookingCompletionState,
    setServiceTypeRefs,
    setSelectedServices: (services: ServiceDto[]) => dispatchBookingState(setServices(services)),
    setSelectedStaff: (staff: StaffDto | NoPreferenceStaff) => dispatchBookingState(setStaff(staff)),
    setSelectedDate: (date: AvailableDate) => dispatchBookingState(setDate(date)),
    setSelectedTimeSlot: (timeslot: AvailableTimeSlotDto) => dispatchBookingState(setTimeslot(timeslot)),
    setCustomer,
    setShowBookingConfirmation,
    resetAppointmentData,
  };

  return <HomePageContext.Provider value={contextValue}>{children}</HomePageContext.Provider>;
}

export function useHomePageContext() {
  const context = React.useContext(HomePageContext);
  if (context === undefined) {
    throw new Error('useHomePageContext must be used within HomePageContextProvider');
  }
  return context;
}
