import Paper from '@material-ui/core/Paper';
import dayjs from 'dayjs';

import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { calculateExpectedEndTime } from '../../../../../services/booking';
import { calculateOrder } from '../../../../../services/order';
import { useIsSmallWindow } from '../../../../../hooks/window';
import { useStyles } from './useStyles';
import { SelectedServiceContainer } from './SelectedServiceContainer';
import { BannerContainer } from './BannerContainer';

export function Order() {
  const classes = useStyles();
  const { selectedServices, selectedStaff, selectedDate, selectedTimeSlot } = useHomePageContext();
  const isSmallWindow = useIsSmallWindow();
  const order = calculateOrder(selectedServices);

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.order}>
        {!isSmallWindow && <BannerContainer />}
        <Paper elevation={2} className={classes.selectedServicesContainer} square>
          {selectedServices.length ? (
            selectedServices.map((service, i) => <SelectedServiceContainer key={i} service={service} />)
          ) : (
            <p className={classes.noServiceSelectedMessage}>No services selected yet</p>
          )}
        </Paper>
        {selectedStaff.id && (
          <Paper elevation={2} className={classes.selectedStaffContainer} square>
            <p className={classes.selectedStaff}>{`Staff: ${selectedStaff.name}`}</p>
          </Paper>
        )}
        {selectedDate.date && selectedTimeSlot.startTime && (
          <Paper elevation={2} className={classes.selectedTimeSlotContainer} square>
            <p>{`${dayjs(selectedDate.date).format('D MMM YYYY')} at ${
              selectedTimeSlot.startTime
            } - ${calculateExpectedEndTime(selectedTimeSlot.startTime, selectedServices)}`}</p>
          </Paper>
        )}
        <Paper elevation={2} className={classes.orderSummary} square>
          {order.totalPrice !== null && (
            <>
              <div className={classes.tax}>
                <p>Taxes</p>
                <p data-testid="tax">{`€ ${order.tax}`}</p>
              </div>
              <div className={classes.total}>
                <p>Total</p>
                <p data-testid="total-price">{`€ ${order.totalPrice}`}</p>
              </div>
            </>
          )}
        </Paper>
      </Paper>
    </div>
  );
}
