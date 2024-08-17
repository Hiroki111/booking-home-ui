import { useEffect, createRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Paper } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import dayjs from 'dayjs';

import { AvailableTime } from './AvailableTime';
import { Calendar } from './Calendar';
import { NavigationBar } from './NavigationBar';
import { useStyles } from './useStyles';

import { useHomePageContext } from '../../../../contexts/HomePageContext';
import { useRegularStaffQuery } from '../../../../queries/staff';
import { getPathToSkippedPage } from '../../../../services/routing';
import { ServerErrorAlert } from '../ServerErrorAlert';

export function Availability() {
  const classes = useStyles();
  const refToAvailableTime: React.RefObject<HTMLDivElement> = createRef();
  const { selectedDate, bookingCompletionState, selectedServices } = useHomePageContext();
  const location = useLocation();
  const pathToSkippedPage = getPathToSkippedPage(location.pathname, bookingCompletionState);
  const initialDate = selectedDate?.date || dayjs().format('YYYY-MM-DD');
  const { data: staffList, isError: isFetchingStaffListFailed } = useRegularStaffQuery(selectedServices);

  useEffect(() => {
    if (selectedDate && refToAvailableTime.current) {
      refToAvailableTime.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedDate, refToAvailableTime]);

  function ToolBarRootComponent(props: any) {
    return <Toolbar.Root {...props} className={classes.toolbarRoot} />;
  }

  if (pathToSkippedPage) {
    return <Navigate to={pathToSkippedPage} />;
  }

  if (isFetchingStaffListFailed) {
    return <ServerErrorAlert />;
  }

  return (
    <>
      <Paper elevation={2} className={classes.schedulerContainer}>
        <Scheduler>
          <ViewState defaultCurrentDate={initialDate} />
          <Toolbar rootComponent={ToolBarRootComponent} />
          <NavigationBar />
          <Calendar />
        </Scheduler>
      </Paper>
      {selectedDate?.date && <AvailableTime ref={refToAvailableTime} staffList={staffList || []} />}
    </>
  );
}
