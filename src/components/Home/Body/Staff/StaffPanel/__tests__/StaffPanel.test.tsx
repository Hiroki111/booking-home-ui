import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Props } from '../StaffPanel';
import { StaffPanel } from '..';
import { HomePageContextInterface, HomePageContext } from '../../../../../../contexts/HomePageContext';
import { NO_PREFERENCE_STAFF } from '../../../../../../staticData/staff';
import { createMockHomePageContextValue } from '../../../../../../testUtil/mockData/HomePageContext';
import { createMockStaff } from '../../../../../../testUtil/mockData/staff';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RootThemeProvider } from '../../../../../../theme/RootThemeProvider';

describe('StaffPanel.tsx', () => {
  function renderServicePanel(props: Props, contextValue: HomePageContextInterface) {
    render(
      <RootThemeProvider>
        <MemoryRouter>
          <QueryClientProvider client={new QueryClient()}>
            <HomePageContext.Provider value={contextValue}>
              <StaffPanel {...props} />
            </HomePageContext.Provider>
          </QueryClientProvider>
        </MemoryRouter>
      </RootThemeProvider>,
    );
  }

  const baseProps = {
    staff: createMockStaff(),
    handleOnClick: jest.fn(),
  };

  it('should show staff details with a photo', () => {
    const props = {
      ...baseProps,
      staff: createMockStaff({ profilePhotoUrl: 'https://example.com' }),
    };
    renderServicePanel(props, createMockHomePageContextValue());

    expect(screen.getByTestId('staff-photo')).toBeInTheDocument();
    expect(screen.queryByTestId('staff-avatar')).toBeNull();
  });

  it("should show staff details with an avatar if the staff doesn't have its photo", () => {
    // First + Last name
    let props = {
      ...baseProps,
      staff: createMockStaff({ name: 'Albus Severus Potter' }),
    };
    renderServicePanel(props, createMockHomePageContextValue());

    expect(screen.queryByTestId('staff-photo')).toBeNull();
    expect(screen.getByTestId('staff-avatar')).toHaveTextContent('AP');
    cleanup();

    // Single name
    props.staff = createMockStaff({ name: 'Bob' });
    renderServicePanel(props, createMockHomePageContextValue());

    expect(screen.queryByTestId('staff-photo')).toBeNull();
    expect(screen.getByTestId('staff-avatar')).toHaveTextContent('B');
    cleanup();

    // No name
    props.staff = createMockStaff({ name: '' });
    renderServicePanel(props, createMockHomePageContextValue());

    expect(screen.queryByTestId('staff-photo')).toBeNull();
    expect(screen.getByTestId('staff-avatar')).toHaveTextContent('');
    cleanup();
  });

  it('should show the No preference avatar', () => {
    const props = { ...baseProps, staff: createMockStaff({ id: NO_PREFERENCE_STAFF.id }) };
    renderServicePanel(props, createMockHomePageContextValue());

    expect(screen.queryByTestId('staff-photo')).toBeNull();
    expect(screen.getByTestId('no-preference-staff-avatar')).toBeInTheDocument();
  });
});
