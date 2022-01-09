import { screen, render, cleanup } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { Header } from '..';
import { HomePageContext, HomePageContextInterface } from '../../../../../contexts/HomePageContext';
import {
  createMockHomePageContextValue,
  mockHomePageContextValue,
} from '../../../../../testUtil/mockData/HomePageContext';
import { ROUTES } from '../../../../../routes';
import { NO_PREFERENCE_STAFF } from '../../../../../staticData/staff';

describe('Header.tsx', () => {
  const defaultContextValue = createMockHomePageContextValue();
  function renderHeader(initialEntries: string[], contextValue: HomePageContextInterface = defaultContextValue) {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HomePageContext.Provider value={contextValue}>
          <Header />
        </HomePageContext.Provider>
      </MemoryRouter>,
    );
  }

  it('shold show the return arrow on the staff, availability, customer info page', () => {
    renderHeader([ROUTES.staff]);
    expect(screen.getByTestId('arrow-button-icon')).toBeInTheDocument();
    cleanup();

    renderHeader([ROUTES.availability]);
    expect(screen.getByTestId('arrow-button-icon')).toBeInTheDocument();
    cleanup();

    renderHeader([ROUTES.customerInfoForm]);
    expect(screen.getByTestId('arrow-button-icon')).toBeInTheDocument();
    cleanup();
  });

  it('shold NOT show the return arrow on the service and booking confirmation page', () => {
    renderHeader([ROUTES.service]);
    expect(screen.queryByTestId('arrow-button-icon')).toBeNull();
    cleanup();

    renderHeader([ROUTES.bookingConfirmation]);
    expect(screen.queryByTestId('arrow-button-icon')).toBeNull();
    cleanup();
  });

  it('should show the header text based on the URL', () => {
    renderHeader([ROUTES.service]);
    expect(screen.getByText('Select services')).toBeInTheDocument();
    cleanup();

    renderHeader([ROUTES.staff]);
    expect(screen.getByText('Select staff')).toBeInTheDocument();
    cleanup();

    const contextValue = createMockHomePageContextValue({
      selectedStaff: {
        ...mockHomePageContextValue.selectedStaff,
        name: 'John Smith',
      },
    });
    renderHeader([ROUTES.availability], contextValue);
    expect(screen.getByText('Select time with John Smith')).toBeInTheDocument();
    cleanup();

    renderHeader([ROUTES.customerInfoForm]);
    expect(screen.getByText('Your contact information')).toBeInTheDocument();
    cleanup();
  });

  it('should show the step number', () => {
    [ROUTES.service, ROUTES.staff, ROUTES.availability, ROUTES.customerInfoForm].forEach((url, index) => {
      renderHeader([url]);
      expect(screen.getByTestId('step')).toHaveTextContent(`Step ${index + 1} of 4`);
      cleanup();
    });
  });

  it('should NOT show the step number for the booking confirmation page', () => {
    renderHeader([ROUTES.bookingConfirmation]);
    expect(screen.queryByTestId('step')).toBeNull();
  });

  it('should NOT show the staff name on the availability page if "No preference" was chosen', () => {
    const contextValue = createMockHomePageContextValue({
      selectedStaff: NO_PREFERENCE_STAFF,
    });
    renderHeader([ROUTES.availability], contextValue);
    expect(screen.getByText('Select time')).toBeInTheDocument();
  });
});
