import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { BookingModal } from '../BookingModal';
import { createMockCustomer } from '../../../../../../testUtil/mockData/customer';
import { HomePageContext } from '../../../../../../contexts/HomePageContext';
import { BookingRequestError } from '../../../../../../network/error';
import { ROUTES } from '../../../../../../routes';
import {
  BookingRequestErrorCode,
  BOOKING_ERROR_MESSAGE,
  staffAvailabilityErrors,
} from '../../../../../../staticData/errorMessage';
import { createMockAvailableDate } from '../../../../../../testUtil/mockData/availableDate';
import { createMockAvailableTimeslot } from '../../../../../../testUtil/mockData/availableTimeSlot';
import { mockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceDto } from '../../../../../../testUtil/mockData/service';
import { createMockStaff } from '../../../../../../testUtil/mockData/staff';

const mockHistoryPush = jest.fn();

jest.mock('../../../../../../network/restApi', () => ({
  bookAppointment: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('BookingModal.tsx', () => {
  const restApi = require('../../../../../../network/restApi');

  const mockCustomer = createMockCustomer({
    firstName: 'John',
    lastName: 'Smith',
    countryPhoneCode: '+123',
    phoneNumber: '444555666',
    email: 'john@mock.com',
  });
  const mockSelectedServices = [
    createMockServiceDto({ id: 10, minutes: 10, price: 15.5 }),
    createMockServiceDto({ id: 20, minutes: 15, price: 20 }),
  ];
  const mockSelectedTimeslot = createMockAvailableTimeslot('10:30', '11:00');
  const mockSelectedDate = createMockAvailableDate({
    id: 100,
    date: '2021-01-31',
    availableTimeSlots: [mockSelectedTimeslot],
  });
  const mockSelectedStaff = createMockStaff({
    id: 123,
    services: mockSelectedServices,
    availableDates: [mockSelectedDate],
  });
  const mockSetSelectedTimeSlot = jest.fn();
  const mockSetSelectedDate = jest.fn();
  const mockSetSelectedStaff = jest.fn();

  function renderBookingModal() {
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <HomePageContext.Provider
            value={{
              ...mockHomePageContextValue,
              customer: mockCustomer,
              selectedServices: mockSelectedServices,
              selectedStaff: mockSelectedStaff,
              selectedDate: mockSelectedDate,
              selectedTimeSlot: mockSelectedTimeslot,
              setSelectedTimeSlot: mockSetSelectedTimeSlot,
              setSelectedDate: mockSetSelectedDate,
              setSelectedStaff: mockSetSelectedStaff,
            }}
          >
            <BookingModal isOpen={true} handleClose={() => {}} />
          </HomePageContext.Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
  }

  function enterSecurityCode() {
    const inputNode = screen.getByPlaceholderText('Enter...');
    fireEvent.change(inputNode, { target: { value: '123456' } });
  }

  function submitBookingRequest() {
    const button = screen.getByText('BOOK');
    fireEvent.click(button);
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should allow submission if the captcha response is not empty', async () => {
    renderBookingModal();
    enterSecurityCode();
    submitBookingRequest();

    await waitFor(() =>
      expect(restApi.bookAppointment).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '+123444555666',
        email: 'john@mock.com',
        serviceIds: [10, 20],
        totalPrice: 35.5,
        staffId: 123,
        date: '2021-01-31',
        startTime: '10:30',
        endTime: '10:55',
        staffAvailabilityId: 100,
        captchaText: '123456',
      }),
    );
  });

  it('should NOT allow submission if the captcha response is empty', async () => {
    renderBookingModal();
    // Not entering the security code
    submitBookingRequest();

    await waitFor(() => expect(restApi.bookAppointment).toHaveBeenCalledTimes(0));
  });

  describe('When booking request fails', () => {
    function triggerBookingRequestError(errorCode: BookingRequestErrorCode) {
      global.console.error = jest.fn();
      restApi.bookAppointment.mockImplementation(() => {
        throw new BookingRequestError('API request failed', errorCode);
      });
    }

    it.each(Object.values(BookingRequestErrorCode))(
      'should show an error message for %s',
      async (errorCode: BookingRequestErrorCode) => {
        triggerBookingRequestError(errorCode);

        renderBookingModal();
        enterSecurityCode();
        submitBookingRequest();

        await waitFor(() =>
          expect(screen.getByTestId('booking-error-message')).toHaveTextContent(BOOKING_ERROR_MESSAGE[errorCode]),
        );
      },
    );

    it.each(staffAvailabilityErrors)(
      'should show a link to staff list if %s is returned by booking request',
      async (errorCode: BookingRequestErrorCode) => {
        triggerBookingRequestError(errorCode);

        renderBookingModal();
        enterSecurityCode();
        submitBookingRequest();

        await waitFor(() => expect(screen.getByTestId('staff-availability-error-message')).toBeInTheDocument());

        const linkToStaffList = screen.getByTestId('staff-availability-error-message');
        fireEvent.click(linkToStaffList);

        await waitFor(() => expect(mockSetSelectedTimeSlot).toHaveBeenCalledWith({}));
        await waitFor(() => expect(mockSetSelectedDate).toHaveBeenCalledWith({}));
        await waitFor(() => expect(mockSetSelectedStaff).toHaveBeenCalledWith({}));
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.staff));
      },
    );
  });
});
