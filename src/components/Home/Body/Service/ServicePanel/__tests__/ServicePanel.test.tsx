import { screen, render, fireEvent } from '@testing-library/react';

import { ServicePanel, Props } from '../ServicePanel';
import { HomePageContextInterface, HomePageContext } from '../../../../../../contexts/HomePageContext';
import { createMockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockService } from '../../../../../../testUtil/mockData/service';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { RootThemeProvider } from '../../../../../../theme/RootThemeProvider';

describe('ServicePanel.tsx', () => {
  const baseProps = {
    service: createMockService({
      name: 'Service 1',
      minutes: 40,
      price: 35,
    }),
    isSelected: false,
    canAddMoreService: true,
    isStaffAvailable: true,
  };

  function renderServicePanel(overrideProps: Partial<Props>, contextValue: HomePageContextInterface) {
    render(
      <RootThemeProvider>
        <MemoryRouter>
          <QueryClientProvider client={new QueryClient()}>
            <HomePageContext.Provider value={contextValue}>
              <ServicePanel {...{ ...baseProps, ...overrideProps }} />
            </HomePageContext.Provider>
          </QueryClientProvider>
        </MemoryRouter>
      </RootThemeProvider>,
    );
  }

  it('should show service information', () => {
    renderServicePanel({}, createMockHomePageContextValue());

    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('40 min')).toBeInTheDocument();
    expect(screen.getByText('€ 35')).toBeInTheDocument();
  });

  it('should allow the check box to be checked', async () => {
    const mockSetSelectedServices = jest.fn();
    renderServicePanel(
      { isStaffAvailable: true, canAddMoreService: true },
      createMockHomePageContextValue({
        setSelectedServices: mockSetSelectedServices,
      }),
    );

    const checkbox = screen.getByTestId('service-check-box');
    fireEvent.click(checkbox);
    expect(mockSetSelectedServices).toHaveBeenCalled();
  });

  it('should diable the check box if no staff is available', async () => {
    const mockSetSelectedServices = jest.fn();
    renderServicePanel(
      { isSelected: false, isStaffAvailable: false },
      createMockHomePageContextValue({
        setSelectedServices: mockSetSelectedServices,
      }),
    );

    const checkbox = screen.getByTestId('service-check-box');
    fireEvent.click(checkbox);
    expect(mockSetSelectedServices).not.toHaveBeenCalled();
  });

  it('should diable the check box if no more service can be added', async () => {
    const mockSetSelectedServices = jest.fn();
    renderServicePanel(
      { isSelected: false, canAddMoreService: false },
      createMockHomePageContextValue({
        setSelectedServices: mockSetSelectedServices,
      }),
    );

    const checkbox = screen.getByTestId('service-check-box');
    fireEvent.click(checkbox);
    expect(mockSetSelectedServices).not.toHaveBeenCalled();
  });
});
