import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Order } from './Order';
import { BottomBar } from './BottomBar';
import { ServerErrorAlert } from './ServerErrorAlert';
import { useStyles } from './useStyles';
import { Route as RouteObj, splitComponentRoutes, fullWidthComponentRoutes } from '../../../../routes';
import { useIsSmallWindow } from '../../../../hooks/window';
import { useServiceTypesQuery } from '../../../../queries/serviceTypes';
import { useStaffQuery } from '../../../../queries/staff';

export function Body() {
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();
  const location = useLocation();
  const isShowingSplitComponent = splitComponentRoutes.some((route) => route.path === location.pathname);
  const fetchServiceTypesQuery = useServiceTypesQuery();
  const fetchStaffListQuery = useStaffQuery();

  function renderRoutes(routes: RouteObj[]) {
    if (fetchServiceTypesQuery.isLoading) {
      return (
        <React.Fragment>
          <div className={classes.circularProgressContainer}>
            <CircularProgress className={classes.circularProgress} />
          </div>
        </React.Fragment>
      );
    } else if (fetchServiceTypesQuery.isError || fetchStaffListQuery.isError) {
      return <ServerErrorAlert />;
    }

    return routes.map(({ exact, path, component: Component }) => (
      <Route key={path} exact={exact} path={path} render={(props) => <Component {...props} />} />
    ));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.gridContainer}>
        {isShowingSplitComponent ? (
          <>
            <Grid item xs={isSmallWindow ? 12 : 7} className="left">
              <Switch>{renderRoutes(splitComponentRoutes)}</Switch>
            </Grid>
            <Grid item xs={isSmallWindow ? 12 : 5} className="right">
              <Order />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Switch>{renderRoutes(fullWidthComponentRoutes)}</Switch>
          </Grid>
        )}
        <BottomBar />
      </Grid>
    </div>
  );
}
