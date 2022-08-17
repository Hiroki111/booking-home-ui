import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { ROUTES } from '../../../../../routes';
import { useStyles } from './useStyles';

export function BookingConfirmation() {
  const classes = useStyles();
  const theme = useTheme();
  const { showBookingConfirmation, setShowBookingConfirmation } = useHomePageContext();
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('beforeunload', function () {
      setShowBookingConfirmation(false);
    });

    return function cleanup() {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [setShowBookingConfirmation]);

  function handleClickClose() {
    setShowBookingConfirmation(false);
    history.push(ROUTES.service);
  }

  if (!showBookingConfirmation) {
    return (
      <Paper elevation={2} className={classes.root}>
        <p>
          <a href="/">Click here</a> to go to the top page to make a new appointment
        </p>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} className={classes.root}>
      <svg className={classes.checkMark} version="1.1" viewBox="0 0 130.2 130.2" xmlns="http://www.w3.org/2000/svg">
        <circle
          className={clsx(classes.path, classes.circle)}
          fill="none"
          stroke={theme.palette.info.main}
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          className={clsx(classes.path, classes.check)}
          fill="none"
          stroke={theme.palette.info.main}
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <h3 className={classes.header}>Confirmed</h3>
      <p>We will send a confirmation to your email address shortly. We look forward to seeing you!</p>
      <Button className={classes.closeButton} onClick={handleClickClose} variant="contained" color="primary">
        Close
      </Button>
    </Paper>
  );
}
