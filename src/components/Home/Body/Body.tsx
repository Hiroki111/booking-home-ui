import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { splitComponentRoutes, fullWidthComponentRoutes } from '../../../routes';
import { useIsSmallWindow } from '../../../hooks/window';
import { useServiceTypesQuery } from '../../../queries/serviceTypes';
import { useStaffQuery } from '../../../queries/staff';
import { useStyles } from './useStyles';
import { CircularProgress, Grid } from '@mui/material';
import { Order } from './Order';
import { ServerErrorAlert } from './ServerErrorAlert';

export function Body() {
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();
  const fetchServiceTypesQuery = useServiceTypesQuery();
  const fetchStaffListQuery = useStaffQuery();

  if (fetchServiceTypesQuery.isLoading) {
    return (
      <React.Fragment>
        <div className={classes.circularProgressContainer}>
          <CircularProgress className={classes.circularProgress} />
        </div>
      </React.Fragment>
    );
  }

  if (fetchServiceTypesQuery.isError || fetchStaffListQuery.isError) {
    return <ServerErrorAlert />;
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Routes>
          {splitComponentRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={renderSplitComponent(Component, isSmallWindow)} />
          ))}
          {fullWidthComponentRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={renderFullwithComponent(Component)} />
          ))}
        </Routes>
      </Grid>
    </div>
  );
}

function renderSplitComponent(Component: React.FC, isSmallWindow: boolean) {
  return (
    <>
      <Grid item xs={isSmallWindow ? 12 : 7} className="left">
        <Component />
      </Grid>
      <Grid item xs={isSmallWindow ? 12 : 5} className="right">
        <Order />
      </Grid>
    </>
  );
}

function renderFullwithComponent(Component: React.FC) {
  return (
    <Grid item xs={12}>
      <Component />
    </Grid>
  );
}
