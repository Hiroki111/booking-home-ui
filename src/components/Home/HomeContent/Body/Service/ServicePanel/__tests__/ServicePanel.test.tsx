import { screen, render, fireEvent } from '@testing-library/react';

import { ServicePanel, Props } from '../ServicePanel';
import { HomePageContext, HomePageContextInterface } from '../../../../../../../contexts/HomePageContext';
import { createMockHomePageContextValue } from '../../../../../../../testUtil/mockData/HomePageContext';
import { createMockServiceDto } from '../../../../../../../testUtil/mockData/service';

describe('ServicePanel.tsx', () => {
  const baseProps = {
    service: createMockServiceDto({
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
      <HomePageContext.Provider value={contextValue}>
        <ServicePanel {...{ ...baseProps, ...overrideProps }} />
      </HomePageContext.Provider>,
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
