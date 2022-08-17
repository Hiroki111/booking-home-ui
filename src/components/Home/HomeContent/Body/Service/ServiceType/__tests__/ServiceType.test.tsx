import { screen, render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { ServiceType } from '../ServiceType';
import { ServiceTypeDto } from '../../../../../../../interfaces/serviceType';
import { StaffDto } from '../../../../../../../interfaces/staff';
import { HomePageContext } from '../../../../../../../contexts/HomePageContext';
import { createMockHomePageContextValue } from '../../../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceDto } from '../../../../../../../testUtil/mockData/service';
import { createMockServiceTypeDto } from '../../../../../../../testUtil/mockData/serviceType';

describe('ServiceType.tsx', () => {
  const mockServiceA = createMockServiceDto({ name: 'Service 1' });
  const mockServiceB = createMockServiceDto({ name: 'Service 2' });
  const mockServiceType = createMockServiceTypeDto({
    name: 'Featured',
    services: [mockServiceA, mockServiceB],
  });
  const props = {
    serviceTypeRef: { current: null } as React.RefObject<any>,
    serviceType: mockServiceType as ServiceTypeDto,
    canAddMoreService: true,
    availableStaffList: [] as StaffDto[],
  };

  it('should show service type and service names', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePageContext.Provider value={createMockHomePageContextValue()}>
          <ServiceType {...props} />
        </HomePageContext.Provider>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
  });
});
