import { screen, render, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { ALERT_TEXT_SERVICE_SELECTION_LIMIT, ALERT_TEXT_STAFF_UNAVAILABLE, Service } from '../Service';
import { HomePageContextInterface, HomePageContext } from '../../../../../contexts/HomePageContext';
import { createMockHomePageContextValue } from '../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceDto } from '../../../../../testUtil/mockData/service';
import { createMockServiceTypeDto } from '../../../../../testUtil/mockData/serviceType';
import { createMockStaff } from '../../../../../testUtil/mockData/staff';
import restApi from '../../../../../network/restApi';

jest.mock('../../../../../network/restApi', () => ({
  fetchServiceTypes: jest.fn(),
  fetchStaffList: jest.fn(),
}));

jest.mock('../../../../../staticData/service', () => ({
  MAX_SERVICE_SELECTION_NUMBER: 3,
}));

describe('Service.tsx', () => {
  const mockServiceTypes = [
    createMockServiceTypeDto({ id: 1, name: 'Featured' }),
    createMockServiceTypeDto({ id: 2, name: 'Hands and Feet' }),
  ];
  const mockStaffList = [createMockStaff({ id: 1, name: 'John Doe' })];

  function renderService(contextValue: HomePageContextInterface) {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePageContext.Provider value={contextValue}>
          <Service />
        </HomePageContext.Provider>
      </QueryClientProvider>,
    );
  }

  it('should show service type names in the menu bar and container', async () => {
    restApi.fetchServiceTypes = jest.fn().mockImplementation(() => mockServiceTypes);
    renderService(createMockHomePageContextValue());

    await waitFor(() => screen.getAllByText('Featured'));
    expect(screen.getAllByText('Featured').length).toEqual(2);
    expect(screen.getAllByText('Hands and Feet').length).toEqual(2);
  });

  it('should notify the user that there is no service available', async () => {
    restApi.fetchServiceTypes = jest.fn().mockImplementation(() => []);
    renderService(createMockHomePageContextValue());

    await waitFor(() => expect(screen.getByText('No service is available at this moment')).toBeInTheDocument());
  });

  it('should notify the user that there is not enough staff for the selected services', async () => {
    restApi.fetchServiceTypes = jest.fn().mockImplementation(() => mockServiceTypes);
    restApi.fetchStaffList = jest.fn().mockImplementation(() => []);
    renderService(createMockHomePageContextValue());

    await waitFor(() => expect(screen.getByText(ALERT_TEXT_STAFF_UNAVAILABLE)).toBeInTheDocument());
  });

  it('should notify the user when the selection limit is reached', async () => {
    restApi.fetchServiceTypes = jest.fn().mockImplementation(() => mockServiceTypes);
    restApi.fetchStaffList = jest.fn().mockImplementation(() => mockStaffList);

    renderService(
      createMockHomePageContextValue({
        selectedServices: [createMockServiceDto(), createMockServiceDto(), createMockServiceDto()],
      }),
    );

    await waitFor(() => expect(screen.getByText(ALERT_TEXT_SERVICE_SELECTION_LIMIT)).toBeInTheDocument());
  });
});
