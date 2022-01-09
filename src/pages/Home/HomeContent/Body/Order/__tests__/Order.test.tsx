import { screen, render } from '@testing-library/react';

import { HomePageContext, HomePageContextInterface } from '../../../../../../contexts/HomePageContext';
import { createMockAvailableDate } from '../../../../../../testUtil/mockData/availableDate';
import { createMockAvailableTimeslot } from '../../../../../../testUtil/mockData/availableTimeSlot';
import { createMockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceDto } from '../../../../../../testUtil/mockData/service';
import { createMockStaff } from '../../../../../../testUtil/mockData/staff';
import { Order } from '../Order';

describe('Order', () => {
  const mockServices = [
    createMockServiceDto({
      id: 1,
      name: 'mock service',
      minutes: 10,
      price: 20,
      tax: 2.5,
    }),
    createMockServiceDto({
      id: 2,
      name: 'another mock service',
      minutes: 15,
      price: 25,
      tax: 1.0,
    }),
  ];
  const mockTimeslot = createMockAvailableTimeslot('10:00', '10:30');
  const mockDate = createMockAvailableDate({
    date: '2021-12-31',
    availableTimeSlots: [mockTimeslot],
  });
  const mockStaff = createMockStaff({
    name: 'John Doe',
    services: mockServices,
    availableDates: [mockDate],
  });

  function renderOrder(contextValue: HomePageContextInterface) {
    render(
      <HomePageContext.Provider value={contextValue}>
        <Order />
      </HomePageContext.Provider>,
    );
  }

  it('shows "No services selected yet" when no service has been selected', () => {
    renderOrder(createMockHomePageContextValue());

    expect(screen.getByText('No services selected yet')).toBeInTheDocument();
  });

  it('shows services that have been selected', () => {
    const contextValue = createMockHomePageContextValue({
      selectedServices: mockServices,
    });
    renderOrder(contextValue);

    expect(screen.queryByText('No services selected yet')).toBeNull();
    // 1st service
    expect(screen.getByText('mock service')).toBeInTheDocument();
    expect(screen.getByText('10 min')).toBeInTheDocument();
    expect(screen.getByText('€ 20')).toBeInTheDocument();
    // 2nd service
    expect(screen.getByText('another mock service')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('€ 25')).toBeInTheDocument();
  });

  it("shows the selected staff's name", () => {
    const contextValue = createMockHomePageContextValue({
      selectedStaff: mockStaff,
    });
    renderOrder(contextValue);

    expect(screen.getByText('Staff: John Doe')).toBeInTheDocument();
  });

  it('shows the selected timeslot', () => {
    const contextValue = createMockHomePageContextValue({
      selectedDate: mockDate,
      selectedTimeSlot: mockTimeslot,
      selectedServices: mockServices,
    });
    renderOrder(contextValue);

    expect(screen.getByText('31 Dec 2021 at 10:00 - 10:25')).toBeInTheDocument();
  });

  it('shows the prices', () => {
    const contextValue = createMockHomePageContextValue({
      selectedServices: mockServices,
    });
    renderOrder(contextValue);

    expect(screen.getByTestId('tax')).toHaveTextContent('€ 3.5');
    expect(screen.getByTestId('total-price')).toHaveTextContent('€ 45');
  });
});
