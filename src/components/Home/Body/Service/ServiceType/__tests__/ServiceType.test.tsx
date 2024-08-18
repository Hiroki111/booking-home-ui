import { screen, render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HomePageContext } from '../../../../../../contexts/HomePageContext';
import { ServiceTypeDto } from '../../../../../../interfaces/serviceType';
import { StaffDto } from '../../../../../../interfaces/staff';
import { createMockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceDto } from '../../../../../../testUtil/mockData/service';
import { createMockServiceTypeDto } from '../../../../../../testUtil/mockData/serviceType';
import { ServiceType } from '../ServiceType';
import { RootThemeProvider } from '../../../../../../theme/RootThemeProvider';

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
      <RootThemeProvider>
        <QueryClientProvider client={new QueryClient()}>
          <HomePageContext.Provider value={createMockHomePageContextValue()}>
            <ServiceType {...props} />
          </HomePageContext.Provider>
        </QueryClientProvider>
      </RootThemeProvider>,
    );

    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
  });
});
