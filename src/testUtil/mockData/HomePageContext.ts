import { HomePageContextInterface, INITIAL_CUSTOMER_DATA } from '../../contexts/HomePageContext';
import { initialBookingState } from '../../reducers/bookingState';

const mockBookingCompletionState = {
  HAS_SELECTED_SERVICES: initialBookingState.services?.length > 0,
  HAS_SELECTED_STAFF: !!initialBookingState?.staff?.id,
  HAS_SELECTED_DATE: !!initialBookingState?.date?.date,
  HAS_SELECTED_TIMESLOT: !!initialBookingState?.timeslot?.startTime,
};

export const mockHomePageContextValue: HomePageContextInterface = {
  serviceTypeRefs: [],
  selectedServices: initialBookingState.services,
  selectedStaff: initialBookingState.staff,
  selectedDate: initialBookingState.date,
  selectedTimeSlot: initialBookingState.timeslot,
  customer: INITIAL_CUSTOMER_DATA,
  showBookingConfirmation: false,
  bookingCompletionState: mockBookingCompletionState,
  setServiceTypeRefs: jest.fn(),
  setSelectedServices: jest.fn(),
  setSelectedStaff: jest.fn(),
  setSelectedDate: jest.fn(),
  setSelectedTimeSlot: jest.fn(),
  setCustomer: jest.fn(),
  setShowBookingConfirmation: jest.fn(),
  resetAppointmentData: jest.fn(),
};

export function createMockHomePageContextValue(params?: Partial<HomePageContextInterface>) {
  return { ...mockHomePageContextValue, ...params };
}
