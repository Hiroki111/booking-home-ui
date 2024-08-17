import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';

import { BookingSummary } from './BookingSummary';
import { SecurityCheck } from './SecurityCheck';
import { useStyles } from './useStyles';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { AvailableTimeSlotDto } from '../../../../../interfaces/availableTimeSlot';
import { BookingRequestDto } from '../../../../../interfaces/booking';
import { AvailableDate, StaffDto } from '../../../../../interfaces/staff';
import { useCreateAppointmentMutation } from '../../../../../queries/appointment';
import { ROUTES } from '../../../../../routes';
import { calculateExpectedEndTime } from '../../../../../services/booking';
import { calculateOrder } from '../../../../../services/order';
import {
  BOOKING_ERROR_MESSAGE,
  BookingRequestErrorCode,
  GENERIC_TECHNICAL_ERROR_MESSAGE,
  staffAvailabilityErrors,
} from '../../../../../staticData/errorMessage';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export function BookingModal({ isOpen, handleClose }: Props) {
  const classes = useStyles();
  const [captchaResonse, setCaptchaResonse] = useState('');
  const [isBookingFailed, setIsBookingFailed] = useState(false);
  const {
    selectedServices,
    selectedStaff,
    selectedDate,
    selectedTimeSlot,
    customer,
    resetAppointmentData,
    setShowBookingConfirmation,
    setSelectedTimeSlot,
    setSelectedDate,
    setSelectedStaff,
  } = useHomePageContext();
  const navigate = useNavigate();
  const createAppointmentMutation = useCreateAppointmentMutation();

  useEffect(() => {
    if (createAppointmentMutation.isSuccess) {
      resetAppointmentData();
      setShowBookingConfirmation(true);
      navigate(ROUTES.bookingConfirmation);
    }
  }, [createAppointmentMutation.isSuccess, resetAppointmentData, navigate, setShowBookingConfirmation]);

  useEffect(() => {
    if (createAppointmentMutation.isError) {
      setIsBookingFailed(true);
    }
  }, [createAppointmentMutation.isError, setIsBookingFailed]);

  function handleBookAppointment() {
    setIsBookingFailed(false);

    // validate phone number
    createAppointmentMutation.mutate({
      ...customer,
      countryPhoneCode: undefined,
      phoneNumber: [customer.countryPhoneCode.trim(), customer.phoneNumber.trim()].join(''),
      serviceIds: selectedServices.map((selectedService) => selectedService.id),
      totalPrice: calculateOrder(selectedServices).totalPrice,
      staffId: selectedStaff.id,
      staffAvailabilityId: selectedDate.id,
      date: selectedDate.date,
      startTime: selectedTimeSlot.startTime,
      endTime: calculateExpectedEndTime(selectedTimeSlot.startTime, selectedServices),
      captchaText: captchaResonse,
    } as BookingRequestDto);
  }

  function getErrorMessage(error: any) {
    if (BOOKING_ERROR_MESSAGE.hasOwnProperty(error.errorCode)) {
      return BOOKING_ERROR_MESSAGE[error.errorCode as BookingRequestErrorCode];
    }
    return GENERIC_TECHNICAL_ERROR_MESSAGE;
  }

  function showRedirectLinkToStaffList(error: any) {
    if (!staffAvailabilityErrors.includes(error?.errorCode)) {
      return null;
    }
    return (
      <span
        data-testid="staff-availability-error-message"
        className={classes.redirectLink}
        onClick={() => {
          setSelectedTimeSlot({} as AvailableTimeSlotDto);
          setSelectedDate({} as AvailableDate);
          setSelectedStaff({} as StaffDto);
          navigate(ROUTES.staff);
        }}
      >
        Please choose different staff from here.
      </span>
    );
  }

  function handleCloseModal() {
    setIsBookingFailed(false);
    handleClose();
  }

  return (
    <Modal className={classes.root} open={isOpen} onClose={handleCloseModal} closeAfterTransition>
      <Fade in={isOpen}>
        <div className={classes.contentWrapper}>
          <BookingSummary />
          <SecurityCheck
            handleChangeCaptchaResponse={(e: React.ChangeEvent<HTMLInputElement>) => setCaptchaResonse(e.target.value)}
            captchaResonse={captchaResonse}
          />
          {isBookingFailed && createAppointmentMutation.error instanceof Error && (
            <Alert severity="error" className={classes.alert}>
              <AlertTitle>Error</AlertTitle>
              <div data-testid="booking-error-message">{getErrorMessage(createAppointmentMutation.error)}</div>
              <>{showRedirectLinkToStaffList(createAppointmentMutation.error)}</>
            </Alert>
          )}
          <div className={classes.buttonContainer}>
            <Button variant="outlined" onClick={handleCloseModal}>
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
