import { Paper, Typography } from '@material-ui/core';

import { StaffPanel } from './StaffPanel';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useHomePageContext } from '../../../../contexts/HomePageContext';
import { StaffDto, NoPreferenceStaff } from '../../../../interfaces/staff';
import { useAllStaffQuery } from '../../../../queries/staff';
import { ROUTES } from '../../../../routes';
import { getPathToSkippedPage } from '../../../../services/routing';
import { useStyles } from './useStyles';

export function Staff() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { selectedServices, setSelectedStaff, bookingCompletionState } = useHomePageContext();
  const allStaffQuery = useAllStaffQuery(selectedServices);
  const location = useLocation();
  const pathToSkippedPage = getPathToSkippedPage(location.pathname, bookingCompletionState);
  const staffList = allStaffQuery.data || [];

  function handleOnClickStaff(staff: StaffDto | NoPreferenceStaff) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedStaff(staff);
    navigate(ROUTES.availability);
  }

  if (pathToSkippedPage) {
    return <Navigate to={pathToSkippedPage} replace />;
  }
  console.log({ allStaffQuery, selectedServices });
  if (!staffList.length) {
    return (
      <Typography component="p" className={classes.noStaffAvailable}>
        No staff available for the selected services. <a href="/">Click here</a> and uncheck a selected service.
      </Typography>
    );
  }

  return (
    <Paper className={classes.root} elevation={2}>
      {staffList.map((staff, i) => (
        <StaffPanel staff={staff} handleOnClick={() => handleOnClickStaff(staff)} key={i} />
      ))}
    </Paper>
  );
}
