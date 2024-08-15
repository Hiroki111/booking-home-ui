import { screen, render, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { MenuBar } from '../MenuBar';
import { HomePageContext } from '../../../../../../contexts/HomePageContext';
import { createMockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceTypeDto } from '../../../../../../testUtil/mockData/serviceType';
import restApi from '../../../../../../network/restApi';

jest.mock('../../../../../../network/restApi', () => ({
  fetchServiceTypes: jest.fn(),
}));

describe('MenuBar.tsx', () => {
  const mockServiceTypes = [
    createMockServiceTypeDto({ id: 1, name: 'Featured' }),
    createMockServiceTypeDto({ id: 2, name: 'Hands and Feet' }),
  ];

  function renderMenuBar() {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePageContext.Provider value={createMockHomePageContextValue()}>
          <MenuBar />
        </HomePageContext.Provider>
      </QueryClientProvider>,
    );
  }

  it('should show service type names', async () => {
    restApi.fetchServiceTypes = jest.fn().mockImplementation(() => mockServiceTypes);
    renderMenuBar();

    await waitFor(() => screen.getAllByText('Featured'));
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('Hands and Feet')).toBeInTheDocument();
  });
});
