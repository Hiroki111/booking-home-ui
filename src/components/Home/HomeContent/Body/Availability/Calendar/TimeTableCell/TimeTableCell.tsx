import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { useHomePageContext } from '../../../../../../../contexts/HomePageContext';
import { MapDateToAvailableDate } from '../../../../../../../interfaces/availableDate';
import { useStyles } from './useStyles';

interface Props {
  mapDateToAvailableDate: MapDateToAvailableDate;
}

export function TimeTableCell({ mapDateToAvailableDate, ...monthViewProps }: Props & any) {
  const classes = useStyles();
  const { selectedDate, setSelectedDate } = useHomePageContext();
  const date = dayjs(monthViewProps.startDate).format('YYYY-MM-DD');
  const availableDate = mapDateToAvailableDate[date];

  return (
    <MonthView.TimeTableCell
      {...{ ...monthViewProps, today: false }}
      className={clsx(
        classes.dayCell,
        availableDate?.date ? classes.availableDay : classes.unavailableDay,
        date === selectedDate?.date ? classes.selectedDay : '',
      )}
      onClick={() => {
        if (!availableDate) return;

        setSelectedDate(availableDate);
      }}
    />
  );
}
