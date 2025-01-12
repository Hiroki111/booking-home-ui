import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Availability } from '../Availability';
import { HomePageContextInterface, HomePageContext } from '../../../../../contexts/HomePageContext';
import { AvailableDate } from '../../../../../interfaces/staff';
import { createMockAvailableDate } from '../../../../../testUtil/mockData/availableDate';
import { createMockHomePageContextValue } from '../../../../../testUtil/mockData/HomePageContext';
import { createMockService } from '../../../../../testUtil/mockData/service';
import { createMockStaff } from '../../../../../testUtil/mockData/staff';
import { RootThemeProvider } from '../../../../../theme/RootThemeProvider';
import restApi from '../../../../../network/restApi';

const mockEnqueue = jest.fn();
jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => ({ enqueueSnackbar: mockEnqueue }),
}));

jest.mock('../../../../../services/routing', () => ({
  getPathToSkippedPage: jest.fn().mockImplementation(() => null),
}));

jest.mock('../../../../../network/restApi', () => ({
  fetchStaffList: jest.fn(),
}));

describe('Availability.tsx', () => {
  const service = createMockService();
  function getAvailabilityComponent(contextValue: HomePageContextInterface) {
    return (
      <RootThemeProvider>
        <MemoryRouter>
          <QueryClientProvider client={new QueryClient()}>
            <HomePageContext.Provider value={contextValue}>
              <Availability />
            </HomePageContext.Provider>
          </QueryClientProvider>
        </MemoryRouter>
      </RootThemeProvider>
    );
  }

  beforeEach(() => {
    (restApi.fetchStaffList as jest.Mock).mockImplementation(() => [createMockStaff()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should scroll into AvailableTime when the selected date gets its value', () => {
    const mockedScrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = mockedScrollIntoView;

    let contextValue = createMockHomePageContextValue({
      selectedDate: {} as AvailableDate,
      selectedServices: [service],
    });
    render(getAvailabilityComponent(contextValue));
    expect(mockedScrollIntoView).not.toBeCalled();

    contextValue = createMockHomePageContextValue({
      selectedDate: createMockAvailableDate(),
      selectedServices: [service],
    });
    render(getAvailabilityComponent(contextValue));
    expect(mockedScrollIntoView).toBeCalled();
  });

  it('should render the calendar', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-03-01'));

    const service = createMockService({ minutes: 30 });
    const availableDateA = createMockAvailableDate({ date: '2022-03-01' });
    const availableDateB = createMockAvailableDate({ date: '2022-03-15' });
    const availableDateC = createMockAvailableDate({ date: '2022-03-30' });
    const staff = createMockStaff({
      services: [service],
      availableDates: [availableDateA, availableDateB, availableDateC],
    });

    const contextValue = createMockHomePageContextValue({
      selectedStaff: staff,
      selectedServices: [service],
    });
    const documentFragment = render(getAvailabilityComponent(contextValue)).asFragment();
    // '2022-03-01', '2022-03-15', '2022-03-30' will have makeStyles-availableDay-{number} class in the snapshot
    expect(documentFragment).toMatchSnapshot();
  });
});
