import { forwardRef, ForwardedRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { useStyles } from './useStyles';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { AvailableTimeSlot } from '../../../../../interfaces/availableTimeSlot';
import { Staff } from '../../../../../interfaces/staff';
import { ROUTES } from '../../../../../routes';
import { findFirstAvailableStaff } from '../../../../../services/staff';
import { NO_PREFERENCE_STAFF } from '../../../../../staticData/staff';

interface Props {
  staffList: Staff[];
}

function AvailableTime({ staffList }: Props, ref: ForwardedRef<HTMLDivElement>) {
  const navigation = useNavigate();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { selectedStaff, selectedDate, setSelectedTimeSlot, setSelectedStaff, setSelectedDate } = useHomePageContext();

  function handleClickTimeSlot(availableTimeSlot: AvailableTimeSlot) {
    if (selectedStaff.id !== NO_PREFERENCE_STAFF.id) {
      setSelectedTimeSlot(availableTimeSlot);
    } else {
      setActualStaffAndTimeForNonPreferenceStaff(availableTimeSlot);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigation(ROUTES.customerInfoForm);
  }

  function setActualStaffAndTimeForNonPreferenceStaff(availableTimeSlot: AvailableTimeSlot) {
    const firstAvailableStaff = findFirstAvailableStaff(staffList || [], selectedDate, availableTimeSlot);
    const firstAvailableStaffDate = firstAvailableStaff?.availableDates?.find(
      (availableDate) => availableDate.date === selectedDate.date,
    );
    if (!firstAvailableStaff || !firstAvailableStaffDate) {
      alert('Internal error occurred. Please try again later.');
      return;
    }

    // Note: The order of the following setter functions matters due to bookingStateReducer
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
          data-testid={`timeslot-panel-${i}`}
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
