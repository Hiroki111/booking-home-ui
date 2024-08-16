import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chip from '@material-ui/core/Chip';
import Slide from '@material-ui/core/Slide';
import { useHomePageContext } from '../../../../contexts/HomePageContext';
import { useRegularStaffQuery } from '../../../../queries/staff';
import { ROUTES } from '../../../../routes';
import { MAX_SERVICE_SELECTION_NUMBER } from '../../../../staticData/service';
import { useStyles } from './useStyles';

export function BottomBar() {
  const naigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const { selectedServices } = useHomePageContext();
  const regularStaffQuery = useRegularStaffQuery(selectedServices);
  const regularStaffList = regularStaffQuery.data || [];

  function handleOnClickBooking() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    naigate(ROUTES.staff);
  }

  if (ROUTES.service !== location.pathname) {
    return null;
  }

  return (
    <Slide direction="up" in={selectedServices.length > 0}>
      <BottomNavigation className={classes.bottomNavigation}>
        <BottomNavigationAction
          icon={
            <Chip
              label="Book now"
              color="primary"
              className={classes.bookigButton}
              onClick={handleOnClickBooking}
              disabled={regularStaffList.length < 1 || MAX_SERVICE_SELECTION_NUMBER < selectedServices.length}
            />
          }
        />
      </BottomNavigation>
    </Slide>
  );
}
