import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AvailableTime } from '../AvailableTime';
import { HomePageContextInterface, HomePageContext } from '../../../../../../contexts/HomePageContext';
import { Staff } from '../../../../../../interfaces/staff';
import { ROUTES } from '../../../../../../routes';
import { NO_PREFERENCE_STAFF } from '../../../../../../staticData/staff';
import { createMockAvailableDate } from '../../../../../../testUtil/mockData/availableDate';
import { createMockAvailableTimeslot } from '../../../../../../testUtil/mockData/availableTimeSlot';
import { createMockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockService } from '../../../../../../testUtil/mockData/service';
import { createMockStaff } from '../../../../../../testUtil/mockData/staff';
import { RootThemeProvider } from '../../../../../../theme/RootThemeProvider';

const mockEnqueue = jest.fn();
const mockNavigate = jest.fn();

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => ({ enqueueSnackbar: mockEnqueue }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AvailableTime.tsx', () => {
  const mockSetSelectedTimeSlot = jest.fn();
  const mockSetSelectedStaff = jest.fn();
  const mockSetSelectedDate = jest.fn();
  const mockAvailableTimeSlots = [
    createMockAvailableTimeslot('10:00', '10:30'),
    createMockAvailableTimeslot('10:30', '11:00'),
    createMockAvailableTimeslot('11:00', '11:30'),
  ];
  const defaultContextValue = createMockHomePageContextValue({
    selectedStaff: createMockStaff(),
    selectedDate: createMockAvailableDate({
      availableTimeSlots: mockAvailableTimeSlots,
    }),
    setSelectedTimeSlot: mockSetSelectedTimeSlot,
    setSelectedStaff: mockSetSelectedStaff,
    setSelectedDate: mockSetSelectedDate,
  });

  function renderAvailableTime(contextValue: HomePageContextInterface, staffList: Staff[] = []) {
    return render(
      <RootThemeProvider>
        <MemoryRouter>
          <QueryClientProvider client={new QueryClient()}>
            <HomePageContext.Provider value={contextValue}>
              <AvailableTime staffList={staffList} />
            </HomePageContext.Provider>
          </QueryClientProvider>
        </MemoryRouter>
      </RootThemeProvider>,
    );
  }

  it('should render timeslots', async () => {
    renderAvailableTime(defaultContextValue);

    await waitFor(() => {
      mockAvailableTimeSlots.forEach((timeSlot) => {
        expect(screen.getByText(timeSlot.startTime)).toBeInTheDocument();
      });
    });
  });

  it('should render null if no timeslot is provided', () => {
    const contextValue = createMockHomePageContextValue({
      selectedDate: createMockAvailableDate({ availableTimeSlots: [] }),
    });

    const { container } = renderAvailableTime(contextValue);

    expect(container.innerHTML).toHaveLength(0);
  });

  describe('When a timeslot is clicked', () => {
    const mockScrollTo = jest.fn();
    const mockAlert = jest.fn();
    beforeEach(() => {
      window.scrollTo = mockScrollTo;
      global.alert = mockAlert;
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should set the timeslot', async () => {
      const clickedTimeslotIndex = 0;
      renderAvailableTime(defaultContextValue);

      const firstTimeslot = screen.getByTestId(`timeslot-panel-${clickedTimeslotIndex}`);
      fireEvent.click(firstTimeslot);

      expect(mockSetSelectedTimeSlot).toHaveBeenCalledWith({
        startTime: mockAvailableTimeSlots[clickedTimeslotIndex].startTime,
        endTime: mockAvailableTimeSlots[clickedTimeslotIndex].endTime,
      });
      expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.customerInfoForm);
    });

    it('should set the timeslot and the first staff available if NO_PREFERENCE_STAFF has been selected', async () => {
      // timeslotB will be selected
      const timeslotA = createMockAvailableTimeslot('10:00', '10:30');
      const timeslotB = createMockAvailableTimeslot('10:30', '11:00');
      const timeslotC = createMockAvailableTimeslot('11:00', '11:30');

      // dateB will be selected
      const dateA = createMockAvailableDate({ id: 1, date: '2022-01-01', availableTimeSlots: [timeslotA, timeslotB] });
      const dateB = createMockAvailableDate({ id: 2, date: '2022-01-02', availableTimeSlots: [timeslotB, timeslotC] });

      const service = createMockService();
      const unavilableStaff = createMockStaff({ id: 1, services: [service], availableDates: [dateA] });
      const firstAvailableStaff = createMockStaff({ id: 2, services: [service], availableDates: [dateA, dateB] });
      const secondAvailableStaff = createMockStaff({ id: 2, services: [service], availableDates: [dateA, dateB] });
      const allStaff = [unavilableStaff, firstAvailableStaff, secondAvailableStaff];

      const clickedTimeslotIndex = 0;
      renderAvailableTime(
        {
          ...defaultContextValue,
          selectedStaff: NO_PREFERENCE_STAFF,
          selectedDate: dateB,
          selectedServices: [service],
        },
        allStaff,
      );

      const firstTimeslot = screen.getByTestId(`timeslot-panel-${clickedTimeslotIndex}`);
      fireEvent.click(firstTimeslot);

      expect(mockSetSelectedStaff).toHaveBeenCalledWith(firstAvailableStaff);
      expect(mockSetSelectedDate).toHaveBeenCalledWith(dateB);
      expect(mockSetSelectedTimeSlot).toHaveBeenCalledWith({
        startTime: dateB.availableTimeSlots[clickedTimeslotIndex].startTime,
        endTime: dateB.availableTimeSlots[clickedTimeslotIndex].endTime,
      });
      expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.customerInfoForm);
    });
  });
});
