import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHomePageContext } from '../../../contexts/HomePageContext';
import { useIsSmallWindow } from '../../../hooks/window';
import { Staff, NoPreferenceStaff } from '../../../interfaces/staff';
import { ROUTES } from '../../../routes';
import { NO_PREFERENCE_STAFF } from '../../../staticData/staff';
import { ServiceTabs } from './ServiceTabs';
import { useStyles } from './useStyles';

export function Header() {
  const classes = useStyles();
  const { selectedStaff } = useHomePageContext();
  const isSmallWindow = useIsSmallWindow();
  const location = useLocation();
  const navigate = useNavigate();

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

  function displayHeaderText(staff: Staff | NoPreferenceStaff) {
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

  function getHeaderTextForAvailability(staff: Staff | NoPreferenceStaff) {
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
            navigate(ROUTES.service);
          } else if (currentStep === 3) {
            navigate(ROUTES.staff);
          } else if (currentStep === 4) {
            navigate(ROUTES.availability);
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
          {displayHeaderText(selectedStaff as Staff | NoPreferenceStaff)}
        </Typography>
      </Toolbar>
      {isSmallWindow && isServicePage() && <ServiceTabs />}
    </AppBar>
  );
}
