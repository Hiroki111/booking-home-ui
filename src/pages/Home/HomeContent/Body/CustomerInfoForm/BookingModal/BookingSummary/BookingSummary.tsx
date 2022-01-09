import { Grid, GridSize } from '@material-ui/core';
import dayjs from 'dayjs';

import { useHomePageContext } from '../../../../../../../contexts/HomePageContext';
import { calculateExpectedEndTime } from '../../../../../../../services/booking';
import { calculateOrder } from '../../../../../../../services/order';
import { useStyles } from './useStyles';

export function BookingSummary() {
  const classes = useStyles();
  const leftGridBreakPoints = {
    sm: 3,
    xs: 2,
  } as Partial<Record<any, boolean | GridSize>>;
  const rightGridBreakPoints = {
    sm: 9,
    xs: 10,
  } as Partial<Record<any, boolean | GridSize>>;
  const { selectedServices, selectedStaff, selectedDate, selectedTimeSlot, customer } = useHomePageContext();
  const order = calculateOrder(selectedServices);

  return (
    <div className={classes.root}>
      <h2>Summary</h2>
      <h3>Please make sure all the details below are correct before booking!</h3>
      <Grid container className={classes.contentRow}>
        <Grid item {...leftGridBreakPoints}>
          <div className={classes.sectionName}>Service</div>
        </Grid>
        <Grid item {...rightGridBreakPoints}>
          <div>
            {selectedServices.map((service, i) => (
              <div key={i} className={classes.selectedService}>
                <div className={classes.selectedServiceNameAndPrice}>
                  <p>{service.name}</p>
                  <p>{`€ ${service.price}`}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.selectedService}>
            <div className={classes.totalServicePrice}>
              <p>Total</p>
              <p>{`€ ${order.totalPrice}`}</p>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.contentRow}>
        <Grid item {...leftGridBreakPoints}>
          <div className={classes.sectionName}>Staff</div>
        </Grid>
        <Grid item {...rightGridBreakPoints}>
          <p>{selectedStaff.name}</p>
        </Grid>
      </Grid>
      <Grid container className={classes.contentRow}>
        <Grid item {...leftGridBreakPoints}>
          <div className={classes.sectionName}>Date</div>
        </Grid>
        <Grid item {...rightGridBreakPoints}>
          <p>{`${dayjs(selectedDate.date).format('D MMM YYYY')} at ${
            selectedTimeSlot.startTime
          } - ${calculateExpectedEndTime(selectedTimeSlot.startTime, selectedServices)}`}</p>
        </Grid>
      </Grid>
      <Grid container className={classes.contentRow}>
        <Grid item {...leftGridBreakPoints}>
          <div className={classes.sectionName}>Your contact information</div>
        </Grid>
        <Grid item {...rightGridBreakPoints}>
          <p>Name: {`${customer.firstName} ${customer.lastName}`}</p>
          <p>Phone: {`${customer.countryPhoneCode} ${customer.phoneNumber}`}</p>
          <p>Email: {customer.email}</p>
        </Grid>
      </Grid>
    </div>
  );
}
