import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { HomePageContext } from '../../../../../../../contexts/HomePageContext';
import { createMockAvailableDate } from '../../../../../../../testUtil/mockData/availableDate';
import { createMockAvailableTimeslot } from '../../../../../../../testUtil/mockData/availableTimeSlot';
import { createMockCustomer } from '../../../../../../../testUtil/mockData/customer';
import { mockHomePageContextValue } from '../../../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceDto } from '../../../../../../../testUtil/mockData/service';
import { createMockStaff } from '../../../../../../../testUtil/mockData/staff';
import { BookingModal } from '../BookingModal';

jest.mock('../../../../../../../network/restApi', () => ({
  bookAppointment: jest.fn().mockImplementation(() => null),
}));

describe('BookingModal.tsx', () => {
  const restApi = require('../../../../../../../network/restApi');

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
            }}
          >
            <BookingModal isOpen={true} handleClose={() => {}} />
          </HomePageContext.Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
  }

  it('should allow submission if the captcha response is not empty', async () => {
    renderBookingModal();

    const inputNode = screen.getByPlaceholderText('Enter...');
    fireEvent.change(inputNode, { target: { value: '123456' } });

    const button = screen.getByText('BOOK');
    fireEvent.click(button);

    await waitFor(() =>
      expect(restApi.bookAppointment).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Smith',
        countryPhoneCode: '+123',
        phoneNumber: '444555666',
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

    const button = screen.getByText('BOOK');
    fireEvent.click(button);

    await waitFor(() => expect(restApi.bookAppointment).toHaveBeenCalledTimes(0));
  });
});
