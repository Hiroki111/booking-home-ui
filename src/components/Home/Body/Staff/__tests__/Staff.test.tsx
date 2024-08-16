import { screen, render, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { HomePageContext } from '../../../../../../contexts/HomePageContext';
import { createPartialTargetText } from '../../../../../../testUtil/helper';
import { createMockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockStaff } from '../../../../../../testUtil/mockData/staff';
import { Staff } from '../Staff';

jest.mock('../../../../../../network/restApi', () => ({
  fetchStaffList: jest.fn(),
}));

describe('Staff.tsx', () => {
  const restApi = require('../../../../../../network/restApi');

  function renderStaff() {
    const contextValue = createMockHomePageContextValue();
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <HomePageContext.Provider value={contextValue}>
            <Staff />
          </HomePageContext.Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
  }

  it('should show "No preference" if there are 2 or more staff available', async () => {
    restApi.fetchStaffList.mockImplementation(() => [createMockStaff(), createMockStaff()]);
    renderStaff();

    await waitFor(() => expect(screen.getByText('No preference')).toBeInTheDocument());
  });

  it('should NOT show "No preference" if there is only 1 staff available', async () => {
    const mockStaff = createMockStaff({ name: 'John Smith' });
    restApi.fetchStaffList.mockImplementation(() => [mockStaff]);
    renderStaff();

    await waitFor(() => expect(screen.queryByText('No preference')).toBeNull());
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('should notify the user that there is no staff available', async () => {
    restApi.fetchStaffList.mockImplementation(() => []);
    renderStaff();

    const partialTargetText = createPartialTargetText('No staff available for the selected services.');
    await waitFor(() => expect(screen.getByText(partialTargetText)).toBeInTheDocument());
  });
});
