import { render, fireEvent, cleanup } from '@testing-library/react';

import { NavigationButton, Props } from '../NavigationButton';

describe('NavigationButton.tsx', () => {
  const baseProps = {
    displayedMonthText: 'December 2021',
    type: 'back',
    onClick: jest.fn(),
    setSelectedDate: jest.fn(),
  } as Props;

  it('should disable back navigation button if the calendar is displaying a non-upcoming month', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2021-12-31'));

    const nonUpcomingMonths = ['December 2021', 'december 2021', 'Dec 2021', 'November 2021'];

    nonUpcomingMonths.forEach((month) => {
      const props = { ...baseProps, displayedMonthText: month };
      const { getByRole } = render(<NavigationButton {...props} />);

      fireEvent.click(getByRole('button'));
      expect(props.onClick).not.toHaveBeenCalled();
      cleanup();
    });
  });

  it('should NOT disable back navigation button if the displayed month is neither a current nor an upcoming month', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2021-12-31'));

    const months = ['January 2022', 'january 2021', 'jan 2021', 'December', '', 'INVALID_MONTH'];

    months.forEach((month) => {
      const props = { ...baseProps, displayedMonthText: month };
      const { getByRole } = render(<NavigationButton {...props} />);

      fireEvent.click(getByRole('button'));
      expect(props.onClick).toHaveBeenCalled();
      cleanup();
    });
  });
});
