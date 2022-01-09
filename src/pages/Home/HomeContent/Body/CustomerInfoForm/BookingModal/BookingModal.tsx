import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import { useHomePageContext } from '../../../../../../contexts/HomePageContext';
import { calculateOrder } from '../../../../../../services/order';
import { calculateExpectedEndTime } from '../../../../../../services/booking';
import { useCreateAppointmentMutation } from '../../../../../../queries/appointment';
import { ROUTES } from '../../../../../../routes';
import { BookingSummary } from './BookingSummary';
import { SecurityCheck } from './SecurityCheck';
import { useStyles } from './useStyles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export function BookingModal({ isOpen, handleClose }: Props) {
  const classes = useStyles();
  const [captchaResonse, setCaptchaResonse] = useState('');
  const {
    selectedServices,
    selectedStaff,
    selectedDate,
    selectedTimeSlot,
    customer,
    resetAppointmentData,
    setShowBookingConfirmation,
  } = useHomePageContext();
  const history = useHistory();
  const createAppointmentMutation = useCreateAppointmentMutation();

  useEffect(() => {
    if (createAppointmentMutation.isSuccess) {
      resetAppointmentData();
      setShowBookingConfirmation(true);
      history.push(ROUTES.bookingConfirmation);
    }
  }, [createAppointmentMutation.isSuccess, history, resetAppointmentData, setShowBookingConfirmation]);

  function handleBookAppointment() {
    createAppointmentMutation.mutate({
      ...customer,
      serviceIds: selectedServices.map((selectedService) => selectedService.id),
      totalPrice: calculateOrder(selectedServices).totalPrice,
      staffId: selectedStaff.id,
      staffAvailabilityId: selectedDate.id,
      date: selectedDate.date,
      startTime: selectedTimeSlot.startTime,
      endTime: calculateExpectedEndTime(selectedTimeSlot.startTime, selectedServices),
      captchaText: captchaResonse,
    });
  }

  return (
    <Modal className={classes.root} open={isOpen} onClose={handleClose} closeAfterTransition>
      <Fade in={isOpen}>
        <div className={classes.contentWrapper}>
          <BookingSummary />
          <SecurityCheck
            handleChangeCaptchaResponse={(e: React.ChangeEvent<HTMLInputElement>) => setCaptchaResonse(e.target.value)}
            captchaResonse={captchaResonse}
          />
          {createAppointmentMutation.error instanceof Error && (
            <Alert severity="error" className={classes.alert}>
              <AlertTitle>Error</AlertTitle>
              {createAppointmentMutation.error.message}
            </Alert>
          )}
          <div className={classes.buttonContainer}>
            <Button variant="outlined" onClick={handleClose}>
              CANCEL
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!captchaResonse || createAppointmentMutation.isLoading || createAppointmentMutation.isSuccess}
              className={classes.bookButton}
              onClick={handleBookAppointment}
            >
              {!createAppointmentMutation.isLoading ? 'BOOK' : 'SUBMITTING...'}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
