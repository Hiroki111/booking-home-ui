import { Paper, Typography } from '@material-ui/core';

import { StaffPanel } from './StaffPanel';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { useAllStaffQuery } from '../../../../../queries/staff';
import { useStyles } from './useStyles';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { getPathToSkippedPage } from '../../../../../services/routing';
import { ROUTES } from '../../../../../routes';
import { StaffDto, NoPreferenceStaff } from '../../../../../interfaces/staff';

export function Staff() {
  const classes = useStyles();
  const history = useHistory();
  const { selectedServices, setSelectedStaff, bookingCompletionState } = useHomePageContext();
  const allStaffQuery = useAllStaffQuery(selectedServices);
  const location = useLocation();
  const pathToSkippedPage = getPathToSkippedPage(location.pathname, bookingCompletionState);
  const staffList = allStaffQuery.data || [];

  function handleOnClickStaff(staff: StaffDto | NoPreferenceStaff) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedStaff(staff);
    history.push(ROUTES.availability);
  }

  function displayStaffList() {
    if (!staffList.length) {
      return (
        <Typography component="p" className={classes.noStaffAvailable}>
          No staff available for the selected services. <a href="/">Click here</a> and uncheck a selected service.
        </Typography>
      );
    }

    return staffList.map((staff, i) => (
      <StaffPanel staff={staff} handleOnClick={() => handleOnClickStaff(staff)} key={i} />
    ));
  }

  if (pathToSkippedPage) {
    return <Redirect to={pathToSkippedPage} />;
  }

  return (
    <Paper className={classes.root} elevation={2}>
      {displayStaffList()}
    </Paper>
  );
}
