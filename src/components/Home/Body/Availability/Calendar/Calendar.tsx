import { useMemo } from 'react';
import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';

import { TimeTableCell } from './TimeTableCell';
import { useStyles } from './useStyles';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { MapDateToAvailableDate } from '../../../../../interfaces/availableDate';
import { StaffDto } from '../../../../../interfaces/staff';
import { useRegularStaffQuery } from '../../../../../queries/staff';
import { getMapDateToMaxAvailableDate, getMapDateToAvailableDate } from '../../../../../services/availableDate';
import { NO_PREFERENCE_STAFF } from '../../../../../staticData/staff';

export function Calendar() {
  const classes = useStyles();
  const { selectedStaff, selectedServices } = useHomePageContext();
  const regularStaffQuery = useRegularStaffQuery(selectedServices);
  const mapDateToMaxAvailableDate = useMemo(
    () => getMapDateToMaxAvailableDate(regularStaffQuery.data || [], selectedServices),
    [regularStaffQuery.data, selectedServices],
  );
  let mapDateToAvailableDate: MapDateToAvailableDate;

  if (selectedStaff.id === NO_PREFERENCE_STAFF.id) {
    mapDateToAvailableDate = mapDateToMaxAvailableDate;
  } else {
    mapDateToAvailableDate = getMapDateToAvailableDate(selectedStaff as StaffDto, selectedServices);
  }

  function TableComponent(props: any) {
    return <MonthView.TimeTableLayout {...props} className={classes.timeTableLayout} />;
  }

  function DayScaleLayoutComponent(props: any) {
    return <MonthView.DayScaleLayout {...props} className={classes.dayScaleLayout} />;
  }

  return (
    <MonthView
      timeTableLayoutComponent={TableComponent}
      dayScaleLayoutComponent={DayScaleLayoutComponent}
      timeTableCellComponent={(props) => <TimeTableCell {...props} mapDateToAvailableDate={mapDateToAvailableDate} />}
    />
  );
}
