import { forwardRef, ForwardedRef } from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { useStyles } from './useStyles';
import { useHomePageContext } from '../../../../../../contexts/HomePageContext';
import { AvailableTimeSlotDto } from '../../../../../../interfaces/availableTimeSlot';
import { ROUTES } from '../../../../../../routes';
import { NO_PREFERENCE_STAFF } from '../../../../../../staticData/staff';
import { useRegularStaffQuery } from '../../../../../../queries/staff';
import { findFirstAvailableStaff } from '../../../../../../services/staff';

function AvailableTime(_props: any, ref: ForwardedRef<HTMLDivElement>) {
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    selectedStaff,
    selectedDate,
    selectedServices,
    setSelectedTimeSlot,
    setSelectedStaff,
    setSelectedDate,
  } = useHomePageContext();
  const regularStaffQuery = useRegularStaffQuery(selectedServices);
  const staffList = regularStaffQuery.data || [];

  function handleClickTimeSlot(availableTimeSlot: AvailableTimeSlotDto) {
    if (selectedStaff.id !== NO_PREFERENCE_STAFF.id) {
      setSelectedTimeSlot(availableTimeSlot);
    } else {
      setActualStaffAndTimeForNonPreferenceStaff(availableTimeSlot);
    }

    history.push(ROUTES.customerInfoForm);
  }

  function setActualStaffAndTimeForNonPreferenceStaff(availableTimeSlot: AvailableTimeSlotDto) {
    const firstAvailableStaff = findFirstAvailableStaff(staffList, selectedDate, availableTimeSlot);
    const firstAvailableStaffDate = firstAvailableStaff?.availableDates?.find(
      (availableDate) => availableDate.date === selectedDate.date,
    );
    if (!firstAvailableStaff || !firstAvailableStaffDate) {
      alert('Internal error occurred. Please try again later.');
      return;
    }

    // Note: The order of the setter functions below matters due to bookingStateReducer
    setSelectedStaff(firstAvailableStaff);
    setSelectedDate(firstAvailableStaffDate);
    setSelectedTimeSlot(availableTimeSlot);

    enqueueSnackbar(`We chose ${firstAvailableStaff.name}`, {
      variant: 'info',
    });
  }

  if (!selectedDate?.availableTimeSlots?.length) return null;

  return (
    <Paper className={classes.root}>
      <div className={classes.anchor} ref={ref} />
      <Paper className={classes.timeSlotHeader} elevation={2} square>
        <p>When would you like to vist us on {dayjs(selectedDate.date).format('DD/MM/YYYY')} ?</p>
      </Paper>
      {selectedDate.availableTimeSlots.map((availableTimeSlot, i) => (
        <Paper
          key={i}
          className={classes.timeSlot}
          onClick={() => handleClickTimeSlot(availableTimeSlot)}
          elevation={2}
          square
        >
          <div>{availableTimeSlot.startTime}</div>
          <div>{'>'}</div>
        </Paper>
      ))}
    </Paper>
  );
}

const AvailableTimeWithForwardedRef = forwardRef(AvailableTime);

export { AvailableTimeWithForwardedRef as AvailableTime };
