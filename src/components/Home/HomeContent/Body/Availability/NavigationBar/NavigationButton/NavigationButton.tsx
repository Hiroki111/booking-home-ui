import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';

import { AvailableDate } from '../../../../../../../interfaces/staff';
import { useStyles } from './useStyles';

export interface Props {
  displayedMonthText: string;
  type: 'forward' | 'back';
  onClick?: (e: any) => void;
  setSelectedDate: (selectedDate: AvailableDate) => void;
}

export function NavigationButton({ displayedMonthText, type, onClick, setSelectedDate }: Props) {
  const isNavButtonDisabled = getIsNavButtonDisabled(type);
  const classes = useStyles();

  function getIsNavButtonDisabled(type: 'forward' | 'back') {
    if (type === 'forward') {
      return false;
    }

    const displayedDate = new Date(displayedMonthText);
    const currentDate = new Date();

    const displayedMonth = displayedDate.getMonth() + (displayedDate.getFullYear() - currentDate.getFullYear()) * 12;
    const currentMonth = currentDate.getMonth();

    return displayedMonth - currentMonth < 1;
  }

  const props = {
    type,
    onClick: (e: any) => {
      setSelectedDate({} as AvailableDate);
      if (!isNavButtonDisabled && onClick) {
        onClick(e);
      }
    },
  };

  return <DateNavigator.NavigationButton {...props} className={isNavButtonDisabled ? classes.hideNavButton : ''} />;
}
