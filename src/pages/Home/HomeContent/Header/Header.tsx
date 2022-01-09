import { useLocation, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHomePageContext } from '../../../../contexts/HomePageContext';
import { ROUTES } from '../../../../routes';
import { useStyles } from './useStyles';
import { NoPreferenceStaff, StaffDto } from '../../../../interfaces/staff';
import { useIsSmallWindow } from '../../../../hooks/window';
import { ServiceTabs } from './ServiceTabs';
import { NO_PREFERENCE_STAFF } from '../../../../staticData/staff';

export function Header() {
  const classes = useStyles();
  const { selectedStaff } = useHomePageContext();
  const isSmallWindow = useIsSmallWindow();
  const location = useLocation();
  const history = useHistory();

  function getCurrentStep() {
    switch (location.pathname) {
      case ROUTES.service:
        return 1;
      case ROUTES.staff:
        return 2;
      case ROUTES.availability:
        return 3;
      case ROUTES.customerInfoForm:
        return 4;
      case ROUTES.bookingConfirmation:
        return 5;
      default:
        return 0;
    }
  }

  function displayHeaderText(staff: StaffDto | NoPreferenceStaff) {
    switch (location.pathname) {
      case ROUTES.service:
        return 'Select services';
      case ROUTES.staff:
        return 'Select staff';
      case ROUTES.availability:
        return getHeaderTextForAvailability(staff);
      case ROUTES.customerInfoForm:
        return 'Your contact information';
      default:
        return '';
    }
  }

  function getHeaderTextForAvailability(staff: StaffDto | NoPreferenceStaff) {
    if (staff.id === NO_PREFERENCE_STAFF.id) {
      return 'Select time';
    }

    return `Select time with ${staff.name}`;
  }

  function displayReturnArrow() {
    const currentStep = getCurrentStep();

    if (currentStep < 2 || 4 < currentStep) {
      return <div />;
    }

    return (
      <ArrowBackIcon
        data-testid="arrow-button-icon"
        className={classes.arrowBackIcon}
        onClick={() => {
          if (currentStep === 2) {
            history.push(ROUTES.service);
          } else if (currentStep === 3) {
            history.push(ROUTES.staff);
          } else if (currentStep === 4) {
            history.push(ROUTES.availability);
          }
        }}
      />
    );
  }

  function isServicePage() {
    return location.pathname === ROUTES.service;
  }

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.closeBtnContainer}>
          {displayReturnArrow()}
          <a className={classes.crossSign} href="/">
            <i className="fa fa-phone" aria-hidden="true"></i>
          </a>
        </div>
        {getCurrentStep() < 5 && (
          <Typography component="p" className={classes.step} data-testid="step" noWrap>
            Step {getCurrentStep()} of 4
          </Typography>
        )}
        <Typography component="h2" variant="h6" className={classes.pageTitle} noWrap>
          {displayHeaderText(selectedStaff as StaffDto | NoPreferenceStaff)}
        </Typography>
      </Toolbar>
      {isSmallWindow && isServicePage() && <ServiceTabs />}
    </AppBar>
  );
}
